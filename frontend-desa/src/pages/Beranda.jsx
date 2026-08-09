import { useEffect, useState } from 'react';

export default function Beranda() {
  const [profilDesa, setProfilDesa] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/api/profil-desa')
      .then(response => response.json())
      .then(res => setProfilDesa(res.data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div className="space-y-12 pb-16">
      
      {/* 1. HERO SECTION (BANNER UTAMA) */}
      <div className="relative bg-[#012d1d] text-white py-24 px-4 text-center overflow-hidden shadow-inner">
        {/* Gambar latar belakang bernuansa alam pedesaan */}
        <div className="absolute inset-0 opacity-30 bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1920&auto=format&fit=crop')` }}></div>
        
        <div className="relative max-w-4xl mx-auto space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Selamat Datang di Desa Sukawangi
          </h1>
          <p className="text-lg md:text-xl text-[#a5d0b9] max-w-2xl mx-auto font-light">
            Harmoni kehidupan agraris dengan tata kelola digital yang modern, transparan, dan melayani sepenuh hati.
          </p>
          <div className="pt-4">
            <a href="#sambutan" className="inline-block bg-[#fbf9f5] text-[#012d1d] font-semibold px-8 py-3 rounded-xl shadow-md hover:bg-[#e4e2de] transition">
              Jelajahi Halaman
            </a>
          </div>
        </div>
      </div>

      {/* 2. KONTEN UTAMA DARI DATABASE */}
      <div id="sambutan" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Kartu Profil Singkat */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#e4e2de] p-8 md:p-12">
          {profilDesa ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-[#3f6653] bg-[#c1ecd4] px-3 py-1 rounded-full">
                  Portal Resmi
                </span>
                <h2 className="text-3xl font-bold text-[#012d1d]">{profilDesa.nama_desa}</h2>
                <p className="text-[#414844] leading-relaxed">{profilDesa.alamat}</p>
                <div className="p-4 bg-[#f5f3ef] rounded-xl border-l-4 border-[#012d1d]">
                  <p className="text-sm font-semibold text-[#012d1d]">Visi Utama:</p>
                  <p className="text-sm italic text-[#414844] mt-1">"{profilDesa.visi}"</p>
                </div>
              </div>

              <div className="bg-[#f5f3ef] p-6 rounded-2xl border border-[#e4e2de] text-center space-y-3">
                <div className="w-16 h-16 bg-[#012d1d] text-white rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                  🏛️
                </div>
                <h3 className="font-bold text-lg text-[#012d1d]">Pelayanan Publik Terpadu</h3>
                <p className="text-sm text-[#414844]">
                  Mendukung transparansi informasi, berita kegiatan warga, hingga sistem pengaduan online yang cepat dan akurat.
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-[#414844] animate-pulse">
              Memuat data profil dari server desa...
            </div>
          )}
        </div>

      </div>

    </div>
  );
}