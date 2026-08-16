<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Galeri;

class GaleriController extends Controller
{
    public function index()
    {
        $galeri = Galeri::latest()->get();

        return response()->json([
            'success' => true,
            'data'    => $galeri
        ], 200);
    }
}