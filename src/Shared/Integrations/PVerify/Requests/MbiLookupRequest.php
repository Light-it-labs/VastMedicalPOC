<?php

declare(strict_types=1);

namespace Lightit\Shared\Integrations\PVerify\Requests;

use Lightit\Insurance\Domain\DataTransferObjects\MbiLookupRequestDto;
use Lightit\Shared\Integrations\PVerify\DataTransferObjects\PVerifyProviderDTO;
use Saloon\Contracts\Body\HasBody;
use Saloon\Enums\Method;
use Saloon\Traits\Body\HasJsonBody;

class MbiLookupRequest extends BaseRequest implements HasBody
{
    use HasJsonBody;

    protected Method $method = Method::POST;

    private readonly PVerifyProviderDTO $provider;

    public function __construct(
        protected MbiLookupRequestDto $mbiLookupRequestDto,
    ) {
        parent::__construct();
        $this->provider = new PVerifyProviderDTO();
    }

    public function resolveEndpoint(): string
    {
        return '/API/MBIInquiry';
    }

    protected function defaultBody(): array
    {
        return [
            "ProviderLastName" => $this->provider->lastName,
            "ProviderNPI" => $this->provider->npi,
            "PatientFirstName" => $this->mbiLookupRequestDto->firstName,
            "PatientLastName" => $this->mbiLookupRequestDto->lastName,
            "PatientDOB" => $this->mbiLookupRequestDto->dob->format('m/d/Y'),
        ];
    }
}
