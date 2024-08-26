<?php

declare(strict_types=1);

namespace Lightit\Insurance\Domain\DataTransferObjects;

use Carbon\Carbon;

readonly class MedicareEligibilityCheckDto
{
    public function __construct(
        public string $member_id,
        public string $first_name,
        public string $last_name,
        public Carbon $dob,
    ) {
    }
}
