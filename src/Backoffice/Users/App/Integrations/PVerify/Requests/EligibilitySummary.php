<?php

declare(strict_types=1);

namespace Lightit\Backoffice\Users\App\Integrations\PVerify\Requests;

use Lightit\Insurance\Domain\DataTransferObjects\pVerifyEligibilitySummaryRequestDTO;
use Saloon\Http\Request;

class EligibilitySummary extends Request
{
    public function __construct(
        protected pVerifyEligibilitySummaryRequestDTO $pVerifyEligibilitySummary,
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