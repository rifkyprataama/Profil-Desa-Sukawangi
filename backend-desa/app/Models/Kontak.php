<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Kontak extends Model
{
    protected $fillable = [
        'alamat', 
        'telepon', 
        'email', 
        'jam_operasional', 
        'link_peta',
        // Tambahan kolom sosial media
        'link_instagram',
        'link_facebook',
        'link_youtube'
    ];
}