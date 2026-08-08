<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ProfilDesa;
use Illuminate\Http\Request;

class ProfilDesaController extends Controller
{
    /**
     * Menampilkan data profil desa
     */
    public function index()
    {
        // Mengambil data pertama dari tabel profil desa (karena datanya biasanya tunggal)
        $profil = ProfilDesa::first();

        return response()->json([
            'success' => true,
            'message' => 'Data Profil Desa',
            'data'    => $profil
        ], 200);
    }

    /**
     * Mengubah data profil desa
     */
    public function update(Request $request, $id)
    {
        $profil = ProfilDesa::find($id);

        if (!$profil) {
            return response()->json([
                'success' => false,
                'message' => 'Data Profil Desa tidak ditemukan',
            ], 404);
        }

        $profil->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Data Profil Desa berhasil diperbarui',
            'data'    => $profil
        ], 200);
    }
}