<?php

declare(strict_types=1);

namespace Lightit\Shared\Integrations\Integrations\PVerify\Requests;

use Lightit\Backoffice\Users\Domain\DataTransferObjects\MbiLookupRequestDto;
use Saloon\Enums\Method;
use Saloon\Http\Request;
use Saloon\Http\Response;

class MbiLookupRequest extends Request
{
    protected Method $method = Method::POST;

    public function __construct(
        protected MbiLookupRequestDto $mbiLookupRequestDto,
    ) {}

    public function resolveEndpoint(): string
    {
        return '/MBIInquiry';
    }

    public function body(): array
    {
        return [
            "ProviderLastName" => (string) config('services.pverify.provider_last_name'),
            "ProviderNPI" => (string) config('services.pverify.provider_npi'),
            "PatientFirstName" => $this->mbiLookupRequestDto->firstName,
            "PatientLastName" => $this->mbiLookupRequestDto->lastName,
            "PatientDOB" => $this->mbiLookupRequestDto->dob->format('MM-dd-YYYY'),
        ];
    }
}
