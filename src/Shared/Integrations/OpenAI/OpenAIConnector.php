<?php

namespace Lightit\Shared\Integrations\OpenAI;

use Saloon\Http\Auth\TokenAuthenticator;
use Saloon\Http\Connector;

class OpenAIConnector extends Connector
{

    public function resolveBaseUrl(): string
    {
        return 'https://api.openai.com/v1';
    }

    public function resolveHeaders(): array
    {
        return [
            "Content-Type" => "application/json",
        ];
    }

    protected function defaultAuth(): TokenAuthenticator
    {
        /** @var string $token */
        $token = config('services.openai.api_key');

        return new TokenAuthenticator($token);
    }
}
