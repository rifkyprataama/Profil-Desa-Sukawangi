<?php

namespace App\Filament\Resources\Beritas\Schemas;

use Filament\Forms;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class BeritaForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Forms\Components\TextInput::make('judul')
                    ->required()
                    ->maxLength(255)
                    ->live(onBlur: true)
                    ->afterStateUpdated(fn ($operation, $state, $set) => 
                        $operation === 'create' ? $set('slug', Str::slug($state)) : null
                    )
                    ->columnSpanFull(),

                Forms\Components\Hidden::make('slug')
                    ->required(),

                Forms\Components\RichEditor::make('isi_berita')
                    ->required()
                    ->columnSpanFull(),

                Forms\Components\FileUpload::make('gambar')
                    ->image()
                    ->directory('berita')
                    ->columnSpanFull(),
            ]);
    }
}