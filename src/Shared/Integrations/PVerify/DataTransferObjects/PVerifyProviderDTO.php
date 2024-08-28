<?php

declare(strict_types=1);

namespace Lightit\Shared\Integrations\PVerify\DataTransferObjects;

class PVerifyProviderDTO
{
    public string $lastName;
    public string $npi;

    public function __construct(
        ?string $lastName = null,
        ?string $npi = null,
    ) {
        $this->lastName = $lastName ?? (string) config('services.pverify.provider_last_name');
        $this->npi = $npi ?? (string) config('services.pverify.provider_npi');
    }
}
