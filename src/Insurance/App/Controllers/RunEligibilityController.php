<?php

declare(strict_types=1);

namespace Lightit\Insurance\App\Controllers;

use Illuminate\Http\JsonResponse;
use Lightit\Insurance\App\Request\EligibilityCheckRequest;
use Lightit\Insurance\Domain\Actions\RunEligibilityAction;

class RunEligibilityController
{
    public function __invoke(
        EligibilityCheckRequest $request,
        RunEligibilityAction $runEligibilityAction,
    ): JsonResponse {
        $eligibilityData = $request->toDto();

        $runEligibilityAction->execute($eligibilityData);
        return responder()
            ->success()
            ->respond();
    }
}
