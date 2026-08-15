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
                    ->label('Nama Lengkap (beserta gelar)')
                    ->required()
                    ->maxLength(255),
                TextInput::make('jabatan')
                    ->label('Jabatan (Contoh: Sekretaris Desa, Kaur Keuangan, Ketua BPD)')
                    ->required()
                    ->maxLength(255),
                TextInput::make('periode_jabatan')
                    ->label('Periode Jabatan (Opsional, misal: 2022 - 2028)')
                    ->maxLength(255),
                FileUpload::make('foto')
                    ->label('Foto Aparatur')
                    ->image()
                    ->directory('aparatur')
                    ->disk('public') // <--- TAMBAHKAN BARIS INI
                    ->columnSpanFull(),
            ]);
    }
}