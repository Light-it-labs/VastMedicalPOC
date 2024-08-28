<?php

declare(strict_types=1);

namespace Lightit\Shared\Integrations\PVerify\DataTransferObjects;

class PVerifyProviderDTO
{
    public function __construct(
        public string $lastName = 'Palumbo',
        public string $npi = '1043478878',
    ) {
    }
}
