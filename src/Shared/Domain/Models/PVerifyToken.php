<?php

declare(strict_types=1);

namespace Lightit\Shared\Domain\Models;

use Illuminate\Database\Eloquent\Model;

/**
 *
 *
 * @property int                             $id
 * @property int                             $access_token
 * @property int                             $expires_at
 * @property string                          $raw_response
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 *
 * @mixin \Eloquent
 */
class PVerifyToken extends Model
{

}
