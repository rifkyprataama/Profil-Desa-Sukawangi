<?php

namespace App\Filament\Resources\Faqs\Tables;

// 1. Import Kolom Tabel
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

// 2. Import Tombol (Sesuai dengan format asli bawaan sistem Anda)
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\DeleteAction; // <-- Tambahan untuk tombol hapus

class FaqsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('pertanyaan')
                    ->label('Pertanyaan')
                    ->searchable()
                    ->sortable(),
                    
                TextColumn::make('jawaban')
                    ->label('Jawaban')
                    ->limit(50)
                    ->searchable(),
            ])
            ->filters([
                //
            ])
            // Menggunakan recordActions sesuai bawaan sistem Anda
            ->recordActions([
                EditAction::make(),
                DeleteAction::make(),
            ])
            // Menggunakan toolbarActions sesuai bawaan sistem Anda
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}