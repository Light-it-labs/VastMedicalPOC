<?php

declare(strict_types=1);

namespace Lightit\Shared\Integrations\Integrations\PVerify\Requests;

use Lightit\Backoffice\Users\Domain\DataTransferObjects\MbiLookupRequestDto;
use Lightit\Shared\Integrations\PVerify\DataTransferObjects\PVerifyProviderDTO;
use Saloon\Enums\Method;
use Saloon\Http\Request;

class MbiLookupRequest extends Request
{
    protected Method $method = Method::POST;

    private readonly PVerifyProviderDTO $provider;

    public function __construct(
        protected MbiLookupRequestDto $mbiLookupRequestDto,
    ) {
        $this->provider = new PVerifyProviderDTO();
    }

    public function resolveEndpoint(): string
    {
        return '/MBIInquiry';
    }

    public function body(): array
    {
        return [
            "ProviderLastName" => $this->provider->lastName,
            "ProviderNPI" => $this->provider->npi,
            "PatientFirstName" => $this->mbiLookupRequestDto->firstName,
            "PatientLastName" => $this->mbiLookupRequestDto->lastName,
            "PatientDOB" => $this->mbiLookupRequestDto->dob->format('MM-dd-YYYY'),
        ];
    }
}
