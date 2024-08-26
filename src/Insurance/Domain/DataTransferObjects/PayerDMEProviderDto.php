<?php

declare(strict_types=1);

namespace Lightit\Insurance\Domain\DataTransferObjects;

use Lightit\Backoffice\DMEProviders\Domain\Models\DMEProvider;
use Lightit\Backoffice\Payers\Domain\Models\Payer;
use Lightit\Shared\App\Enums\USState;

readonly class PayerDMEProviderDto
{
    public function __construct(
        public int $id,
        public Payer $payer,
        public DMEProvider $dmeProvider,
        public USState $state,
    ) {
    }
}
