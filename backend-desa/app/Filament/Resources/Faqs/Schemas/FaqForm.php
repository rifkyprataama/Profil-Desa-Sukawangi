<?php

namespace App\Filament\Resources\Faqs\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class FaqForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('pertanyaan')
                    ->label('Pertanyaan (Q)')
                    ->required()
                    ->maxLength(255)
                    ->columnSpanFull(),
                    
                Textarea::make('jawaban')
                    ->label('Jawaban (A)')
                    ->required()
                    ->rows(4)
                    ->columnSpanFull(),
            ]);
    }
}