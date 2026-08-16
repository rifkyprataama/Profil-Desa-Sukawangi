<?php

namespace App\Filament\Resources\ProfilDesas;

use App\Filament\Resources\ProfilDesas\Pages\CreateProfilDesa;
use App\Filament\Resources\ProfilDesas\Pages\EditProfilDesa;
use App\Filament\Resources\ProfilDesas\Pages\ListProfilDesas;
use App\Filament\Resources\ProfilDesas\Schemas\ProfilDesaForm;
use App\Filament\Resources\ProfilDesas\Tables\ProfilDesasTable;
use App\Models\ProfilDesa;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class ProfilDesaResource extends Resource
{
    protected static ?string $model = ProfilDesa::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedBuildingOffice;

    protected static ?string $recordTitleAttribute = 'nama_kepala_desa';

    public static function form(Schema $schema): Schema
    {
        return ProfilDesaForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return ProfilDesasTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListProfilDesas::route('/'),
            'create' => CreateProfilDesa::route('/create'),
            'edit' => EditProfilDesa::route('/{record}/edit'),
        ];
    }
}
