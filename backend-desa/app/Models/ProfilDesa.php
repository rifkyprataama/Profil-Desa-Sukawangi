<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProfilDesa extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama_kepala_desa',
        'foto_kepala_desa',
        'sambutan',
        'visi',
        'misi',
    ];
}