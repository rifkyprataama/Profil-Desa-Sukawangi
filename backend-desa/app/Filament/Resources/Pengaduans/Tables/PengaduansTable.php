<?php

namespace App\Filament\Resources\Pengaduans\Tables;

// IMPORT BAWAAN ASLI ANDA:
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;

// IMPORT KOLOM BARU:
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Table;

class PengaduansTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('nama')
                    ->label('Nama Pelapor')
                    ->searchable()
                    ->sortable()
                    ->weight('bold'),
                    
                TextColumn::make('kategori')
                    ->label('Kategori')
                    ->searchable()
                    ->badge()
                    ->color('gray'),
                    
                TextColumn::make('no_wa')
                    ->label('No. WhatsApp')
                    ->searchable()
                    ->icon('heroicon-m-phone'),

                ImageColumn::make('lampiran')
                    ->label('Bukti')
                    ->square(),
                    
                TextColumn::make('status')
                    ->label('Status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'Menunggu Verifikasi' => 'warning',
                        'Sedang Diproses' => 'info',
                        'Selesai' => 'success',
                        'Ditolak' => 'danger',
                        default => 'gray',
                    }),
                    
                TextColumn::make('created_at')
                    ->label('Dilaporkan pada')
                    ->dateTime('d M Y, H:i')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: false),
            ])
            ->filters([
                //
            ])
            ->recordActions([ // Kembali menggunakan recordActions
                ViewAction::make()->label('Lihat'),
                EditAction::make()->label('Ubah Status'),
            ])
            ->toolbarActions([ // Kembali menggunakan toolbarActions
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('created_at', 'desc');
    }
}