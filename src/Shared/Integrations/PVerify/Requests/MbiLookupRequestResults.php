<?php

declare(strict_types=1);

namespace Lightit\Shared\Integrations\PVerify\Requests;

use Saloon\Enums\Method;

class MbiLookupRequestResults extends BaseRequest
{
    protected Method $method = Method::GET;

    public function __construct(
        protected string $requestId,
    ) {
        parent::__construct();
    }

    public function resolveEndpoint(): string
    {
        return "/API/GetMBIResponse/{$this->requestId}";
    }
}
