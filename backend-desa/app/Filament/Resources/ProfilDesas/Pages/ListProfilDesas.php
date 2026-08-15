<?php

namespace App\Filament\Resources\ProfilDesas\Pages;

use App\Filament\Resources\ProfilDesas\ProfilDesaResource;
use Filament\Actions\CreateAction;
use Filament\Actions\Action; // Baris ini ditambahkan untuk fitur tombol
use Filament\Resources\Pages\ListRecords;

class ListProfilDesas extends ListRecords
{
    protected static string $resource = ProfilDesaResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
            
            // Kode Tombol Cetak PDF Tambahan
            Action::make('cetak_pdf')
                ->label('Cetak PDF Profil')
                ->icon('heroicon-o-printer')
                ->color('success')
                ->url(fn () => route('cetak.profil'))
                ->openUrlInNewTab(),
        ];
    }
}