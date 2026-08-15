<?php

namespace App\Filament\Resources\Pengaduans\Schemas;

use Filament\Infolists\Components\TextEntry;
use Filament\Infolists\Components\ImageEntry;
use Filament\Infolists\Components\IconEntry;

class PengaduanInfolist
{
    // PERBAIKAN: Menghapus aturan ketat "Infolist" menjadi dinamis
    public static function configure($infolist)
    {
        return $infolist
            ->schema([
                TextEntry::make('nama')
                    ->label('Nama Lengkap Pelapor')
                    ->weight('bold'),
                TextEntry::make('nik')
                    ->label('NIK KTP')
                    ->default('-'),
                TextEntry::make('no_wa')
                    ->label('Nomor WhatsApp')
                    ->copyable()
                    ->copyMessage('Nomor WA disalin!')
                    
                    // --- TAMBAHAN KODE INTEGRASI WA ---
                    ->color('success') // Memberi warna hijau khas WhatsApp
                    ->url(fn ($record) => "https://wa.me/" . preg_replace('/^0/', '62', preg_replace('/[^0-9]/', '', $record->no_wa)) . "?text=" . urlencode("Halo Bapak/Ibu {$record->nama}, kami dari Admin Desa Sukawangi ingin menindaklanjuti laporan Anda terkait kategori *{$record->kategori}*.\n\nBerikut tindak lanjut dari kami:\n"))
                    ->openUrlInNewTab(), // Membuka WA di tab baru
                    // ----------------------------------
                IconEntry::make('is_anonim')
                    ->label('Mode Anonim')
                    ->boolean(),
                TextEntry::make('kategori')
                    ->label('Kategori Keluhan')
                    ->badge()
                    ->color('gray'),
                TextEntry::make('status')
                    ->label('Status Saat Ini')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'Menunggu Verifikasi' => 'warning',
                        'Sedang Diproses' => 'info',
                        'Selesai' => 'success',
                        'Ditolak' => 'danger',
                        default => 'gray',
                    }),
                TextEntry::make('pesan')
                    ->label('Isi Pesan / Kronologi')
                    ->columnSpanFull(),
                
                ImageEntry::make('lampiran')
                    ->label('Lampiran Bukti Foto/Dokumen')
                    ->disk('public') // <-- TAMBAHKAN BARIS INI
                    ->columnSpanFull()
                    ->imageSize(400) 
                    ->extraImgAttributes([
                        'loading' => 'lazy',
                     'class' => 'rounded-xl shadow-sm border border-gray-200'
                 ]),
                    
                TextEntry::make('created_at')
                    ->label('Waktu Laporan Masuk')
                    ->dateTime('d F Y, H:i')
                    ->columnSpanFull(),
            ]);
    }
}