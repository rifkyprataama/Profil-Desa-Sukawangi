import { useEffect, useState } from 'react';

export default function Profil() {
  const [profilDesa, setProfilDesa] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/api/profil-desa')
      .then(response => response.json())
      .then(res => setProfilDesa(res.data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* JUDUL HALAMAN */}
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-bold text-[#012d1d]">Profil Desa Sukawangi</h1>
        <p className="text-[#414844] max-w-2xl mx-auto">
          Mengenal lebih dekat sejarah, wilayah geografis, dan potensi yang dimiliki oleh Desa Sukawangi.
        </p>
      </div>

      {profilDesa ? (
        <div className="space-y-8">
          
          {/* SEJARAH & GAMBAR */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#e4e2de] p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#3f6653] bg-[#c1ecd4] px-3 py-1 rounded-full">
                Sejarah Desa
              </span>
              <h2 className="text-2xl font-bold text-[#012d1d]">Warisan dan Budaya Luhur</h2>
              <p className="text-[#414844] leading-relaxed">
                {profilDesa.sejarah}
              </p>
              <div className="text-sm font-semibold text-[#012d1d]">
                🏛️ Berdiri sejak tahun 1945
              </div>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop" 
                alt="Desa Sukawangi" 
                className="rounded-xl shadow-md w-full h-64 object-cover"
              />
            </div>
          </div>

          {/* INFORMASI GEOGRAFIS & MISI */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <div className="bg-white rounded-2xl shadow-sm border border-[#e4e2de] p-8 space-y-4">
              <h3 className="text-xl font-bold text-[#012d1d] flex items-center gap-2">
                <span>📍</span> Batas Wilayah Geografis
              </h3>
              <p className="text-[#414844] leading-relaxed">
                {profilDesa.geografis}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-[#e4e2de] p-8 space-y-4">
              <h3 className="text-xl font-bold text-[#012d1d] flex items-center gap-2">
                <span>🎯</span> Misi Pembangunan Desa
              </h3>
              <p className="text-[#414844] leading-relaxed whitespace-pre-line">
                {profilDesa.misi}
              </p>
            </div>

          </div>

        </div>
      ) : (
        <div className="text-center py-20 text-[#414844] animate-pulse">
          Memuat data profil desa...
        </div>
      )}

    </div>
  );
}