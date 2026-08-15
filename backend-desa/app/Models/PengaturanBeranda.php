<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PengaturanBeranda extends Model
{
    protected $guarded = [];

    protected $attributes = [
        'judul_banner' => 'Website Resmi Desa Sukawangi',
        'subjudul_banner' => 'Wadah layanan publik dan transparansi informasi untuk mewujudkan masyarakat Desa Sukawangi yang mandiri, sejahtera, dan berbudaya.',
        'realisasi_pendapatan' => 'Rp 1.85 M',
        'persentase_dd' => 65,
        'persentase_add' => 25,
        'persentase_pades' => 10,
    ];
}