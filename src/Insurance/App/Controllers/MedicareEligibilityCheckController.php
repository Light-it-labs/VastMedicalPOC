<?php

declare(strict_types=1);

namespace Lightit\Insurance\App\Controllers;

use Illuminate\Http\JsonResponse;
use Lightit\Insurance\Domain\Actions\MedicareEligibilityCheckAction;
use Lightit\Insurance\App\Transformers\MedicareEligibilityCheckRequest;
use Lightit\Insurance\App\Transformers\MedicareEligibilityResponseTransformer;

class MedicareEligibilityCheckController
{
    public function __invoke(
        MedicareEligibilityCheckRequest $request,
        MedicareEligibilityCheckAction $medicareEligibilityCheckAction,
    ): JsonResponse {
        $medicareEligibilityResponse = $medicareEligibilityCheckAction->execute($request->toDto());

        return responder()
            ->success(
                $medicareEligibilityResponse,
                MedicareEligibilityResponseTransformer::class
            )
            ->respond();
    }
}
