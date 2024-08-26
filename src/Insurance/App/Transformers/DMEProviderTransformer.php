<?php

declare(strict_types=1);

namespace Lightit\Insurance\App\Transformers;

use Flugg\Responder\Transformers\Transformer;
use Lightit\Backoffice\DMEProviders\Domain\Models\DMEProvider;

class DMEProviderTransformer extends Transformer
{
    public function transform(DMEProvider $dMEProvider): array
    {
        return [
            'id' => $dMEProvider->id,
            'name' => $dMEProvider->name,
            'benefit_type' => $dMEProvider->benefit_type,
            'phone' => $dMEProvider->phone,
            'fax' => $dMEProvider->fax,
        ];
    }
}
