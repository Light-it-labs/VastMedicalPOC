<?php

declare(strict_types=1);

namespace Lightit\Insurance\App\Controllers;

use Illuminate\Http\JsonResponse;
use Lightit\Insurance\App\Request\PharmacyBenefitCheckRequest;
use Lightit\Insurance\Domain\Actions\PharmacyBenefitCheckAction;

class PharmacyBenefitCheckController
{
    public function __invoke(
        PharmacyBenefitCheckRequest $request,
        PharmacyBenefitCheckAction $action,
    ): JsonResponse {
        $result = $action->execute($request->toDto());

        return responder()
            ->success([$result])
            ->respond();
    }
}
