<?php

declare(strict_types=1);

namespace Lightit\Insurance\App\Transformers;

use Flugg\Responder\Transformers\Transformer;
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
            'dmeProvider' => (new DMEProviderTransformer())->transform($payerDMEProvider->dmeProvider),
            'state' => $payerDMEProvider->state,
        ];
    }
}
