<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ProfilDesa;
use Illuminate\Http\Request;

class ProfilDesaController extends Controller
{
    public function index()
    {
        // PERBAIKAN: Mengambil data profil yang paling baru dibuat/diupdate
        $profil = ProfilDesa::latest()->first();

        if (!$profil) {
            return response()->json([
                'status' => 'error',
                'message' => 'Data profil belum tersedia'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $profil
        ]);
    }
}