<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Berita;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage; // Wajib ditambahkan untuk kelola file

class BeritaController extends Controller
{
    public function index()
    {
        $berita = Berita::latest()->get();
        return response()->json(['success' => true, 'data' => $berita], 200);
    }

    public function store(Request $request)
    {
        $data = $request->all();

        // Cek apakah ada file gambar yang diupload
        if ($request->hasFile('thumbnail')) {
            // Simpan gambar ke folder storage/app/public/berita
            $path = $request->file('thumbnail')->store('berita', 'public');
            $data['thumbnail'] = $path; // Simpan nama jalurnya ke database
        }

        $berita = Berita::create($data);
        return response()->json(['success' => true, 'message' => 'Berita ditambahkan', 'data' => $berita], 201);
    }

    public function show($id)
    {
        $berita = Berita::find($id);
        return response()->json(['success' => true, 'data' => $berita], 200);
    }

    public function update(Request $request, $id)
    {
        $berita = Berita::find($id);
        $data = $request->all();

        if ($request->hasFile('thumbnail')) {
            // Hapus gambar lama jika ada
            if ($berita->thumbnail) {
                Storage::disk('public')->delete($berita->thumbnail);
            }
            // Simpan gambar baru
            $path = $request->file('thumbnail')->store('berita', 'public');
            $data['thumbnail'] = $path;
        }

        $berita->update($data);
        return response()->json(['success' => true, 'message' => 'Berita diperbarui', 'data' => $berita], 200);
    }

    public function destroy($id)
    {
        $berita = Berita::find($id);
        
        // Hapus gambar fisik dari server sebelum menghapus data di database
        if ($berita->thumbnail) {
            Storage::disk('public')->delete($berita->thumbnail);
        }
        
        $berita->delete();
        return response()->json(['success' => true, 'message' => 'Berita dihapus'], 200);
    }
}