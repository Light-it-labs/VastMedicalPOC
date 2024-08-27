<?php

declare(strict_types=1);

namespace Lightit\Insurance\Domain\DataTransferObjects;

use Lightit\Shared\App\Enums\USState;

readonly class GetAvailableDMEProvidersDto
{
    public function __construct(
        public string $payer,
        public USState $state,
    ) {
    }
}
