<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProfilDesa extends Model
{
    use HasFactory;

    // 1. Mengganti $fillable menjadi $guarded agar semua kolom diizinkan masuk
    protected $guarded = [];

    // 2. Memberikan nilai otomatis untuk kolom yang kosong dari form
    protected $attributes = [
        'nama_desa' => 'Sukawangi',
    ];
}