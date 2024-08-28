<?php

declare(strict_types=1);

namespace Lightit\Shared\Integrations\PVerify\Requests;

use Saloon\Enums\Method;

class GetEligibilitySummaryResultsRequest extends BaseRequest
{
    protected Method $method = Method::GET;

    public function __construct(public string $requestId)
    {
    }

    public function resolveEndpoint(): string
    {
        return 'api/GetEligibilitySummary/' . $this->requestId;
    }
}
