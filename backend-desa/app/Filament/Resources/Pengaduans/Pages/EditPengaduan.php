<?php

namespace App\Filament\Resources\Pengaduans\Pages;

// PERBAIKAN: Menambahkan "Pengaduans\" pada jalur import
use App\Filament\Resources\Pengaduans\PengaduanResource; 
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditPengaduan extends EditRecord
{
    protected static string $resource = PengaduanResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
            Actions\ViewAction::make(), // Menambahkan tombol Lihat di pojok kanan atas
        ];
    }

    // Fungsi untuk mengembalikan admin ke tabel utama setelah menyimpan
    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index'); 
    }
}