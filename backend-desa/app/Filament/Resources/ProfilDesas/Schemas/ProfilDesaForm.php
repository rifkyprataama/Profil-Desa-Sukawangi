<?php

namespace App\Filament\Resources\ProfilDesas\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\FileUpload;
use Filament\Schemas\Schema;

class ProfilDesaForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                // --- 1. IDENTITAS UTAMA & PIMPINAN ---
                TextInput::make('nama_desa')
                    ->label('Nama Desa')
                    ->default('Sukawangi')
                    ->required(),
                TextInput::make('nama_kepala_desa')
                    ->label('Nama Kepala Desa')
                    ->required(),
                FileUpload::make('foto_kepala_desa')
                    ->label('Foto Kepala Desa')
                    ->image()
                    ->directory('profil-desa')
                    ->columnSpanFull(),
                TextInput::make('email')
                    ->label('Email Resmi Desa')
                    ->email(),
                TextInput::make('no_telepon')
                    ->label('Nomor Telepon/WA Desa')
                    ->tel(),

                // --- 2. SEJARAH, VISI & MISI ---
                RichEditor::make('sejarah')
                    ->label('Sejarah & Geografis Desa')
                    ->columnSpanFull(),
                Textarea::make('visi')
                    ->label('Visi Desa')
                    ->rows(2)
                    ->columnSpanFull(),
                RichEditor::make('misi')
                    ->label('Misi Desa')
                    ->columnSpanFull(),
                Textarea::make('sambutan')
                    ->label('Sambutan Kepala Desa')
                    ->rows(3)
                    ->columnSpanFull(),

                // --- 3. DATA GEOGRAFIS & BATAS WILAYAH ---
                TextInput::make('luas_wilayah')
                    ->label('Total Luas Wilayah (Hektar)')
                    ->numeric(),
                TextInput::make('luas_dihuni')
                    ->label('Total Luas Dihuni (Hektar)')
                    ->numeric(),
                TextInput::make('batas_utara')
                    ->label('Batas Utara (Misal: Desa Babakan)'),
                TextInput::make('batas_selatan')
                    ->label('Batas Selatan'),
                TextInput::make('batas_timur')
                    ->label('Batas Timur'),
                TextInput::make('batas_barat')
                    ->label('Batas Barat'),
                Textarea::make('link_peta')
                    ->label('Link Peta Google Maps')
                    ->helperText('Masukkan link embed (src) dari Google Maps untuk lokasi desa.')
                    ->columnSpanFull(),

                // --- 4. DATA DEMOGRAFI PENDUDUK ---
                TextInput::make('total_penduduk')
                    ->label('Total Jiwa')
                    ->numeric(),
                TextInput::make('penduduk_laki_laki')
                    ->label('Jumlah Laki-laki')
                    ->numeric(),
                TextInput::make('penduduk_perempuan')
                    ->label('Jumlah Perempuan')
                    ->numeric(),
                TextInput::make('jumlah_dusun')
                    ->label('Jumlah Dusun')
                    ->numeric(),
                TextInput::make('jumlah_rw')
                    ->label('Jumlah RW')
                    ->numeric(),

                // --- 5. INFRASTRUKTUR & FASILITAS ---
                TextInput::make('jumlah_sekolah')
                    ->label('Gedung Sekolah')
                    ->numeric(),
                TextInput::make('jumlah_puskesmas')
                    ->label('Puskesmas / Pustu')
                    ->numeric(),
                TextInput::make('jumlah_masjid')
                    ->label('Masjid / Mushola')
                    ->numeric(),
                TextInput::make('jumlah_fasum')
                    ->label('Fasilitas Umum')
                    ->numeric(),
            ]);
    }
}