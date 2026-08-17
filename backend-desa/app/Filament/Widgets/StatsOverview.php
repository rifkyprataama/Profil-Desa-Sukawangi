<?php

namespace App\Filament\Widgets;

use App\Models\Berita;
use App\Models\Pengaduan;
use App\Models\ProfilDesa;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverview extends BaseWidget
{
    // Mengatur urutan agar widget ini tampil di paling atas dasbor
    protected static ?int $sort = 1;

    protected function getStats(): array
    {
        // Mengambil data jumlah penduduk dari database Profil Desa
        $profil = ProfilDesa::first();
        $totalPenduduk = $profil ? $profil->total_penduduk : 0;

        return [
            Stat::make('Total Penduduk', number_format($totalPenduduk, 0, ',', '.'))
                ->description('Berdasarkan data demografi desa')
                ->descriptionIcon('heroicon-m-users')
                ->color('success'),

            Stat::make('Kabar / Berita', Berita::count())
                ->description('Total artikel diterbitkan')
                ->descriptionIcon('heroicon-m-newspaper')
                ->color('info'),

            Stat::make('Laporan Pengaduan', Pengaduan::count())
                ->description('Total aduan dari masyarakat')
                ->descriptionIcon('heroicon-m-megaphone')
                ->color('warning'),
        ];
    }
}