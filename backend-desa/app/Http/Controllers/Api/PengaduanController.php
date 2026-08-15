<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Pengaduan;
use Illuminate\Http\Request;

class PengaduanController extends Controller
{
    // Fungsi untuk mengambil semua data (jika diperlukan nanti)
    public function index()
    {
        $pengaduan = Pengaduan::latest()->get();
        return response()->json([
            'success' => true,
            'data' => $pengaduan
        ]);
    }

    // FUNGSI INTI UNTUK MENERIMA DATA DARI REACT
    public function store(Request $request)
    {
        // 1. Aturan Validasi (Harus sama persis dengan yang dikirim React)
        $validated = $request->validate([
            'nama' => 'nullable|string|max:255',
            'nik' => 'nullable|string|max:16',
            'no_wa' => 'required|string|max:20',
            'kategori' => 'required|string|max:255',
            'pesan' => 'required|string',
            'is_anonim' => 'required|boolean',
            'lampiran' => 'nullable|file|max:5120',
        ]);

        // 2. Modifikasi Data jika Anonim
        if ($validated['is_anonim']) {
            $validated['nama'] = 'Anonim (Rahasia)';
            $validated['nik'] = '-';
        }

        // 3. Proses File Gambar/Dokumen (Jika ada)
        if ($request->hasFile('lampiran')) {
            $validated['lampiran'] = $request->file('lampiran')->store('pengaduan', 'public');
        }

        // 4. Set Status Awal
        $validated['status'] = 'Menunggu Verifikasi';

        // 5. Simpan ke Database
        Pengaduan::create($validated);

        // 6. Kirim Jawaban ke React bahwa berhasil
        return response()->json([
            'status' => 'success',
            'message' => 'Laporan berhasil dikirim'
        ]);
    }

    public function show($id)
    {
        $pengaduan = Pengaduan::find($id);
        if ($pengaduan) {
            return response()->json([
                'success' => true,
                'data' => $pengaduan
            ]);
        }
        return response()->json([
            'success' => false,
            'message' => 'Data tidak ditemukan'
        ], 404);
    }
}