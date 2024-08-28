<?php

declare(strict_types=1);

namespace Lightit\Shared\Integrations\PVerify\DataTransferObjects;

use Carbon\Carbon;

class EligibilitySummaryRequestDTO
{
    public function __construct(
        public string $firstName,
        public string $lastName,
        public Carbon $dob,
        public string $memberID,
        public string $payerCode,
    ) {
    }
}
