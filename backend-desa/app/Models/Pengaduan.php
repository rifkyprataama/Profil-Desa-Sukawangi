<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pengaduan extends Model
{
    // Mengizinkan kolom-kolom ini diisi dari form (Mass Assignment)
    protected $fillable = [
        'nama_pelapor',
        'nik',
        'judul_laporan',
        'isi_laporan',
        'foto_bukti',
        'status'
    ];
}