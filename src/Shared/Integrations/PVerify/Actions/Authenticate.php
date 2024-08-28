<?php

declare(strict_types=1);

namespace Lightit\Shared\Integrations\PVerify\Actions;

use Illuminate\Support\Facades\Cache;
use Lightit\Shared\Integrations\PVerify\Requests\GetToken;

class Authenticate
{
    private readonly GetToken $getToken;

    public function __construct()
    {
        $this->getToken = new GetToken();
    }

    public function authenticate(): string
    {
        $response = $this->getToken->send();
        if (! $response->ok() || ! $response->body()) {
            throw new \Exception('Failed to authenticate with PVerify');
        }
        $responseBody = $response->json();
        /** @var string $token */
        $token = $responseBody['access_token'];
        Cache::put('pverify_token', $token, $responseBody['expires_in'] / 60);

        return $token;
    }
}
