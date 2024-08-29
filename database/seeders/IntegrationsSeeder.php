<?php

declare(strict_types=1);

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Lightit\Backoffice\Integrations\Domain\Models\Integration;

class IntegrationsSeeder extends Seeder
{
    public function run(): void
    {
        Integration::create([
            'name' => 'pVerify',
        ]);
    }
}
