<?php

declare(strict_types=1);

namespace Lightit\Insurance\Domain\Actions;

use Lightit\Backoffice\Pharmacies\Domain\DataTransferObjects\PharmacyDTO;
use Lightit\Insurance\Domain\DataTransferObjects\PharmacyBenefitCheckDto;

class PharmacyBenefitCheckAction
{
    /**
     * @return array<int, PharmacyDTO>
     */
    public function execute(PharmacyBenefitCheckDto $dto): array
    {
        return [
            new PharmacyDTO(price: 300, name: 'CVS Caremark'),
            new PharmacyDTO(price: 300, name: 'OptumRx'),
            new PharmacyDTO(price: 300, name: 'Express Scripts'),
        ];
    }
}
