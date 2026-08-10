<?php

namespace App\Filament\Resources\ProfilDesas\Pages;

use App\Filament\Resources\ProfilDesas\ProfilDesaResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListProfilDesas extends ListRecords
{
    protected static string $resource = ProfilDesaResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
