<?php

namespace App\Filament\Resources\Kontaks\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class KontakForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('alamat')
                    ->label('Alamat Lengkap Balai Desa')
                    ->required()
                    ->maxLength(255)
                    ->columnSpanFull(),
                    
                TextInput::make('telepon')
                    ->label('No. Telepon / WhatsApp')
                    ->required()
                    ->maxLength(255),
                    
                TextInput::make('email')
                    ->label('Alamat Email Resmi')
                    ->email()
                    ->required()
                    ->maxLength(255),
                    
                TextInput::make('jam_operasional')
                    ->label('Jam Operasional')
                    ->placeholder('Misal: Senin - Jumat: 08.00 - 15.00')
                    ->required()
                    ->maxLength(255)
                    ->columnSpanFull(),
                    
                Textarea::make('link_peta')
                    ->label('Link Embed Google Maps')
                    ->helperText('Cara ambil: Buka Google Maps > Cari Lokasi Desa > Klik "Bagikan" > Klik "Sematkan Peta" > Salin link yang ada di dalam src="..."')
                    ->required()
                    ->rows(4)
                    ->columnSpanFull(),

                // --- TAMBAHAN LINK SOSIAL MEDIA ---
                TextInput::make('link_instagram')
                    ->label('Link Instagram')
                    ->url() // Validasi harus berupa URL
                    ->placeholder('https://instagram.com/desasukawangi')
                    ->maxLength(255),
                    
                TextInput::make('link_facebook')
                    ->label('Link Facebook')
                    ->url()
                    ->placeholder('https://facebook.com/desasukawangi')
                    ->maxLength(255),
                    
                TextInput::make('link_youtube')
                    ->label('Link YouTube')
                    ->url()
                    ->placeholder('https://youtube.com/@desasukawangi')
                    ->maxLength(255),
            ]);
    }
}