<?php

declare(strict_types=1);

namespace Lightit\Backoffice\Pharmacies\Domain\DataTransferObjects;

class PharmacyDTO
{
    public function __construct(
        public string $name,
        public int $price,
    ) {
    }

    public function toArray(): array
    {
        return [
            'name' => $this->name,
            'price' => $this->price,
        ];
    }
}
