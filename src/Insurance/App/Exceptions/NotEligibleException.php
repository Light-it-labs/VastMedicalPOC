<?php

declare(strict_types=1);

namespace Lightit\Insurance\App\Exceptions;

use Flugg\Responder\Exceptions\Http\HttpException;

class NotEligibleException extends HttpException
{
    /**
     * An HTTP status code.
     *
     * @var int
     */
    protected $status = 422;

    /**
     * An error code.
     *
     * @var string|null
     */
    protected $errorCode = 'not_eligible';
}
