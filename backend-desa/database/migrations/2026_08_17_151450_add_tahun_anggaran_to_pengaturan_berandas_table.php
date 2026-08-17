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
        Schema::table('pengaturan_berandas', function (Blueprint $table) {
            // Menambahkan kolom tahun_anggaran
            $table->string('tahun_anggaran')->nullable()->default('2026')->after('realisasi_pendapatan');
        });
    }

    public function down(): void
    {
        Schema::table('pengaturan_berandas', function (Blueprint $table) {
            $table->dropColumn('tahun_anggaran');
        });
    }
};
