<!DOCTYPE html>
<html>
<head>
    <title>Profil Desa Sukawangi</title>
    <style>
        body { font-family: Arial, Helvetica, sans-serif; line-height: 1.5; font-size: 14px; }
        .header { text-align: center; border-bottom: 3px solid #000; padding-bottom: 15px; margin-bottom: 25px; }
        .title { font-size: 20px; font-weight: bold; margin-bottom: 5px; }
        .subtitle { font-size: 14px; margin-bottom: 0; }
        table { width: 100%; border-collapse: collapse; margin-top: 15px; }
        th, td { border: 1px solid #000; padding: 10px; text-align: left; vertical-align: top; }
        th { background-color: #f2f2f2; width: 25%; }
        h3, h4 { color: #012d1d; }
    </style>
</head>
<body>
    <div class="header">
        <div class="title">PEMERINTAH KABUPATEN CIANJUR</div>
        <div class="title">KECAMATAN WARUNGKONDANG</div>
        <div class="title">DESA SUKAWANGI</div>
        <div class="subtitle">Jl. Desa Sukawangi No. 1, Kec. Warungkondang, Kab. Cianjur, Jawa Barat</div>
    </div>

    <h3 style="text-align: center; text-decoration: underline;">PROFIL KEPALA DESA DAN VISI MISI</h3>

    <table>
        <tr>
            <th>Kepala Desa</th>
            <td>{{ $profil->nama_kepala_desa ?? 'Belum ada data' }}</td>
        </tr>
        <tr>
            <th>Visi</th>
            <td>{{ $profil->visi ?? 'Belum ada data' }}</td>
        </tr>
        <tr>
            <th>Misi</th>
            <!-- Menampilkan data dari rich text editor -->
            <td>{!! $profil->misi ?? 'Belum ada data' !!}</td>
        </tr>
    </table>

    <h4 style="margin-top: 30px; border-bottom: 1px solid #000; padding-bottom: 5px;">Sejarah Singkat Desa</h4>
    <div>
        {!! $profil->sejarah ?? 'Belum ada riwayat sejarah.' !!}
    </div>
</body>
</html>