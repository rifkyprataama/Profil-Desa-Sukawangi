<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ProfilDesa;

class ProfilDesaController extends Controller
{
    public function index()
    {
        // Mengambil data profil desa pertama (karena kita hanya butuh 1 baris data)
        $profil = ProfilDesa::first();
        
        // Mengembalikan data dalam bentuk JSON agar bisa dibaca oleh React
        return response()->json($profil);
    }
}