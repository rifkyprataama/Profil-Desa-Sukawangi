<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('profil_desas', function (Blueprint $table) {
            $table->id();
            
            // 1. Identitas Utama
            $table->string('nama_desa')->default('Sukawangi');
            $table->string('nama_kepala_desa')->nullable();
            $table->string('foto_kepala_desa')->nullable();
            $table->string('email')->nullable();
            $table->string('no_telepon')->nullable();
            
            // 2. Sejarah, Visi, Misi
            $table->longText('sejarah')->nullable();
            $table->text('visi')->nullable();
            $table->longText('misi')->nullable();
            $table->text('sambutan')->nullable();

            // 3. Data Geografis & Batas Wilayah
            $table->string('luas_wilayah')->nullable();
            $table->string('luas_dihuni')->nullable();
            $table->string('batas_utara')->nullable();
            $table->string('batas_selatan')->nullable();
            $table->string('batas_timur')->nullable();
            $table->string('batas_barat')->nullable();
            $table->text('link_peta')->nullable(); // Untuk link iframe maps

            // 4. Data Demografi
            $table->integer('total_penduduk')->nullable();
            $table->integer('penduduk_laki_laki')->nullable();
            $table->integer('penduduk_perempuan')->nullable();
            $table->integer('jumlah_dusun')->nullable();
            $table->integer('jumlah_rw')->nullable();

            // 5. Infrastruktur
            $table->integer('jumlah_sekolah')->nullable();
            $table->integer('jumlah_puskesmas')->nullable();
            $table->integer('jumlah_masjid')->nullable();
            $table->integer('jumlah_fasum')->nullable();
            
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('profil_desas');
    }
};