<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Kontak;

class KontakController extends Controller
{
    public function index()
    {
        // Mengambil data pertama (karena informasi kontak desa biasanya cuma 1)
        $kontak = Kontak::first();

        return response()->json([
            'success' => true,
            'data'    => $kontak
        ], 200);
    }
}