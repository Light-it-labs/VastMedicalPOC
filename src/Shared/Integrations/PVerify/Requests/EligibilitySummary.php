<?php

declare(strict_types=1);

namespace Lightit\Shared\Integrations\PVerify\Requests;

use Illuminate\Support\Carbon;
use Lightit\Shared\Integrations\PVerify\DataTransferObjects\PVerifyProviderDTO;
use Lightit\Shared\Integrations\PVerify\DataTransferObjects\PVerifySubscriberDTO;
use Saloon\Contracts\Body\HasBody;
use Saloon\Enums\Method;
use Saloon\Traits\Body\HasJsonBody;

class EligibilitySummary extends BaseRequest implements HasBody
{
    use HasJsonBody;

    protected Method $method = Method::POST;
    protected PVerifyProviderDTO $provider;

    public function __construct(
        public string $payerCode,
        public PVerifySubscriberDTO $subscriber,
    ) {
        $this->provider = new PVerifyProviderDTO();
        parent::__construct();
    }

    public function resolveEndpoint(): string
    {
        return 'api/EligibilitySummary';
    }

    protected function defaultBody(): array
    {
        return [
            "payerCode" => $this->payerCode,
            "provider" => [
                "lastName" => $this->provider->lastName,
                "npi" => $this->provider->npi,
            ],
            "subscriber" => [
                "firstName" => $this->subscriber->firstName,
                "lastName" => $this->subscriber->lastName,
                "dob" => $this->subscriber->dob,
                "memberID" => $this->subscriber->memberID,
            ],
            "isSubscriberPatient" => "True",
            "doS_StartDate" => Carbon::now()->subDay()->format('m-d-Y'),
            "doS_EndDate" => Carbon::now()->addDay()->format('m-d-Y'),
        ];
    }
}
