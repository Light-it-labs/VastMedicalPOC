<?php

declare(strict_types=1);

namespace Lightit\Shared\Integrations\PVerify\Requests;

use Lightit\Shared\Integrations\PVerify\PVerifyConnector;
use Saloon\Enums\Method;
use Saloon\Traits\Request\HasConnector;

class GetAllPayers extends BaseRequest
{
    use HasConnector;

    protected string $connector = PVerifyConnector::class;
    protected Method $method = Method::GET;

    public function resolveEndpoint(): string
    {
        return '/api/GetAllPayers';
    }
}
