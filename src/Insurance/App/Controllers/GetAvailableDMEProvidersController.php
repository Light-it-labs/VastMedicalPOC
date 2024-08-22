<?php

declare(strict_types=1);

namespace Lightit\Insurance\App\Controllers;

use Illuminate\Http\JsonResponse;
use Lightit\Backoffice\Users\Domain\Actions\GetAvailableDMEProvidersAction;
use Lightit\Insurance\App\Request\DMEProviderTransformer;
use Lightit\Insurance\App\Request\GetAvailableDMEProvidersRequest;

class GetAvailableDMEProvidersController
{
    public function __invoke(
        GetAvailableDMEProvidersRequest $request,
        GetAvailableDMEProvidersAction $getAvailableDMEProvidersAction,
    ): JsonResponse {
        $dmeProviders = $getAvailableDMEProvidersAction->execute($request->toDto());

        return responder()
            ->success(
                $dmeProviders,
                DMEProviderTransformer::class
            )
            ->respond();
    }
}