<?php

declare(strict_types=1);

namespace Lightit\Shared\Integrations\PVerify\Requests;

use Illuminate\Support\Carbon;
use Lightit\Shared\Integrations\PVerify\DataTransferObjects\EligibilitySummaryRequestDTO;
use Lightit\Shared\Integrations\PVerify\DataTransferObjects\PVerifyProviderDTO;
use Saloon\Contracts\Body\HasBody;
use Saloon\Enums\Method;
use Saloon\Traits\Body\HasJsonBody;

class EligibilitySummaryRequest extends BaseRequest implements HasBody
{
    use HasJsonBody;

    protected Method $method = Method::POST;
    protected PVerifyProviderDTO $provider;

    public function __construct(
        public EligibilitySummaryRequestDTO $data,
    ) {
        $this->provider = new PVerifyProviderDTO();
        parent::__construct();
    }

    public function resolveEndpoint(): string
    {
        return 'API/EligibilitySummary';
    }

    protected function defaultBody(): array
    {
        return [
            "payerCode" => $this->data->payerCode,
            "provider" => [
                "lastName" => $this->provider->lastName,
                "npi" => $this->provider->npi,
            ],
            "subscriber" => [
                "firstName" => $this->data->firstName,
                "lastName" => $this->data->lastName,
                "dob" => $this->data->dob->format('m/d/Y'),
                "memberID" => $this->data->memberID,
            ],
            "isSubscriberPatient" => "True",
            "doS_StartDate" => Carbon::now()->subDay()->format('m/d/Y'),
            "doS_EndDate" => Carbon::now()->addDay()->format('m/d/Y'),
        ];
    }
}
