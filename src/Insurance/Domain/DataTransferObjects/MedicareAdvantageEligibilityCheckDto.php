<?php

declare(strict_types=1);

namespace Lightit\Insurance\Domain\DataTransferObjects;

use Carbon\Carbon;
use Lightit\Shared\App\Enums\USState;

readonly class MedicareAdvantageEligibilityCheckDto
{
    public function __construct(
        public string $member_id,
        public string $payer,
        public string $first_name,
        public string $last_name,
        public Carbon $dob,
        public USState $state,
    ) {
    }
}
