<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $user = Auth::user();
            // Membuat token akses untuk frontend React
            $token = $user->createToken('admin-token')->plainTextToken;

            return response()->json([
                'success' => true,
                'message' => 'Login berhasil',
                'data' => $user,
                'token' => $token
            ], 200);
        }

        return response()->json([
            'success' => false,
            'message' => 'Email atau Password salah'
        ], 401);
    }

    public function logout(Request $request)
    {
        // Menghapus kunci token saat admin keluar (logout)
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'success' => true,
            'message' => 'Logout berhasil'
        ], 200);
    }
}