<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PengaturanBeranda;

class PengaturanBerandaController extends Controller
{
    public function index()
    {
        // Mengambil data pengaturan yang pertama (karena hanya ada 1 data)
        $pengaturan = PengaturanBeranda::first();

        // Jika data kosong, kirim nilai default agar Frontend tidak error
        if (!$pengaturan) {
            $pengaturan = [
                'judul_banner' => 'Website Resmi Desa',
                'subjudul_banner' => 'Pusat Informasi Pelayanan Masyarakat.',
                'realisasi_pendapatan' => 'Rp 0',
                'persentase_dd' => 0,
                'persentase_add' => 0,
                'persentase_pades' => 0,
            ];
        }

        return response()->json([
            'status' => 'success',
            'data' => $pengaturan
        ], 200);
    }
}