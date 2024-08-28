<?php

declare(strict_types=1);

namespace Lightit\Insurance\Domain\Actions;

use Lightit\Shared\Domain\Models\PVerifyToken;
use Lightit\Shared\Integrations\Integrations\PVerify\PVerifyConnector;
use Lightit\Shared\Integrations\Integrations\PVerify\Requests\GetTokenRequest;

class GetPVerifyAccessTokenAction
{
    public function __construct(
        private PVerifyConnector $connector,
    ) {}

    public function execute(): string
    {
        $validToken = PVerifyToken::where('expires_at', '>', now())->first();
        if ($validToken) {
            return $validToken->token;
        }

        $request = new GetTokenRequest();
        $response = $this->connector->send($request);

        $getTokenResponse = $response->json();

        $token = PVerifyToken::create([
            'token' => $getTokenResponse['access_token'],
            'expires_at' => now()->addSeconds($getTokenResponse['expires_in']),
            'raw_response' => json_encode($getTokenResponse),
        ]);

        return  $token->access_token;
    }
}
