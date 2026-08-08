<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ProfilDesa;

class ProfilDesaSeeder extends Seeder
{
    public function run(): void
    {
        ProfilDesa::create([
            'nama_desa' => 'Desa Sukawangi',
            'sejarah' => 'Mewujudkan tata kelola desa mandiri, transparan, dan berbasis digital untuk pelayanan masyarakat yang sejahtera, guyub, dan berkelanjutan.',
            'visi' => 'Menjadi desa mandiri dan digital.',
            'misi' => 'Meningkatkan kesejahteraan dan pelayanan masyarakat.',
            'total_penduduk' => 7520,
            'luas_wilayah' => '1250 Ha',
            'jumlah_dusun' => 3,
            'alamat' => 'Kecamatan Warungkondang, Kabupaten Cianjur',
            'no_telepon' => '0812-3456-7890',
            'email' => 'admin@sukawangi.desa.id'
        ]);
    }
}