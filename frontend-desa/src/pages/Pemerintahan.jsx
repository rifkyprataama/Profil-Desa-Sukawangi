import { useEffect, useState } from 'react';

export default function Pemerintahan() {
  const [aparatur, setAparatur] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8000/api/aparatur')
      .then(response => response.json())
      .then(res => {
        setAparatur(res.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false);
      });
  }, []);

  // Memisahkan Kepala Desa dari aparatur lainnya agar bisa didesain khusus (lebih besar)
  const kades = aparatur.find(p => p.jabatan.toLowerCase().includes('kepala desa') || p.jabatan.toLowerCase() === 'kades');
  const lainnya = aparatur.filter(p => p !== kades);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 pb-20">
      
      {/* JUDUL HALAMAN */}
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-bold text-[#012d1d]">Pemerintahan Desa</h1>
        <p className="text-[#414844] max-w-2xl mx-auto">
          Mewujudkan tata kelola desa yang transparan, akuntabel, dan melayani dengan sepenuh hati demi kemajuan Desa Sukawangi.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-20 text-[#414844] animate-pulse">
          Memuat data struktur organisasi...
        </div>
      ) : (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-[#012d1d] flex items-center gap-2 mb-6">
            <span className="text-2xl">🏛️</span> Struktur Organisasi
          </h2>

          {/* KARTU KEPALA DESA (Tampil Paling Atas & Besar) */}
          {kades && (
            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-[#e4e2de] flex flex-col md:flex-row items-center md:items-start gap-8 hover:shadow-md transition">
              <div className="w-40 h-40 shrink-0 rounded-full overflow-hidden bg-[#f5f3ef] border-4 border-[#a5d0b9]">
                {kades.foto ? (
                  <img src={`http://localhost:8000/storage/${kades.foto}`} alt={kades.nama} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-5xl">👤</div>
                )}
              </div>
              <div className="text-center md:text-left space-y-3 mt-2">
                <span className="bg-[#012d1d] text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
                  {kades.jabatan}
                </span>
                <h3 className="text-3xl font-bold text-[#012d1d]">{kades.nama}</h3>
                <p className="text-[#414844] max-w-2xl leading-relaxed">
                  Memimpin penyelenggaraan pemerintahan desa, pelaksanaan pembangunan, pembinaan kemasyarakatan, dan pemberdayaan masyarakat di lingkungan Desa Sukawangi.
                </p>
              </div>
            </div>
          )}

          {/* KARTU APARATUR LAINNYA (Tampil Grid) */}
          {lainnya.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
              {lainnya.map((person) => (
                <div key={person.id} className="bg-white p-6 rounded-2xl shadow-sm border border-[#e4e2de] flex items-center gap-5 hover:shadow-md transition">
                  <div className="w-20 h-20 shrink-0 rounded-full overflow-hidden bg-[#f5f3ef] border-2 border-[#e4e2de]">
                    {person.foto ? (
                      <img src={`http://localhost:8000/storage/${person.foto}`} alt={person.nama} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-3xl">👤</div>
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#835336] uppercase tracking-wider mb-1">{person.jabatan}</p>
                    <h4 className="text-lg font-bold text-[#012d1d] leading-tight">{person.nama}</h4>
                  </div>
                </div>
              ))}
            </div>
          )}

          {aparatur.length === 0 && (
            <div className="text-center py-10 text-[#414844] bg-white rounded-2xl border border-[#e4e2de]">
              Belum ada data aparatur desa.
            </div>
          )}
        </div>
      )}

    </div>
  );
}