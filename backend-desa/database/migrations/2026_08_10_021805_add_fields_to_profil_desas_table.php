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
        Schema::table('profil_desas', function (Blueprint $table) {
            if (!Schema::hasColumn('profil_desas', 'nama_kepala_desa')) {
                $table->string('nama_kepala_desa')->nullable();
            }
            if (!Schema::hasColumn('profil_desas', 'foto_kepala_desa')) {
                $table->string('foto_kepala_desa')->nullable();
            }
            if (!Schema::hasColumn('profil_desas', 'sambutan')) {
                $table->text('sambutan')->nullable();
            }
            if (!Schema::hasColumn('profil_desas', 'visi')) {
                $table->text('visi')->nullable();
            }
            if (!Schema::hasColumn('profil_desas', 'misi')) {
                $table->longText('misi')->nullable();
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('profil_desas', function (Blueprint $table) {
            //
        });
    }
};
