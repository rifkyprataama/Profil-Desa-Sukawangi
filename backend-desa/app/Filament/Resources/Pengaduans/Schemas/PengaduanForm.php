<?php

namespace App\Filament\Resources\Pengaduans\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class PengaduanForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('status')
                    ->label('Tindak Lanjut: Status Laporan')
                    ->options([
                        'Menunggu Verifikasi' => 'Menunggu Verifikasi',
                        'Sedang Diproses' => 'Sedang Diproses',
                        'Selesai' => 'Selesai',
                        'Ditolak' => 'Ditolak',
                    ])
                    ->required()
                    ->native(false),

                Toggle::make('is_anonim')
                    ->label('Dikirim sebagai Anonim')
                    ->disabled(),
                TextInput::make('nama')
                    ->label('Nama Pelapor')
                    ->disabled(),
                TextInput::make('nik')
                    ->label('NIK')
                    ->disabled(),
                TextInput::make('no_wa')
                    ->label('Nomor WhatsApp')
                    ->disabled(),
                TextInput::make('kategori')
                    ->label('Kategori Laporan')
                    ->disabled(),
                Textarea::make('pesan')
                    ->label('Isi Pesan/Laporan')
                    ->rows(5)
                    ->disabled()
                    ->columnSpanFull(),
                FileUpload::make('lampiran')
                    ->label('Lampiran Bukti')
                    ->disk('public')
                    ->directory('pengaduan')
                    ->disabled()
                    ->columnSpanFull(),
            ]);
    }
}