<?php

declare(strict_types=1);

namespace Lightit\Shared\Integrations\PVerify\DataTransferObjects;

class PVerifySubscriberDTO
{
    public function __construct(
        public string $firstName,
        public string $lastName,
        public string $dob,
        public string $memberID,
    ) {
    }
}
