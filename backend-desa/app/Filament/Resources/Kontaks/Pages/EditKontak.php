<?php

namespace App\Filament\Resources\Kontaks\Pages;

use App\Filament\Resources\Kontaks\KontakResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditKontak extends EditRecord
{
    protected static string $resource = KontakResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }

    // Tambahkan perintah ini agar redirect ke halaman awal (index)
    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }
}