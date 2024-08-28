<?php

declare(strict_types=1);

namespace Lightit\Insurance\Domain\Actions;

use Lightit\Backoffice\Users\Domain\DataTransferObjects\MbiLookupRequestDto;
use Lightit\Backoffice\Users\Domain\DataTransferObjects\PVerifyEligibilitySummaryRequestDTO;
use Lightit\Insurance\Domain\DataTransferObjects\EligibilityCheckDto;
use Lightit\Shared\Integrations\Integrations\PVerify\PVerifyConnector;
use Lightit\Shared\Integrations\Integrations\PVerify\Requests\EligibilitySummaryRequest;
use Lightit\Shared\Integrations\Integrations\PVerify\Requests\EligibilitySummaryResultsRequest;
use Lightit\Shared\Integrations\Integrations\PVerify\Requests\MbiLookupRequest;
use Lightit\Shared\Integrations\Integrations\PVerify\Requests\MbiLookupRequestResults;

class RunMbiLookupAction
{
    public function __construct(
        private PVerifyConnector $connector,
    ) {}

    public function execute(EligibilityCheckDto $eligibilityCheckDto)
    {
        $request = new EligibilitySummaryRequest(
            new PVerifyEligibilitySummaryRequestDTO()
        );
        $response = $this->connector->send($request);

        $eligibilitySummaryResponse = $response->json();

        sleep((int)config('services.pverify.sleep_seconds'));

        $getResultsRequest = new EligibilitySummaryResultsRequest($eligibilitySummaryResponse['requestId']);

        $getResultResponse = $this->connector->send($getResultsRequest);

        return $getResultResponse->json();
    }
}
