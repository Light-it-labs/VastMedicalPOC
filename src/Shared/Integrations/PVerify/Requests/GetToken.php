<?php

declare(strict_types=1);

namespace Lightit\Shared\Integrations\PVerify\Requests;

use Lightit\Shared\Integrations\PVerify\PVerifyConnector;
use Saloon\Contracts\Body\HasBody;
use Saloon\Enums\Method;
use Saloon\Http\Request;
use Saloon\Traits\Body\HasFormBody;
use Saloon\Traits\Request\HasConnector;

class GetToken extends Request implements HasBody
{
    use HasFormBody;
    use HasConnector;

    protected string $connector = PVerifyConnector::class;
    protected Method $method = Method::POST;

    public function resolveEndpoint(): string
    {
        return '/Token';
    }

    public function defaultHeaders(): array
    {
        return [
            "Content-Type" => "application/x-www-form-urlencoded"
        ];
    }

    protected function defaultBody(): array
    {
        return [
            'Client_Id' => config('services.pverify.client_api_id'),
            'Client_Secret' => config('services.pverify.client_secret'),
            'grant_type' => 'client_credentials',
        ];
    }
}
