<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pverify_access_tokens', function (Blueprint $table) {
            $table->id();
            $table->string('access_token', 1024);
            $table->timestamp('expires_at');
            $table->text('raw_response');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pverify_access_tokens');
    }
};
