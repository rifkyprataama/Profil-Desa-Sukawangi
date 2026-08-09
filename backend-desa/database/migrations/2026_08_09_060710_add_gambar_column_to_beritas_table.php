<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('beritas', function (Blueprint $table) {
            if (!Schema::hasColumn('beritas', 'gambar')) {
                $table->string('gambar')->nullable();
            }
            if (!Schema::hasColumn('beritas', 'slug')) {
                $table->string('slug')->nullable();
            }
            if (!Schema::hasColumn('beritas', 'isi_berita')) {
                $table->longText('isi_berita')->nullable();
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('beritas', function (Blueprint $table) {
            //
        });
    }
};
