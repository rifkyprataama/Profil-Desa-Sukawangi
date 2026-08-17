<?php

namespace App\Filament\Resources\PengaturanBerandas\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\FileUpload;
use Filament\Schemas\Schema;

class PengaturanBerandaForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                // -- TEKS BANNER UTAMA --
                TextInput::make('judul_banner')
                    ->label('Judul Besar Banner')
                    ->required()
                    ->maxLength(255)
                    ->columnSpanFull(),
                    
                Textarea::make('subjudul_banner')
                    ->label('Teks Subjudul (Deskripsi Pendek)')
                    ->required()
                    ->rows(3)
                    ->columnSpanFull(),

                // -- DATA ANGKA APBDES --
                TextInput::make('tahun_anggaran')
                    ->label('Tahun Anggaran (Contoh: 2026)')
                    ->numeric()
                    ->maxLength(4)
                    ->placeholder('2026')
                    ->columnSpanFull(),

                TextInput::make('realisasi_pendapatan')
                    ->label('Realisasi Pendapatan (Contoh: Rp 3.33 M)')
                    ->required()
                    ->maxLength(255)
                    ->columnSpanFull(),
                    
                TextInput::make('persentase_dd')
                    ->label('Persentase Dana Desa (%)')
                    ->numeric()
                    ->required(),
                    
                TextInput::make('persentase_add')
                    ->label('Persentase ADD (%)')
                    ->numeric()
                    ->required(),
                    
                TextInput::make('persentase_pades')
                    ->label('Persentase PADes (%)')
                    ->numeric()
                    ->required(),

                // -- UPLOAD SEMUA BANNER (DIJAMIN AMAN) --
                FileUpload::make('gambar_banner')
                    ->label('Banner Halaman Beranda')
                    ->directory('banners')
                    ->image()
                    ->columnSpanFull(),
                    
                FileUpload::make('banner_profil')
                    ->label('Banner Halaman Profil')
                    ->directory('banners')
                    ->image()
                    ->columnSpanFull(),
                    
                FileUpload::make('banner_pemerintahan')
                    ->label('Banner Halaman Pemerintahan')
                    ->directory('banners')
                    ->image()
                    ->columnSpanFull(),
                    
                FileUpload::make('banner_pengaduan')
                    ->label('Banner Halaman Pengaduan')
                    ->directory('banners')
                    ->image()
                    ->columnSpanFull(),
                    
                FileUpload::make('banner_berita')
                    ->label('Banner Halaman Berita')
                    ->directory('banners')
                    ->image()
                    ->columnSpanFull(),
                    
                FileUpload::make('banner_galeri')
                    ->label('Banner Halaman Galeri')
                    ->directory('banners')
                    ->image()
                    ->columnSpanFull(),
                    
                FileUpload::make('banner_kontak')
                    ->label('Banner Halaman Kontak')
                    ->directory('banners')
                    ->image()
                    ->columnSpanFull(),
            ]);
    }
}