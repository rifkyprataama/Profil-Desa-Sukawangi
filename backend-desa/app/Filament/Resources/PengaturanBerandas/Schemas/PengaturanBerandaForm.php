<?php

namespace App\Filament\Resources\PengaturanBerandas\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Section;
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

                // -- KOTAK KHUSUS SEMUA BANNER --
                Section::make('Pengaturan Gambar Banner Website')
                    ->description('Ubah gambar latar belakang (banner) untuk masing-masing halaman di website. Kosongkan jika ingin menggunakan gambar bawaan sistem.')
                    ->collapsed() // Bikin bisa di-minimize agar rapi
                    ->schema([
                        FileUpload::make('gambar_banner')
                            ->label('Banner Halaman Beranda')
                            ->directory('banners')->image(),
                            
                        FileUpload::make('banner_profil')
                            ->label('Banner Halaman Profil')
                            ->directory('banners')->image(),
                            
                        FileUpload::make('banner_pemerintahan')
                            ->label('Banner Halaman Pemerintahan')
                            ->directory('banners')->image(),
                            
                        FileUpload::make('banner_pengaduan')
                            ->label('Banner Halaman Pengaduan')
                            ->directory('banners')->image(),
                            
                        FileUpload::make('banner_berita')
                            ->label('Banner Halaman Berita')
                            ->directory('banners')->image(),
                            
                        FileUpload::make('banner_galeri')
                            ->label('Banner Halaman Galeri')
                            ->directory('banners')->image(),
                            
                        FileUpload::make('banner_kontak')
                            ->label('Banner Halaman Kontak')
                            ->directory('banners')->image(),
                    ])->columns(2),
            ]);
    }
}