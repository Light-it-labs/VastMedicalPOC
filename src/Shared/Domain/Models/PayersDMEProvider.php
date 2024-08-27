<?php

declare(strict_types=1);

namespace Lightit\Shared\Domain\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Lightit\Backoffice\DMEProviders\Domain\Models\DMEProvider;
use Lightit\Backoffice\Payers\Domain\Models\Payer;
use Lightit\Shared\App\Enums\USState;

/**
 *
 *
 * @property int                             $id
 * @property int                             $payer_id
 * @property int                             $dme_provider_id
 * @property string                          $state
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 *
 * @method static Builder|PayersDMEProvider newModelQuery()
 * @method static Builder|PayersDMEProvider newQuery()
 * @method static Builder|PayersDMEProvider query()
 * @method static Builder|PayersDMEProvider whereCreatedAt($value)
 * @method static Builder|PayersDMEProvider whereDmeProviderId($value)
 * @method static Builder|PayersDMEProvider whereId($value)
 * @method static Builder|PayersDMEProvider wherePayerId($value)
 * @method static Builder|PayersDMEProvider whereState($value)
 * @method static Builder|PayersDMEProvider whereUpdatedAt($value)
 *
 * @property-read DMEProvider $dmeProvider
 * @property-read Payer $payer
 * @property int $data_sync_id
 *
 * @method static Builder|PayersDMEProvider whereDataSyncId($value)
 *
 * @mixin \Eloquent
 */
class PayersDMEProvider extends Model
{
    protected $casts = [
        'state' => USState::class,
    ];

    protected $table = 'payers_dme_providers';
    protected $guarded = ['id'];

    /**
     * @return BelongsTo<DMEProvider, PayersDMEProvider>
     */
    public function dmeProvider(): BelongsTo
    {
        return $this->belongsTo(DMEProvider::class);
    }

    /**
     * @return BelongsTo<Payer, PayersDMEProvider>
     */
    public function payer(): BelongsTo
    {
        return $this->belongsTo(Payer::class);
    }
}
