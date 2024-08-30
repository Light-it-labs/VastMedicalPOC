<?php

declare(strict_types=1);

namespace Lightit\Shared\Integrations\PVerify\Requests;

use Illuminate\Support\Facades\Cache;
use Lightit\Shared\Integrations\PVerify\Actions\Authenticate;
use Lightit\Shared\Integrations\PVerify\PVerifyConnector;
use Saloon\Http\Auth\TokenAuthenticator;
use Saloon\Http\Request;
use Saloon\Traits\Request\HasConnector;

abstract class BaseRequest extends Request
{
    use HasConnector;

    protected string $connector = PVerifyConnector::class;
    
    private string $token;

    public function __construct()
    {
        /** @var string $token */
        $token = Cache::get('pverify_token', function () {
            $auth = new Authenticate();

            return $auth->authenticate();
        });

        $this->token = $token;
    }

    abstract public function resolveEndpoint(): string;

    protected function defaultAuth(): TokenAuthenticator
    {
        return new TokenAuthenticator($this->token);
    }
}
