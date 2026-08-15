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
            
            // Angka APBDes
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
