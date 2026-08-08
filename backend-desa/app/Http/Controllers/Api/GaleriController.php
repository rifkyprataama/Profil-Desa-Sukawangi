<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Galeri;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class GaleriController extends Controller
{
    public function index()
    {
        $galeri = Galeri::latest()->get();
        return response()->json(['success' => true, 'data' => $galeri], 200);
    }

    public function store(Request $request)
    {
        $data = $request->all();

        if ($request->hasFile('file_gambar')) {
            $path = $request->file('file_gambar')->store('galeri', 'public');
            $data['file_gambar'] = $path;
        }

        $galeri = Galeri::create($data);
        return response()->json(['success' => true, 'message' => 'Foto ditambahkan', 'data' => $galeri], 201);
    }

    public function show($id)
    {
        $galeri = Galeri::find($id);
        return response()->json(['success' => true, 'data' => $galeri], 200);
    }

    public function update(Request $request, $id)
    {
        $galeri = Galeri::find($id);
        $data = $request->all();

        if ($request->hasFile('file_gambar')) {
            if ($galeri->file_gambar) {
                Storage::disk('public')->delete($galeri->file_gambar);
            }
            $path = $request->file('file_gambar')->store('galeri', 'public');
            $data['file_gambar'] = $path;
        }

        $galeri->update($data);
        return response()->json(['success' => true, 'message' => 'Foto diperbarui', 'data' => $galeri], 200);
    }

    public function destroy($id)
    {
        $galeri = Galeri::find($id);
        
        if ($galeri->file_gambar) {
            Storage::disk('public')->delete($galeri->file_gambar);
        }
        
        $galeri->delete();
        return response()->json(['success' => true, 'message' => 'Foto dihapus'], 200);
    }
}