<?php

namespace App\Filament\Resources\ProfilDesas\Schemas;

use Filament\Forms;
use Filament\Schemas\Schema;

class ProfilDesaForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Forms\Components\TextInput::make('nama_kepala_desa')
                    ->required()
                    ->maxLength(255)
                    ->columnSpanFull(),

                Forms\Components\FileUpload::make('foto_kepala_desa')
                    ->image()
                    ->directory('profil-desa')
                    ->columnSpanFull(),

                Forms\Components\Textarea::make('sambutan')
                    ->required()
                    ->rows(4)
                    ->columnSpanFull(),

                Forms\Components\Textarea::make('visi')
                    ->required()
                    ->rows(3)
                    ->columnSpanFull(),

                Forms\Components\RichEditor::make('misi')
                    ->required()
                    ->columnSpanFull(),
            ]);
    }
}