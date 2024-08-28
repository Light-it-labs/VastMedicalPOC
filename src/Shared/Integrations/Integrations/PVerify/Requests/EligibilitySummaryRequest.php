<?php

declare(strict_types=1);

namespace Lightit\Shared\Integrations\Integrations\PVerify\Requests;

use Lightit\Backoffice\Users\Domain\DataTransferObjects\PVerifyEligibilitySummaryRequestDTO;
use Saloon\Http\Request;
use Saloon\Enums\Method;

class EligibilitySummaryRequest extends Request
{
    protected Method $method = Method::POST;
    
    public function __construct(
        protected PVerifyEligibilitySummaryRequestDTO $pVerifyEligibilitySummary,
    ) {}

    public function resolveEndpoint(): string
    {
        return '/EligibilitySummary';
    }

    public function body(): array
    {
        return $this->pVerifyEligibilitySummary->toArray();
    }
}
