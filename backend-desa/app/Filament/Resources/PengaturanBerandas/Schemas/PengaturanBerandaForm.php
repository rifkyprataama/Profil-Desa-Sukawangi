<?php

namespace App\Filament\Resources\PengaturanBerandas\Schemas;

use Filament\Schemas\Components\Section;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class PengaturanBerandaForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Teks Banner Utama')
                    ->components([
                        TextInput::make('judul_banner')
                            ->label('Judul Besar Banner')
                            ->required()
                            ->maxLength(255),
                        Textarea::make('subjudul_banner')
                            ->label('Teks Subjudul (Deskripsi Pendek)')
                            ->required()
                            ->rows(3),
                    ]),

                Section::make('Data Angka APBDes')
                    ->description('Sesuaikan angka dan persentase yang tampil di beranda')
                    ->components([
                        TextInput::make('realisasi_pendapatan')
                            ->label('Realisasi Pendapatan (Contoh: Rp 1.85 M)')
                            ->required()
                            ->maxLength(255)
                            ->columnSpanFull(),
                        TextInput::make('persentase_dd')
                            ->label('Persentase Dana Desa (%)')
                            ->numeric()
                            ->required(),
                        TextInput::make('persentase_add')
                            ->label('Persentase ADD (%)')
                            ->numeric()
                            ->required(),
                        TextInput::make('persentase_pades')
                            ->label('Persentase PADes (%)')
                            ->numeric()
                            ->required(),
                    ])->columns(3),
            ]);
    }
}