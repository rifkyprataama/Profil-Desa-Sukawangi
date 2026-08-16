<?php

namespace App\Filament\Resources\Galeris\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\FileUpload;
use Filament\Schemas\Schema;

class GaleriForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('judul_kegiatan')
                    ->label('Judul Dokumentasi')
                    ->required()
                    ->maxLength(255)
                    ->columnSpanFull(),
                    
                Select::make('kategori')
                    ->label('Kategori Kegiatan')
                    ->options([
                        'Infrastruktur' => 'Infrastruktur',
                        'Pemerintahan' => 'Pemerintahan',
                        'Kegiatan Warga' => 'Kegiatan Warga',
                        'Sosial' => 'Sosial',
                        'Kesehatan' => 'Kesehatan',
                    ])
                    ->required(),
                    
                Select::make('tipe')
                    ->label('Tipe Konten')
                    ->options([
                        'foto' => 'Foto Saja',
                        'video' => 'Video YouTube',
                    ])
                    ->default('foto')
                    ->required()
                    ->live(),
                    
                TextInput::make('link_video')
                    ->label('ID Video YouTube (Opsional)')
                    ->helperText('Contoh: Jika link-nya https://youtube.com/watch?v=kJQP7kiw5Fk, masukkan "kJQP7kiw5Fk"')
                    // PERBAIKAN: Hapus type-hinting agar Filament mendeteksinya secara otomatis
                    ->hidden(fn ($get) => $get('tipe') !== 'video')
                    ->columnSpanFull(),

                FileUpload::make('file_gambar')
                    ->label('Foto Utama / Thumbnail Video')
                    ->image()
                    ->directory('galeri')
                    ->disk('public')
                    ->required()
                    ->columnSpanFull(),
                    
                Textarea::make('deskripsi')
                    ->label('Deskripsi Singkat (Opsional)')
                    ->rows(3)
                    ->columnSpanFull(),
            ]);
    }
}