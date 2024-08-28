<?php

declare(strict_types=1);

namespace Lightit\Shared\Integrations\Integrations\PVerify\Requests;

use Saloon\Enums\Method;
use Saloon\Http\Request;

class MbiLookupRequestResults extends Request
{
    protected Method $method = Method::GET;

    public function __construct(
        protected string $requestId,
    ) {
    }

    public function resolveEndpoint(): string
    {
        return "/GetMBIResponse/{$this->requestId}";
    }
}
