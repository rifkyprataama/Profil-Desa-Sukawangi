<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('pengaturan_berandas', function (Blueprint $table) {
            // Kita tambahkan kolom banner untuk sisa halaman lainnya
            $table->string('banner_profil')->nullable();
            $table->string('banner_pemerintahan')->nullable();
            $table->string('banner_pengaduan')->nullable();
            $table->string('banner_berita')->nullable();
            $table->string('banner_galeri')->nullable();
            // gambar_banner (untuk Beranda) & banner_kontak sudah atau bisa diwakilkan di sini
            $table->string('banner_kontak')->nullable(); 
        });
    }

    public function down(): void
    {
        Schema::table('pengaturan_berandas', function (Blueprint $table) {
            $table->dropColumn([
                'banner_profil', 'banner_pemerintahan', 'banner_pengaduan', 
                'banner_berita', 'banner_galeri', 'banner_kontak'
            ]);
        });
    }
};
