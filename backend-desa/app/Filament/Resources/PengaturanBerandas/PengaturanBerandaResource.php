<?php

namespace App\Filament\Resources\PengaturanBerandas;

use App\Filament\Resources\PengaturanBerandas\Pages\CreatePengaturanBeranda;
use App\Filament\Resources\PengaturanBerandas\Pages\EditPengaturanBeranda;
use App\Filament\Resources\PengaturanBerandas\Pages\ListPengaturanBerandas;
use App\Filament\Resources\PengaturanBerandas\Schemas\PengaturanBerandaForm;
use App\Filament\Resources\PengaturanBerandas\Tables\PengaturanBerandasTable;
use App\Models\PengaturanBeranda;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class PengaturanBerandaResource extends Resource
{
    protected static ?string $model = PengaturanBeranda::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    public static function form(Schema $schema): Schema
    {
        return PengaturanBerandaForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return PengaturanBerandasTable::configure($table);
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
            'index' => ListPengaturanBerandas::route('/'),
            'create' => CreatePengaturanBeranda::route('/create'),
            'edit' => EditPengaturanBeranda::route('/{record}/edit'),
        ];
    }
}
