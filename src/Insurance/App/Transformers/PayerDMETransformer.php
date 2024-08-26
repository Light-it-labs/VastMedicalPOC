<?php

namespace Lightit\Insurance\App\Transformers;

use Flugg\Responder\Transformers\Transformer;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Lightit\Insurance\Domain\DataTransferObjects\PayerDMEProviderDto;
use Lightit\Shared\Domain\Models\PayersDMEProvider;

class PayerDMETransformer extends Transformer
{
    protected $relations = [
        'dmeProvider' => DMEProviderTransformer::class,
    ];

    public function transform(PayersDMEProvider $payerDMEProvider): array
    {
        return [
            'id' => $payerDMEProvider->id,
            'dmeProvider' => (new DMEProviderTransformer)->transform($payerDMEProvider->dmeProvider),
            'state' => $payerDMEProvider->state->value,
        ];
    }
}
