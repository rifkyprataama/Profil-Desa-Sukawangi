import { useEffect, useState } from 'react';

export default function Berita() {
  const [berita, setBerita] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mengambil data berita dari Backend Laravel
  useEffect(() => {
    fetch('http://localhost:8000/api/berita')
      .then(response => response.json())
      .then(res => {
        setBerita(res.data || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false);
      });
  }, []);

  // Memisahkan Berita Utama (berita terbaru/pertama) dan Berita Lainnya
  const beritaUtama = berita.length > 0 ? berita[0] : null;
  const beritaLainnya = berita.length > 1 ? berita.slice(1) : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-20">
      
      {/* JUDUL HALAMAN */}
      <div className="space-y-3 mb-10">
        <h1 className="text-4xl font-bold text-[#012d1d]">Berita & Pengumuman</h1>
        <p className="text-[#414844] max-w-2xl">
          Kabar terbaru, agenda desa, dan informasi penting untuk warga Desa Sukawangi.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* KOLOM KIRI: DAFTAR BERITA (Porsi 2/3) */}
        <div className="lg:col-span-2 space-y-8">
          
          {loading ? (
            <div className="text-center py-20 text-[#414844] animate-pulse bg-white rounded-2xl border border-[#e4e2de]">
              Memuat kabar terbaru...
            </div>
          ) : beritaUtama ? (
            <>
              {/* BERITA UTAMA */}
              <div className="bg-white rounded-2xl shadow-sm border border-[#e4e2de] overflow-hidden group cursor-pointer hover:shadow-md transition">
                <div className="h-72 w-full bg-[#e4e2de] relative overflow-hidden">
                  {beritaUtama.gambar ? (
                    <img 
                      src={`http://localhost:8000/storage/${beritaUtama.gambar}`} 
                      alt={beritaUtama.judul} 
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl bg-[#c1ecd4]">📰</div>
                  )}
                  <div className="absolute top-4 left-4 bg-[#012d1d] text-white text-xs font-bold px-3 py-1 rounded-full">
                    Berita Utama
                  </div>
                </div>
                <div className="p-6 md:p-8 space-y-4">
                  <div className="flex items-center gap-2 text-sm text-[#717973] font-medium">
                    <span>📅 {new Date(beritaUtama.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    <span>•</span>
                    <span>Kabar Desa</span>
                  </div>
                  <h2 className="text-2xl font-bold text-[#012d1d] group-hover:text-[#3f6653] transition">
                    {beritaUtama.judul}
                  </h2>
                  <p className="text-[#414844] line-clamp-3 leading-relaxed">
                    {beritaUtama.isi_berita}
                  </p>
                  <div className="pt-2">
                    <span className="text-[#012d1d] font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                      Baca Selengkapnya <span className="text-lg">→</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* BERITA LAINNYA (Grid 2 Kolom) */}
              {beritaLainnya.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {beritaLainnya.map((item) => (
                    <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-[#e4e2de] overflow-hidden group cursor-pointer hover:shadow-md transition flex flex-col">
                      <div className="h-48 w-full bg-[#e4e2de] overflow-hidden">
                        {item.gambar ? (
                          <img 
                            src={`http://localhost:8000/storage/${item.gambar}`} 
                            alt={item.judul} 
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-3xl bg-[#f5f3ef]">🗞️</div>
                        )}
                      </div>
                      <div className="p-6 flex-grow flex flex-col space-y-3">
                        <span className="text-xs text-[#717973] font-medium">
                          📅 {new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </span>
                        <h3 className="text-lg font-bold text-[#012d1d] group-hover:text-[#3f6653] transition line-clamp-2 leading-tight">
                          {item.judul}
                        </h3>
                        <p className="text-[#414844] text-sm line-clamp-2 flex-grow">
                          {item.isi_berita}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20 text-[#414844] bg-white rounded-2xl border border-[#e4e2de]">
              Belum ada berita yang dipublikasikan.
            </div>
          )}

          {/* Tombol Muat Lebih Banyak */}
          {beritaLainnya.length > 0 && (
            <div className="text-center pt-4">
              <button className="px-6 py-3 border-2 border-[#012d1d] text-[#012d1d] font-bold rounded-xl hover:bg-[#012d1d] hover:text-white transition">
                Muat Berita Lainnya ⌄
              </button>
            </div>
          )}

        </div>

        {/* KOLOM KANAN: PENGUMUMAN & AGENDA (Porsi 1/3) */}
        <div className="space-y-8">
          
          {/* PENGUMUMAN PENTING (Desain Khusus Warna Aksen Merah Muda Terang) */}
          <div className="bg-[#ffdad6] rounded-2xl shadow-sm border border-[#ffb4ab] p-6">
            <h3 className="text-[#93000a] text-lg font-bold flex items-center gap-2 mb-5">
              <span className="text-xl">📢</span> Pengumuman Penting
            </h3>
            
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-xl shadow-sm flex gap-4 items-start">
                <div className="bg-[#f5f3ef] p-2.5 rounded-lg text-xl border border-[#e4e2de]">🏥</div>
                <div>
                  <h4 className="font-bold text-[#012d1d] text-sm">Jadwal Imunisasi Balita</h4>
                  <p className="text-xs text-[#414844] mt-1 leading-relaxed">Pelaksanaan Posyandu Mawar 1 untuk bulan ini diundur ke tanggal 20 Agustus 2026.</p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl shadow-sm flex gap-4 items-start">
                <div className="bg-[#f5f3ef] p-2.5 rounded-lg text-xl border border-[#e4e2de]">👥</div>
                <div>
                  <h4 className="font-bold text-[#012d1d] text-sm">Pengumuman Rapat Desa</h4>
                  <p className="text-xs text-[#414844] mt-1 leading-relaxed">Mengundang seluruh ketua RT/RW untuk hadir dalam rapat evaluasi pembangunan desa.</p>
                </div>
              </div>
            </div>
          </div>

          {/* AGENDA BULAN INI */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#e4e2de] p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[#012d1d] text-lg font-bold flex items-center gap-2">
                <span className="text-xl">🗓️</span> Agenda Bulan Ini
              </h3>
              <span className="text-xs font-semibold text-[#3f6653] cursor-pointer hover:underline">Lihat Semua</span>
            </div>

            {/* List Agenda / Timeline */}
            <div className="space-y-6">
              
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-[#012d1d] text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-sm">
                  17
                </div>
                <div className="pt-1 border-b border-[#e4e2de] pb-4 w-full">
                  <h4 className="font-bold text-[#012d1d]">Upacara HUT RI ke-81</h4>
                  <p className="text-xs text-[#717973] mt-1">07:00 WIB • Lapangan Desa</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-[#fbf9f5] text-[#012d1d] border-2 border-[#e4e2de] flex items-center justify-center font-bold text-lg shrink-0">
                  20
                </div>
                <div className="pt-1 border-b border-[#e4e2de] pb-4 w-full">
                  <h4 className="font-bold text-[#012d1d]">Posyandu & Imunisasi</h4>
                  <p className="text-xs text-[#717973] mt-1">08:00 WIB • Balai Warga RW 03</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-[#fbf9f5] text-[#012d1d] border-2 border-[#e4e2de] flex items-center justify-center font-bold text-lg shrink-0">
                  25
                </div>
                <div className="pt-1 w-full">
                  <h4 className="font-bold text-[#012d1d]">Pasar Tani Bulanan</h4>
                  <p className="text-xs text-[#717973] mt-1">06:00 WIB • Area Parkir Balai Desa</p>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}