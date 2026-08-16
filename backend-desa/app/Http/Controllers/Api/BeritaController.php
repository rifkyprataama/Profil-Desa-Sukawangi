<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Berita;
use Illuminate\Http\Request;

class BeritaController extends Controller
{
    public function index()
    {
        // Mengambil semua berita dari yang terbaru
        $berita = Berita::latest()->get();

        return response()->json([
            'success' => true,
            'message' => 'Daftar Berita berhasil diambil',
            'data'    => $berita
        ], 200);
    }
    
    // Fitur tambahan jika nanti React ingin mengambil 1 berita berdasarkan slug
    public function show($identifier)
    {
        // Mencari berita berdasarkan slug atau ID
        $berita = Berita::where('slug', $identifier)->orWhere('id', $identifier)->first();
        
        if (!$berita) {
            return response()->json(['success' => false, 'message' => 'Berita tidak ditemukan'], 404);
        }

        return response()->json(['success' => true, 'data' => $berita], 200);
    }
}