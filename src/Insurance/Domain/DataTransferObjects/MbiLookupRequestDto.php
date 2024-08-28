<?php

declare(strict_types=1);

namespace Lightit\Backoffice\Users\Domain\DataTransferObjects;

use Carbon\Carbon;

readonly class MbiLookupRequestDto
{
    public function __construct(
        public string $firstName,
        public string $lastName,
        public Carbon $dob,
    ) {
    }
}
