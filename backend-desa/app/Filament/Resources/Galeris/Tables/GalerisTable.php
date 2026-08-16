<?php

namespace App\Filament\Resources\Galeris\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Table;

class GalerisTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('file_gambar')
                    ->label('Thumbnail')
                    ->square(),
                    
                TextColumn::make('judul_kegiatan')
                    ->label('Judul Dokumentasi')
                    ->searchable()
                    ->weight('bold'),
                    
                TextColumn::make('kategori')
                    ->label('Kategori')
                    ->badge()
                    ->color('success')
                    ->searchable(),
                    
                TextColumn::make('tipe')
                    ->label('Format')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'video' => 'danger',
                        'foto' => 'info',
                    })
                    ->formatStateUsing(fn (string $state): string => strtoupper($state)),
                    
                TextColumn::make('created_at')
                    ->label('Diupload')
                    ->dateTime('d M Y')
                    ->sortable(),
            ])
            ->filters([])
            ->recordActions([
                EditAction::make()->label('Ubah'),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('created_at', 'desc');
    }
}