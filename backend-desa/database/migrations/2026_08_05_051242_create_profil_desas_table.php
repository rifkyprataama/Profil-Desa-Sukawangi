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
            $table->string('nama_desa');
            $table->text('sejarah')->nullable();
            $table->text('visi')->nullable();
            $table->text('misi')->nullable();
            $table->integer('total_penduduk')->nullable(); 
            $table->string('luas_wilayah')->nullable();    
            $table->integer('jumlah_dusun')->nullable();   
            $table->text('alamat')->nullable();
            $table->string('no_telepon')->nullable();
            $table->string('email')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('profil_desas');
    }
};