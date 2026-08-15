<?php

namespace App\Filament\Resources\PengaturanBerandas\Pages;

use App\Filament\Resources\PengaturanBerandas\PengaturanBerandaResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListPengaturanBerandas extends ListRecords
{
    protected static string $resource = PengaturanBerandaResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
