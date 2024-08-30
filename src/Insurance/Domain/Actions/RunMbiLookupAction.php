<?php

declare(strict_types=1);

namespace Lightit\Insurance\Domain\Actions;

use Lightit\Insurance\Domain\DataTransferObjects\EligibilityCheckDto;
use Lightit\Insurance\Domain\DataTransferObjects\MbiLookupRequestDto;
use Lightit\Shared\Integrations\PVerify\PVerifyConnector;
use Lightit\Shared\Integrations\PVerify\Requests\MbiLookupRequest;

class RunMbiLookupAction
{
    public function __construct(
        private readonly PVerifyConnector $connector,
    ) {
    }

    public function execute(EligibilityCheckDto $eligibilityCheckDto): array
    {
        $request = new MbiLookupRequest(
            new MbiLookupRequestDto(
                firstName: $eligibilityCheckDto->first_name,
                lastName: $eligibilityCheckDto->last_name,
                dob: $eligibilityCheckDto->dob,
            )
        );

        $response = $this->connector->send($request);

        return $response->json();
    }
}
