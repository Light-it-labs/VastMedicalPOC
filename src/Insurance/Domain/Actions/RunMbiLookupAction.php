<?php

declare(strict_types=1);

namespace Lightit\Insurance\Domain\Actions;

use Lightit\Backoffice\Users\Domain\DataTransferObjects\MbiLookupRequestDto;
use Lightit\Insurance\Domain\DataTransferObjects\EligibilityCheckDto;
use Lightit\Shared\Integrations\Integrations\PVerify\PVerifyConnector;
use Lightit\Shared\Integrations\Integrations\PVerify\Requests\MbiLookupRequest;

class RunMbiLookupAction
{
    public function __construct(
        private PVerifyConnector $connector,
    ) {}

    public function execute(EligibilityCheckDto $eligibilityCheckDto)
    {
        $request = new MbiLookupRequest(new MbiLookupRequestDto(
            firstName: $eligibilityCheckDto->first_name,
            lastName: $eligibilityCheckDto->last_name,
            dob: $eligibilityCheckDto->dob,
        ));
        $response = $this->connector->send($request);
       
        $mbiLookupResponseBody = $response->json();

       return $mbiLookupResponseBody;
    }
}
