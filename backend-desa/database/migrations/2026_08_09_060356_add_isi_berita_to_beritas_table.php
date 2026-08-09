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
            // Tambahkan kolom isi_berita jika belum ada
            if (!Schema::hasColumn('beritas', 'isi_berita')) {
                $table->longText('isi_berita')->nullable();
            }
            // Pastikan juga kolom slug ada
            if (!Schema::hasColumn('beritas', 'slug')) {
                $table->string('slug')->nullable();
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
