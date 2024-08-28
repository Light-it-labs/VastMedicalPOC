<?php

declare(strict_types=1);

namespace Lightit\Insurance\Domain\DataTransferObjects;

use Carbon\Carbon;
use Lightit\Shared\App\Enums\USState;

readonly class EligibilityCheckDto
{
    public function __construct(
        public string $first_name,
        public string $last_name,
        public Carbon $dob,
        public string $street,
        public string $city,
        public USState $state,
        public string $zip,
        public string $plan_type,
        public string $diabetes_type,
        public string $diabetes_management,
    ) {
    }
}
