<?php

declare(strict_types=1);

namespace Lightit\Insurance\Domain\Actions;

use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;
use Lightit\Insurance\Domain\DataTransferObjects\EligibilityCheckDto;
use Lightit\Insurance\Domain\DataTransferObjects\GetAvailableDMEProvidersDto;
use Lightit\Shared\Domain\Models\PayersDMEProvider;

class RunEligibilityAction
{
    public function __construct(
        private readonly RunMbiLookupAction $mbiLookupAction,
        private readonly RunPVerifyEligibilitySummaryAction $pVerifyEligibilitySummaryAction,
        private readonly GetAvailableDMEProvidersAction $getAvailableDMEProvidersAction,
    ) {
    }

    /**
     * @return Collection<int, PayersDMEProvider>
     */
    public function execute(EligibilityCheckDto $eligibilityCheckData): Collection
    {
        if ($this->isMedicare($eligibilityCheckData)) {
            $mbiLookupResponse = $this->mbiLookupAction->execute($eligibilityCheckData);
            $eligibilityResponse = $this->pVerifyEligibilitySummaryAction->execute(
                $eligibilityCheckData,
                $mbiLookupResponse
            );

            Log::info('Medicare eligible', ['response' => $eligibilityResponse]);

            return $this->getAvailableDMEProvidersAction->execute(
                new GetAvailableDMEProvidersDto(
                    payer: $eligibilityResponse['PayerName'],
                    state: $eligibilityCheckData->state
                )
            );
        }

        //medicare advantage flow

        //doespots flow

        return collect([]);
    }

    private function isMedicare(EligibilityCheckDto $eligibilityCheckData): bool
    {
        return $eligibilityCheckData->dob->diffInYears(now()) >= 65 && $eligibilityCheckData->plan_type === 'medicare';
    }
}
