<?php

declare(strict_types=1);

namespace Lightit\Shared\Integrations\Integrations\PVerify\Requests;

use Lightit\Backoffice\Users\Domain\DataTransferObjects\PVerifyEligibilitySummaryRequestDTO;
use Saloon\Http\Request;

class EligibilitySummary extends Request
{
    public function __construct(
        protected PVerifyEligibilitySummaryRequestDTO $pVerifyEligibilitySummary,
    ) {
    }

    public function resolveEndpoint(): string
    {
        return '/EligibilitySummary';
    }

    public function body(): array
    {
        return $this->pVerifyEligibilitySummary->toArray();
    }
}
