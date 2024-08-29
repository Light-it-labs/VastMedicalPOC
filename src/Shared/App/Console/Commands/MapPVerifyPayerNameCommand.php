<?php

declare(strict_types=1);

namespace Lightit\Shared\App\Console\Commands;

use Illuminate\Console\Command;
use Lightit\Backoffice\Payers\Domain\Models\Payer;
use Lightit\Shared\Domain\Actions\GetQuestMatrix;
use Lightit\Shared\Integrations\OpenAI\Requests\MapPayers;
use Lightit\Shared\Integrations\OpenAI\Requests\MapPayersRequest;
use Lightit\Shared\Integrations\PVerify\Requests\GetAllPayers;

class MapPVerifyPayerNameCommand extends Command
{
    /**
     * @var string
     */
    protected $signature = 'app:map-p-verify-payer-name-command';

    /**
     * @var string
     */
    protected $description = 'Command description';

    public function handle(
        GetAllPayers $pVerifyPayerRequest,
    ): int
    {
        $pVerifyPayersResponse = $pVerifyPayerRequest->send();
        $pVerifyPayerList = collect($pVerifyPayersResponse->json());
        $payerNames = $pVerifyPayerList->pluck('payerName')->toArray();
        $questPayers = Payer::all()->pluck('name')->toArray();
        $mapPayersRequest = new MapPayersRequest([[
            'role' => 'user',
            'content' => "Ill provide two lists of payers,
            I need you to map the payers from PVerify to the payers from Quest.
            Here are the payers from PVerify: " . implode(', ', $payerNames) .
                ". And here are the payers from Quest: " . implode(', ', $questPayers) .
                " there are some payers in pverify that are in quest but with a different name for each state we need to group those,
                responde in a json format with the payer from quest as the key and the payers that are a potential match from quest as the value."
        ]]);
        $openAIResponse = $mapPayersRequest->send();
        $this->info($openAIResponse->json()['choices'][0]['message']['content']);

        return self::SUCCESS;
    }
}
