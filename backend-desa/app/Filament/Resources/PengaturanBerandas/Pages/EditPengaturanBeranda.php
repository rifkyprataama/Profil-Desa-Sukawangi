<?php

namespace App\Filament\Resources\PengaturanBerandas\Pages;

use App\Filament\Resources\PengaturanBerandas\PengaturanBerandaResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditPengaturanBeranda extends EditRecord
{
    protected static string $resource = PengaturanBerandaResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }
}