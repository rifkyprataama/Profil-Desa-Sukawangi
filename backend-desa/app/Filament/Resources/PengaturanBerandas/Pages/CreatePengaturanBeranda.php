<?php

namespace App\Filament\Resources\PengaturanBerandas\Pages;

use App\Filament\Resources\PengaturanBerandas\PengaturanBerandaResource;
use Filament\Resources\Pages\CreateRecord;

class CreatePengaturanBeranda extends CreateRecord
{
    protected static string $resource = PengaturanBerandaResource::class;

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }
}