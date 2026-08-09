<?php

namespace App\Filament\Resources\Pengaduans\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class PengaduanForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('nama_pelapor')
                    ->required(),
                TextInput::make('nik'),
                TextInput::make('judul_laporan')
                    ->required(),
                Textarea::make('isi_laporan')
                    ->required()
                    ->columnSpanFull(),
                TextInput::make('foto_bukti'),
                Select::make('status')
                    ->options(['menunggu' => 'Menunggu', 'diproses' => 'Diproses', 'selesai' => 'Selesai'])
                    ->default('menunggu')
                    ->required(),
            ]);
    }
}
