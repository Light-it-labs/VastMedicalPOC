<?php

declare(strict_types=1);

namespace Lightit\Insurance\Domain\Actions;

use Lightit\Insurance\Domain\DataTransferObjects\EligibilityCheckDto;
use Lightit\Shared\Integrations\PVerify\DataTransferObjects\EligibilitySummaryRequestDTO;
use Lightit\Shared\Integrations\PVerify\PVerifyConnector;
use Lightit\Shared\Integrations\PVerify\Requests\EligibilitySummaryRequest;
use Lightit\Shared\Integrations\PVerify\Requests\GetEligibilitySummaryResultsRequest;

class RunPVerifyEligibilitySummaryAction
{
    public const MEDICARE_PAYER = 'Medicare Part A and Part B';
    public const MEDICARE_PAYER_CODE = '00007';

    public function __construct(
        private readonly PVerifyConnector $connector,
    ) {
    }

    public function execute(EligibilityCheckDto $eligibilityCheckDto, array $mbiLookupResponse): array
    {
        $request = new EligibilitySummaryRequest(
            new EligibilitySummaryRequestDTO(
                firstName: $eligibilityCheckDto->first_name,
                lastName: $eligibilityCheckDto->last_name,
                dob: $eligibilityCheckDto->dob,
                memberID: $mbiLookupResponse['mbi'],
                payerCode: self::MEDICARE_PAYER_CODE
            )
        );

        $response = $this->connector->send($request);

        $eligibilitySummaryResponse = $response->json();

        sleep((int) config('services.pverify.sleep_seconds'));

        $getResultsRequest = new GetEligibilitySummaryResultsRequest((string) $eligibilitySummaryResponse['RequestId']);

        $getResultResponse = $this->connector->send($getResultsRequest);

        return $getResultResponse->json();
    }
}
