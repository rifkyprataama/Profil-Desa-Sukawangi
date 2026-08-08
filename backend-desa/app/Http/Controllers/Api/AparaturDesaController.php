<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AparaturDesa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AparaturDesaController extends Controller
{
    public function index()
    {
        $aparatur = AparaturDesa::all();
        return response()->json(['success' => true, 'data' => $aparatur], 200);
    }

    public function store(Request $request)
    {
        $data = $request->all();

        if ($request->hasFile('foto')) {
            $path = $request->file('foto')->store('aparatur', 'public');
            $data['foto'] = $path;
        }

        $aparatur = AparaturDesa::create($data);
        return response()->json(['success' => true, 'message' => 'Data ditambahkan', 'data' => $aparatur], 201);
    }

    public function show($id)
    {
        $aparatur = AparaturDesa::find($id);
        return response()->json(['success' => true, 'data' => $aparatur], 200);
    }

    public function update(Request $request, $id)
    {
        $aparatur = AparaturDesa::find($id);
        $data = $request->all();

        if ($request->hasFile('foto')) {
            if ($aparatur->foto) {
                Storage::disk('public')->delete($aparatur->foto);
            }
            $path = $request->file('foto')->store('aparatur', 'public');
            $data['foto'] = $path;
        }

        $aparatur->update($data);
        return response()->json(['success' => true, 'message' => 'Data diperbarui', 'data' => $aparatur], 200);
    }

    public function destroy($id)
    {
        $aparatur = AparaturDesa::find($id);
        
        if ($aparatur->foto) {
            Storage::disk('public')->delete($aparatur->foto);
        }
        
        $aparatur->delete();
        return response()->json(['success' => true, 'message' => 'Data dihapus'], 200);
    }
}