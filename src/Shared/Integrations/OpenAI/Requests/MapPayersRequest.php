<?php

declare(strict_types=1);

namespace Lightit\Shared\Integrations\OpenAI\Requests;

use Lightit\Shared\Integrations\OpenAI\OpenAIConnector;
use Saloon\Contracts\Body\HasBody;
use Saloon\Enums\Method;
use Saloon\Http\Request;
use Saloon\Traits\Body\HasJsonBody;
use Saloon\Traits\Request\HasConnector;

class MapPayersRequest extends Request implements HasBody
{
    use HasConnector;
    use HasJsonBody;

    protected string $connector = OpenAIConnector::class;
    protected Method $method = Method::POST;

    public function __construct(public array $messages)
    {
    }

    protected function resolveMethod(): string
    {
        return 'POST';
    }

    public function resolveEndpoint(): string
    {
        return '/chat/completions';
    }

    public function defaultBody(): array
    {
        return [
            'model' => 'gpt-4o-mini',
            'messages' => $this->messages,
            'temperature' => 0.7
        ];
    }
}
