<?php

declare(strict_types=1);

namespace Lightit\Insurance\Domain\Actions;

use Lightit\Insurance\Domain\DataTransferObjects\EligibilityCheckDto;

class RunEligibilityAction
{


    public function execute(EligibilityCheckDto $eligibilityCheckData)
    {
        if ($this->isMedicare($eligibilityCheckData) || $this->isMedicareAdvantage($eligibilityCheckData)) {
        }
    }

    private function isMedicare(EligibilityCheckDto $eligibilityCheckData): bool
    {
        return $eligibilityCheckData->dob->diffInYears(now()) >= 65 && $eligibilityCheckData->plan_type === 'medicare';
    }

    private function isMedicareAdvantage(EligibilityCheckDto $eligibilityCheckData): bool
    {
        return $eligibilityCheckData->dob->diffInYears(now()) >= 65 && $eligibilityCheckData->plan_type === 'medicare_advantage';
    }
}
