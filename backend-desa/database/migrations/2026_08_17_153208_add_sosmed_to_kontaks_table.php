<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('kontaks', function (Blueprint $table) {
            $table->string('link_instagram')->nullable()->after('jam_operasional');
            $table->string('link_facebook')->nullable()->after('link_instagram');
            $table->string('link_youtube')->nullable()->after('link_facebook');
        });
    }

    public function down(): void
    {
        Schema::table('kontaks', function (Blueprint $table) {
            $table->dropColumn(['link_instagram', 'link_facebook', 'link_youtube']);
        });
    }
};
