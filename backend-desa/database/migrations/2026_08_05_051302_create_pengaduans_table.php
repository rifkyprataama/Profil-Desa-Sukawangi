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
            $table->string('nama')->nullable(); // Menyesuaikan dengan React
            $table->string('nik', 16)->nullable(); 
            $table->string('no_wa'); // Tambahan nomor WhatsApp
            $table->string('kategori'); // Tambahan kategori laporan
            $table->text('pesan'); // Mengganti isi_laporan menjadi pesan
            $table->boolean('is_anonim')->default(false); // Menampung status anonim
            $table->string('lampiran')->nullable(); // Mengganti foto_bukti menjadi lampiran
            
            // Menggunakan string biasa agar lebih fleksibel di Filament
            $table->string('status')->default('Menunggu Verifikasi'); 
            
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pengaduans');
    }
};