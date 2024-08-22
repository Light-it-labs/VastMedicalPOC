<?php

declare(strict_types=1);

namespace Lightit\Insurance\App\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MedicareAdvantageEligibilityCheckController
{
    public function __invoke(Request $request): JsonResponse
    {
        return response()->json([
            'message' => 'Medicare eligibility check'
        ]);
    }
}
