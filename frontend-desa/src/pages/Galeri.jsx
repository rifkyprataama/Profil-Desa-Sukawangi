import { useEffect, useState } from 'react';

export default function Galeri() {
  const [galeri, setGaleri] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mengambil data foto dari Backend Laravel
  useEffect(() => {
    fetch('http://localhost:8000/api/galeri')
      .then(response => response.json())
      .then(res => {
        setGaleri(res.data || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false);
      });
  }, []);

  // Data tiruan (Placeholder) jika database masih kosong agar tampilan tetap cantik sesuai desain
  const placeholderData = [
    { id: 'p1', judul: 'Kegiatan Warga', foto_url: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=800&auto=format&fit=crop' },
    { id: 'p2', judul: 'Pembangunan Infrastruktur', foto_url: 'https://images.unsplash.com/photo-1541888062972-c2cb7e390c50?q=80&w=800&auto=format&fit=crop' },
    { id: 'p3', judul: 'Potensi Alam', foto_url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop' },
  ];

  const dataTampil = galeri.length > 0 ? galeri : placeholderData;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-20 space-y-16">
      
      {/* JUDUL HALAMAN */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-[#012d1d]">Galeri Desa Sukawangi</h1>
        <p className="text-[#414844] text-lg leading-relaxed">
          Melihat lebih dekat keindahan alam, kegiatan masyarakat, dan perkembangan infrastruktur di Desa Sukawangi melalui lensa kamera.
        </p>
      </div>

      {/* GRID FOTO GALERI */}
      {loading ? (
        <div className="text-center py-20 text-[#414844] animate-pulse">
          Memuat album galeri...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dataTampil.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-[#e4e2de] overflow-hidden group cursor-pointer hover:shadow-md transition duration-300">
              
              <div className="h-64 w-full bg-[#e4e2de] overflow-hidden">
                {/* Cek apakah data dari database asli atau placeholder */}
                <img 
                  src={item.foto ? `http://localhost:8000/storage/${item.foto}` : item.foto_url} 
                  alt={item.judul} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              
              <div className="p-5 flex justify-between items-center bg-white">
                <h3 className="font-bold text-[#012d1d] text-lg">{item.judul}</h3>
                <span className="text-[#717973] text-2xl group-hover:text-[#3f6653] transition">📁</span>
              </div>
              
            </div>
          ))}
        </div>
      )}

      {/* BAGIAN VIDEO PROFIL DESA */}
      <div className="bg-[#f5f3ef] rounded-3xl p-8 md:p-12 shadow-sm border border-[#e4e2de]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-5">
            <h2 className="text-3xl font-bold text-[#012d1d]">Video Profil Desa</h2>
            <p className="text-[#414844] leading-relaxed text-lg">
              Saksikan pesona Desa Sukawangi melalui video profil singkat kami. Mengenal lebih jauh tentang kebudayaan, keindahan alam, serta potensi sumber daya manusia yang kami miliki.
            </p>
            <button className="flex items-center gap-3 text-[#012d1d] font-bold mt-4 hover:text-[#3f6653] transition group">
              <span className="text-2xl group-hover:scale-110 transition">▶️</span> 
              <span>Tonton di YouTube</span>
            </button>
          </div>

          <div className="aspect-video bg-[#e4e2de] rounded-2xl overflow-hidden relative group cursor-pointer shadow-md border-4 border-white">
            <img 
              src="https://images.unsplash.com/photo-1528227651080-607212001e74?q=80&w=1000&auto=format&fit=crop" 
              className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition duration-500" 
              alt="Thumbnail Video" 
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-transparent transition duration-500">
              <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition text-[#012d1d] pl-1">
                ▶
              </div>
            </div>
            {/* Watermark ala video di desain */}
            <div className="absolute top-4 left-4 text-white font-bold drop-shadow-md">
              <p className="tracking-widest uppercase text-xs opacity-80">Desa Sukawangi</p>
              <p className="text-lg">PROFIL DESA</p>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}