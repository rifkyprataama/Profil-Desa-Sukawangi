<?php

namespace App\Filament\Resources\ProfilDesas\Tables;

// IMPORT BAWAAN ASLI
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;

// IMPORT KOLOM
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Table;

class ProfilDesasTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('foto_kepala_desa')
                    ->label('Foto Kades')
                    ->circular(), // Membuat foto tampil bulat
                    
                TextColumn::make('nama_kepala_desa')
                    ->label('Kepala Desa')
                    ->searchable()
                    ->weight('bold'),
                    
                TextColumn::make('nama_desa')
                    ->label('Nama Desa')
                    ->searchable(),
                    
                TextColumn::make('total_penduduk')
                    ->label('Populasi (Jiwa)')
                    ->numeric()
                    ->sortable()
                    ->badge()
                    ->color('info'),
                    
                TextColumn::make('luas_wilayah')
                    ->label('Luas Wilayah (Ha)')
                    ->searchable(),
                    
                TextColumn::make('updated_at')
                    ->label('Terakhir Diperbarui')
                    ->dateTime('d M Y, H:i')
                    ->sortable(),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                EditAction::make()->label('Ubah Profil'), // Memperjelas tombol aksi
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}