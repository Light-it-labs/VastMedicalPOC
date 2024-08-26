<?php

declare(strict_types=1);

namespace Lightit\Insurance\Domain\Actions;

use Illuminate\Support\Collection;
use Lightit\Backoffice\Payers\Domain\Models\Payer;
use Lightit\Shared\Domain\Models\PayersDMEProvider;
use Lightit\Insurance\Domain\DataTransferObjects\GetAvailableDMEProvidersDto;

class GetAvailableDMEProvidersAction
{
    /**
     * @return Collection<int, PayersDMEProvider>
     */
    public function execute(GetAvailableDMEProvidersDto $getAvailableDMEProvidersDto): Collection
    {
        $payer = Payer::where('name', $getAvailableDMEProvidersDto->payer)->firstOrFail();

        return PayersDMEProvider::where('payer_id', $payer->id)
            ->where('state', $getAvailableDMEProvidersDto->state)
            ->with(['dmeProvider', 'payer'])
            ->get();
    }
}
