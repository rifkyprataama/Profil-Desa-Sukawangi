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
        Schema::create('pengaturan_berandas', function (Blueprint $table) {
            $table->id();
            
            // Teks Banner Hero
            $table->string('judul_banner')->nullable();
            $table->text('subjudul_banner')->nullable();
            
            // Kolom Gambar Banner (Semua Halaman)
            $table->string('gambar_banner')->nullable();
            $table->string('banner_profil')->nullable();
            $table->string('banner_pemerintahan')->nullable();
            $table->string('banner_pengaduan')->nullable();
            $table->string('banner_berita')->nullable();
            $table->string('banner_galeri')->nullable();
            $table->string('banner_kontak')->nullable();
            
            // Angka APBDes
            $table->string('tahun_anggaran')->nullable();
            $table->string('realisasi_pendapatan')->nullable();
            $table->integer('persentase_dd')->nullable();
            $table->integer('persentase_add')->nullable();
            $table->integer('persentase_pades')->nullable();
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pengaturan_berandas');
    }
};