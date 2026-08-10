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


// =================================================================
// 1. WILAYAH PUBLIK (Bisa diakses siapa saja tanpa login)
// =================================================================
Route::post('/login', [AuthController::class, 'login']);

// Warga hanya bisa MELIHAT data (index & show)
Route::apiResource('berita', BeritaController::class)->only(['index', 'show']);
Route::apiResource('aparatur', AparaturDesaController::class)->only(['index', 'show']);
Route::apiResource('galeri', GaleriController::class)->only(['index', 'show']);

// Khusus Profil Desa, karena hanya 1 baris data, kita cukup gunakan rute GET tunggal
Route::get('/profil-desa', [ProfilDesaController::class, 'index']);

// Khusus pengaduan, warga bisa MELIHAT dan MENGIRIM aduan (store)
Route::apiResource('pengaduan', PengaduanController::class)->only(['index', 'show', 'store']);


// =================================================================
// 2. WILAYAH ADMIN (Terproteksi, wajib menggunakan Token Login)
// =================================================================
Route::middleware('auth:sanctum')->group(function () {
    
    // Rute untuk keluar (logout)
    Route::post('/logout', [AuthController::class, 'logout']);

    // Catatan: Anda tidak perlu menaruh profil-desa di sini karena 
    // proses Edit/Update sudah ditangani langsung oleh Dashboard Filament.
    
    // Admin bisa MENAMBAH, MENGUBAH, dan MENGHAPUS data
    Route::apiResource('berita', BeritaController::class)->except(['index', 'show']);
    Route::apiResource('aparatur', AparaturDesaController::class)->except(['index', 'show']);
    Route::apiResource('galeri', GaleriController::class)->except(['index', 'show']);
    
    // Admin bisa merubah status dan menghapus pengaduan
    Route::apiResource('pengaduan', PengaduanController::class)->except(['index', 'show', 'store']);
});