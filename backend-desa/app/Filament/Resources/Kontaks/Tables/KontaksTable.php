<?php

namespace App\Filament\Resources\Kontaks\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class KontaksTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('telepon')
                    ->label('Telepon / WA')
                    ->searchable()
                    ->weight('bold'),
                    
                TextColumn::make('email')
                    ->label('Email')
                    ->searchable(),
                    
                TextColumn::make('jam_operasional')
                    ->label('Jam Operasional')
                    ->searchable(),
                    
                TextColumn::make('updated_at')
                    ->label('Terakhir Diperbarui')
                    ->dateTime('d M Y')
                    ->sortable(),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                EditAction::make()->label('Ubah Data'),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}