<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('integrations_payers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('integration_id')->constrained('integrations');
            $table->foreignId('payer_id')->constrained('payers');
            $table->string('external_id');
            $table->string('state');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('integrations_payers');
    }
};
