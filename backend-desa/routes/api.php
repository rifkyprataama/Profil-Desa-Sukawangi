<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Import Controller
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BeritaController;
use App\Http\Controllers\Api\ProfilDesaController;
use App\Http\Controllers\Api\AparaturDesaController;
use App\Http\Controllers\Api\PengaduanController;
use App\Http\Controllers\Api\GaleriController;
use App\Http\Controllers\PengaturanBerandaController; 
use App\Http\Controllers\Api\KontakController;
use App\Models\Faq; // <-- IMPORT MODEL FAQ

// =================================================================
// 1. WILAYAH PUBLIK (Bisa diakses siapa saja tanpa login)
// =================================================================
Route::post('/login', [AuthController::class, 'login']);

Route::apiResource('berita', BeritaController::class)->only(['index', 'show']);
Route::apiResource('aparatur', AparaturDesaController::class)->only(['index', 'show']);
Route::apiResource('galeri', GaleriController::class)->only(['index', 'show']);

Route::get('/profil-desa', [ProfilDesaController::class, 'index']);
Route::get('/pengaturan-beranda', [PengaturanBerandaController::class, 'index']);
Route::get('/kontak', [KontakController::class, 'index']);

// <-- API ROUTE UNTUK FAQ -->
Route::get('/faq', function () {
    return response()->json([
        'success' => true,
        'data' => Faq::latest()->get()
    ]);
});

Route::apiResource('pengaduan', PengaduanController::class)->only(['index', 'show', 'store']);


// =================================================================
// 2. WILAYAH ADMIN (Terproteksi, wajib menggunakan Token Login)
// =================================================================
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::apiResource('berita', BeritaController::class)->except(['index', 'show']);
    Route::apiResource('aparatur', AparaturDesaController::class)->except(['index', 'show']);
    Route::apiResource('galeri', GaleriController::class)->except(['index', 'show']);
    Route::apiResource('pengaduan', PengaduanController::class)->except(['index', 'show', 'store']);
});