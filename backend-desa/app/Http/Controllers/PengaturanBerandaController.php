<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PengaturanBeranda;

class PengaturanBerandaController extends Controller
{
    public function index()
    {
        // Selalu ambil pengaturan terbaru
        $beranda = PengaturanBeranda::latest()->first();

        if (!$beranda) {
            return response()->json(['status' => 'error', 'message' => 'Data belum tersedia'], 404);
        }

        return response()->json(['status' => 'success', 'data' => $beranda]);
    }
}