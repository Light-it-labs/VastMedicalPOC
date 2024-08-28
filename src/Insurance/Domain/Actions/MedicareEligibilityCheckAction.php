<?php

declare(strict_types=1);

namespace Lightit\Insurance\Domain\Actions;

use Illuminate\Support\Facades\Log;
use Lightit\Insurance\Domain\DataTransferObjects\MedicareEligibilityCheckDto;
use Lightit\Insurance\Domain\DataTransferObjects\MedicareEligibilityResponseDto;
use Lightit\Shared\Integrations\PVerify\DataTransferObjects\PVerifySubscriberDTO;
use Lightit\Shared\Integrations\PVerify\Requests\EligibilitySummary;

class MedicareEligibilityCheckAction
{
    public const MEDICARE_PAYER = 'Medicare Part A and Part B';
    public const MEDICARE_PAYER_CODE = '00007';

    public function execute(MedicareEligibilityCheckDto $getAvailableDMEProvidersDto): MedicareEligibilityResponseDto
    {
        $subscriberDTO = new PVerifySubscriberDto(
            firstName: $getAvailableDMEProvidersDto->first_name,
            lastName: $getAvailableDMEProvidersDto->last_name,
            dob: $getAvailableDMEProvidersDto->dob->format('Y-m-d'),
            memberID: $getAvailableDMEProvidersDto->member_id,
        );

        $eligibilityRequest = new EligibilitySummary(
            payerCode: self::MEDICARE_PAYER_CODE,
            subscriber: $subscriberDTO,
        );

        $response = $eligibilityRequest->send();

        if (! $response->ok() || ! $response->body() || $response->json()['APIResponseCode'] !== "1") {
            Log::error('Failed to check Medicare eligibility', ['response' => $response->json()]);
            throw new \Exception('Failed to check Medicare eligibility');
        }

        return new MedicareEligibilityResponseDto(
            is_eligible: true,
            member_id: $getAvailableDMEProvidersDto->member_id,
            payer: self::MEDICARE_PAYER,
            state: $getAvailableDMEProvidersDto->state,
            benefit: 'pharmacy'
        );
    }
}
