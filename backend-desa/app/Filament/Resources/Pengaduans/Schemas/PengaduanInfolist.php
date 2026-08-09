<?php

namespace App\Filament\Resources\Pengaduans\Schemas;

use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class PengaduanInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('nama_pelapor'),
                TextEntry::make('nik')
                    ->placeholder('-'),
                TextEntry::make('judul_laporan'),
                TextEntry::make('isi_laporan')
                    ->columnSpanFull(),
                TextEntry::make('foto_bukti')
                    ->placeholder('-'),
                TextEntry::make('status')
                    ->badge(),
                TextEntry::make('created_at')
                    ->dateTime()
                    ->placeholder('-'),
                TextEntry::make('updated_at')
                    ->dateTime()
                    ->placeholder('-'),
            ]);
    }
}
