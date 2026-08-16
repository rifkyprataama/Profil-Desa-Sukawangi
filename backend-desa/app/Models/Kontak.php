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
        'link_peta'
    ];
}