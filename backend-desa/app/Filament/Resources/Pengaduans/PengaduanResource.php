<?php

namespace App\Filament\Resources\Pengaduans;

use App\Filament\Resources\Pengaduans\Pages\CreatePengaduan;
use App\Filament\Resources\Pengaduans\Pages\EditPengaduan;
use App\Filament\Resources\Pengaduans\Pages\ListPengaduans;
use App\Filament\Resources\Pengaduans\Pages\ViewPengaduan;
use App\Filament\Resources\Pengaduans\Schemas\PengaduanForm;
use App\Filament\Resources\Pengaduans\Schemas\PengaduanInfolist;
use App\Filament\Resources\Pengaduans\Tables\PengaduansTable;
use App\Models\Pengaduan;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class PengaduanResource extends Resource
{
    protected static ?string $model = Pengaduan::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $recordTitleAttribute = 'judul_laporan';

    public static function form(Schema $schema): Schema
    {
        return PengaduanForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return PengaduanInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return PengaduansTable::configure($table);
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
            'index' => ListPengaduans::route('/'),
            'create' => CreatePengaduan::route('/create'),
            'view' => ViewPengaduan::route('/{record}'),
            'edit' => EditPengaduan::route('/{record}/edit'),
        ];
    }
}
