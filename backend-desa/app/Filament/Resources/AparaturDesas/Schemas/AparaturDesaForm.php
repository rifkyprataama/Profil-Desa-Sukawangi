<?php

namespace App\Filament\Resources\AparaturDesas\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class AparaturDesaForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('nama_lengkap')
                    ->required(),
                TextInput::make('jabatan')
                    ->required(),
                TextInput::make('periode_jabatan'),
                TextInput::make('foto'),
            ]);
    }
}
