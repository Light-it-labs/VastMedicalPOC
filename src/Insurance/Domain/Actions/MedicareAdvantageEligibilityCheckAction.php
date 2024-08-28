<?php

declare(strict_types=1);

namespace Lightit\Insurance\Domain\Actions;

use Illuminate\Support\Facades\Log;
use Lightit\Insurance\Domain\DataTransferObjects\MedicareAdvantageEligibilityCheckDto;
use Lightit\Insurance\Domain\DataTransferObjects\MedicareAdvantageEligibilityResponseDto;
use Lightit\Shared\Integrations\PVerify\DataTransferObjects\PVerifySubscriberDTO;
use Lightit\Shared\Integrations\PVerify\Requests\EligibilitySummary;
use Lightit\Shared\Integrations\PVerify\Requests\GetEligibilitySummary;

class MedicareAdvantageEligibilityCheckAction
{
    public function execute(
        MedicareAdvantageEligibilityCheckDto $getAvailableDMEProvidersDto,
    ): MedicareAdvantageEligibilityResponseDto {
        $subscriberDTO = new PVerifySubscriberDto(
            firstName: $getAvailableDMEProvidersDto->first_name,
            lastName: $getAvailableDMEProvidersDto->last_name,
            dob: $getAvailableDMEProvidersDto->dob->format('Y-m-d'),
            memberID: $getAvailableDMEProvidersDto->member_id,
        );

        $eligibilityRequest = new EligibilitySummary(
            payerCode: $getAvailableDMEProvidersDto->payer,
            subscriber: $subscriberDTO,
        );

        $response = $eligibilityRequest->send();
        $eligibilityResponse = $response->json();

        if (! $response->ok() || $eligibilityResponse['APIResponseCode'] !== "0") {
            Log::error('Failed to check Medicare eligibility', ['response' => $response->json()]);
            throw new \Exception('Failed to check Medicare eligibility');
        }

        sleep(5);
        $eligibilityResultRequest = new GetEligibilitySummary(
            requestId: $eligibilityResponse['RequestID'],
        );
        $eligibilityResultResponse = $eligibilityResultRequest->send()->json();
        /** @var array $dmeSummary */
        $dmeSummary = $eligibilityResultResponse['DMESummary'];

        return new MedicareAdvantageEligibilityResponseDto(
            is_eligible: ! ($dmeSummary['ServiceCoveredInNet'] === "NO"),
            member_id: $getAvailableDMEProvidersDto->member_id,
            payer: $getAvailableDMEProvidersDto->payer,
            state: $getAvailableDMEProvidersDto->state,
            benefit: 'pharmacy'
        );
    }
}
