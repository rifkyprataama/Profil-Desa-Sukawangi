<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Admin Desa Sukawangi',
            'email' => 'admin@sukawangi.desa.id',
            'password' => Hash::make('admin123') // Password disandikan (enkripsi)
        ]);
    }
}