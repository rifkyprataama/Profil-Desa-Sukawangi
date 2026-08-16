<?php

namespace App\Filament\Resources\AparaturDesas\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\FileUpload;
use Filament\Schemas\Schema;

class AparaturDesaForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('nama_lengkap')
                    ->label('Nama Lengkap (Beserta Gelar)')
                    ->placeholder('Misal: Budi Santoso, S.IP')
                    ->required()
                    ->maxLength(255),
                    
                TextInput::make('jabatan')
                    ->label('Jabatan Pemerintahan')
                    ->required()
                    ->helperText('PENTING: Wajib gunakan kata kunci ini agar masuk ke susunan website: Sekdes, Kaur, Kasi, Dusun, Kadus, BPD, PKK, Karang Taruna, LPM, RT, atau RW.')
                    ->placeholder('Misal: Kaur Keuangan / Kasi Pemerintahan / Kepala Dusun 1')
                    ->maxLength(255),
                    
                TextInput::make('periode_jabatan')
                    ->label('Periode Jabatan (Opsional)')
                    ->placeholder('Misal: 2022 - 2028')
                    ->maxLength(255),
                    
                FileUpload::make('foto')
                    ->label('Foto Aparatur (Opsional)')
                    ->helperText('Sistem otomatis membuatkan foto inisial jika dikosongkan. Gunakan foto rasio 1:1 (persegi) untuk hasil terbaik.')
                    ->image()
                    ->directory('aparatur')
                    ->disk('public') // Menyimpan di folder public/storage agar bisa dibaca React
                    ->columnSpanFull(),
            ]);
    }
}