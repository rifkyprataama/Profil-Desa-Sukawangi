<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Galeri extends Model
{
    protected $fillable = [
        'judul_kegiatan',
        'kategori',
        'tipe',          // 'foto' atau 'video'
        'file_gambar',   // Thumbnail/Foto Utama
        'link_video',    // ID Youtube
        'deskripsi'
    ];
}