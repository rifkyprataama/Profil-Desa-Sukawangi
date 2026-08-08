<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pengaduans', function (Blueprint $table) {
            $table->id();
            $table->string('nama_pelapor');
            $table->string('nik', 16)->nullable();
            $table->string('judul_laporan');
            $table->text('isi_laporan');
            $table->string('foto_bukti')->nullable();
            $table->enum('status', ['menunggu', 'diproses', 'selesai'])->default('menunggu');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pengaduans');
    }
};