<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Pengaduan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PengaduanController extends Controller
{
    public function index()
    {
        $pengaduan = Pengaduan::latest()->get();
        return response()->json(['success' => true, 'data' => $pengaduan], 200);
    }

    public function store(Request $request)
    {
        $data = $request->all();

        if ($request->hasFile('foto_bukti')) {
            $path = $request->file('foto_bukti')->store('pengaduan', 'public');
            $data['foto_bukti'] = $path;
        }

        $pengaduan = Pengaduan::create($data);
        return response()->json(['success' => true, 'message' => 'Pengaduan dikirim', 'data' => $pengaduan], 201);
    }

    public function show($id)
    {
        $pengaduan = Pengaduan::find($id);
        return response()->json(['success' => true, 'data' => $pengaduan], 200);
    }

    public function update(Request $request, $id)
    {
        $pengaduan = Pengaduan::find($id);
        $data = $request->all();

        if ($request->hasFile('foto_bukti')) {
            if ($pengaduan->foto_bukti) {
                Storage::disk('public')->delete($pengaduan->foto_bukti);
            }
            $path = $request->file('foto_bukti')->store('pengaduan', 'public');
            $data['foto_bukti'] = $path;
        }

        $pengaduan->update($data);
        return response()->json(['success' => true, 'message' => 'Status diperbarui', 'data' => $pengaduan], 200);
    }

    public function destroy($id)
    {
        $pengaduan = Pengaduan::find($id);
        
        if ($pengaduan->foto_bukti) {
            Storage::disk('public')->delete($pengaduan->foto_bukti);
        }
        
        $pengaduan->delete();
        return response()->json(['success' => true, 'message' => 'Pengaduan dihapus'], 200);
    }
}