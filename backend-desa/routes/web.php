<?php

use Illuminate\Support\Facades\Route;
use App\Models\ProfilDesa;
use Barryvdh\DomPDF\Facade\Pdf;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/admin/profil-desa/cetak', function () {
    // Mengambil data profil desa pertama
    $profil = ProfilDesa::first();

    if (!$profil) {
        return "Data profil desa belum diisi. Silakan isi data di panel admin terlebih dahulu.";
    }

    // Mengubah data ke format PDF menggunakan view 'cetak-profil'
    $pdf = Pdf::loadView('cetak-profil', ['profil' => $profil]);
    
    // Menampilkan PDF langsung di browser (bisa diunduh dari sana)
    return $pdf->stream('Profil_Desa_Sukawangi.pdf');
})->name('cetak.profil');