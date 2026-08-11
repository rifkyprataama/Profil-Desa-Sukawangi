import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Image as ImageIcon, Home, ChevronRight, 
  X, ZoomIn, Camera, ChevronDown, PhoneCall
} from 'lucide-react';

export default function Galeri() {
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [selectedImage, setSelectedImage] = useState(null);

  // DATA DUMMY GALERI
  const dummyGallery = [
    { id: 1, judul: 'Perbaikan Jalan Dusun II', kategori: 'Infrastruktur', url: 'https://images.unsplash.com/photo-1584351583369-6baf055b51a7?q=80&w=800&auto=format&fit=crop' },
    { id: 2, judul: 'Rapat Desa Bulanan', kategori: 'Pemerintahan', url: 'https://images.unsplash.com/photo-1577563908411-50cb989766a3?q=80&w=800&auto=format&fit=crop' },
    { id: 3, judul: 'Panen Raya Padi Organik', kategori: 'Kegiatan Warga', url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop' },
    { id: 4, judul: 'Penyaluran Bantuan Sosial', kategori: 'Sosial', url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop' },
    { id: 5, judul: 'Kegiatan Posyandu Melati', kategori: 'Kesehatan', url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop' },
    { id: 6, judul: 'Pembangunan Jembatan Gantung', kategori: 'Infrastruktur', url: 'https://images.unsplash.com/photo-1541888086225-ee81fb60195a?q=80&w=800&auto=format&fit=crop' },
    { id: 7, judul: 'Kerja Bakti Bersih Desa', kategori: 'Kegiatan Warga', url: 'https://images.unsplash.com/photo-1593409951662-8e7c10b067d3?q=80&w=800&auto=format&fit=crop' },
    { id: 8, judul: 'Kunjungan Bupati ke Balai Desa', kategori: 'Pemerintahan', url: 'https://images.unsplash.com/photo-1555848962-6e79363ec58f?q=80&w=800&auto=format&fit=crop' },
  ];

  const categories = ['Semua', 'Infrastruktur', 'Pemerintahan', 'Kegiatan Warga', 'Sosial', 'Kesehatan'];

  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, []);

  const filteredGallery = dummyGallery.filter(item => 
    activeCategory === 'Semua' || item.kategori === activeCategory
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedImage(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="bg-[#fbf9f5] text-[#1b1c1a] font-['Inter'] flex flex-col min-h-screen">
      
      {/* 1. HERO BANNER */}
      <section className="relative h-[300px] md:h-[400px] w-full flex items-center justify-center mt-0">
        <div className="absolute inset-0 z-0 bg-[#012d1d]/80">
          <img 
            src="https://images.unsplash.com/photo-1505118380757-91f5f5632de0?q=80&w=1920&auto=format&fit=crop" 
            alt="Galeri Desa" 
            className="w-full h-full object-cover mix-blend-overlay grayscale-[20%]"
          />
        </div>
        <div className="relative z-10 text-center px-6 mt-10">
          <div className="inline-flex items-center gap-2 bg-[#febe9b] text-[#331200] px-4 py-1.5 rounded-full text-[13px] font-bold uppercase tracking-widest mb-6 shadow-sm">
            <Camera className="w-4 h-4" /> Dokumentasi
          </div>
          <h1 className="text-[36px] md:text-[52px] font-extrabold text-white leading-tight drop-shadow-md">
            Galeri Desa
          </h1>
        </div>
      </section>

      {/* 2. BREADCRUMB & FILTER KATEGORI */}
      <div className="bg-white/90 backdrop-blur-md border-b border-[#c1c8c2]/50 sticky top-[80px] z-40 shadow-sm">
        <div className="max-w-[1200px] mx-auto px-6 py-4 flex flex-col gap-4">
          <div className="flex items-center gap-2 text-[14px] font-medium text-[#717973] overflow-x-auto whitespace-nowrap hide-scrollbar">
            <Link to="/" className="hover:text-[#012d1d] flex items-center gap-1"><Home className="w-4 h-4"/> Beranda</Link>
            <ChevronRight className="w-4 h-4 shrink-0" />
            <span className="text-[#012d1d] font-bold">Galeri Foto</span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-5 py-2 rounded-full text-[13px] font-bold transition-colors border ${
                  activeCategory === cat 
                    ? 'bg-[#012d1d] text-white border-[#012d1d] shadow-md' 
                    : 'bg-white text-[#414844] border-[#c1c8c2]/60 hover:bg-[#efeeea]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. GRID FOTO & LOAD MORE */}
      <section className="py-12 md:py-16 flex-grow">
        <div className="max-w-[1200px] mx-auto px-6">
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <div key={item} className="h-64 bg-[#e4e2de] rounded-2xl animate-pulse"></div>
              ))}
            </div>
          ) : filteredGallery.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredGallery.map((item) => (
                  <div 
                    key={item.id} 
                    onClick={() => setSelectedImage(item)}
                    className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500"
                  >
                    <img 
                      src={item.url} 
                      alt={item.judul} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 bg-[#e4e2de]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#012d1d]/90 via-[#012d1d]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <ZoomIn className="w-8 h-8 text-white mb-auto self-end opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-100" />
                      <span className="text-[#febe9b] text-[12px] font-bold uppercase tracking-wider mb-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        {item.kategori}
                      </span>
                      <h3 className="text-white text-[16px] font-bold leading-tight transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                        {item.judul}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>

              {/* FITUR TAMBAHAN: Tombol Load More */}
              {filteredGallery.length >= 8 && (
                <div className="mt-12 text-center">
                  <button className="inline-flex items-center justify-center gap-2 bg-white text-[15px] font-bold border-2 border-[#e4e2de] text-[#012d1d] px-8 py-3.5 rounded-lg hover:bg-[#efeeea] hover:border-[#c1c8c2] transition-all shadow-sm group">
                    Muat Lebih Banyak <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-24 bg-white rounded-2xl border border-[#c1c8c2]/40 shadow-sm flex flex-col items-center justify-center">
               <ImageIcon className="w-16 h-16 text-[#c1c8c2] mb-4" />
               <h3 className="text-[24px] font-bold text-[#012d1d] mb-2">Tidak Ada Foto</h3>
               <p className="text-[#414844] text-[16px]">Belum ada dokumentasi untuk kategori "{activeCategory}".</p>
            </div>
          )}

        </div>
      </section>

      {/* 4. CALL TO ACTION & SOSIAL MEDIA */}
      <section className="py-16 bg-white border-t border-[#c1c8c2]/30">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h2 className="text-[24px] font-bold text-[#012d1d] mb-2">Lihat Dokumentasi Lainnya</h2>
            <p className="text-[16px] text-[#414844] max-w-md">
              Ikuti media sosial resmi Desa Sukawangi untuk mendapatkan pembaruan kegiatan dan video dokumenter terbaru.
            </p>
          </div>
          <div className="flex flex-wrap justify-center md:justify-end gap-4">
            <a href="#" className="inline-flex items-center justify-center bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity shadow-md">
              Instagram Resmi
            </a>
            <a href="#" className="inline-flex items-center justify-center bg-[#ff0000] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#cc0000] transition-colors shadow-md">
              YouTube Channel
            </a>
            <Link to="/kontak" className="inline-flex items-center gap-2 bg-[#efeeea] text-[#012d1d] border border-[#c1c8c2] px-6 py-3 rounded-lg font-bold hover:bg-[#e4e2de] transition-colors shadow-sm">
              <PhoneCall className="w-5 h-5" /> Hubungi Kami
            </Link>
          </div>
        </div>
      </section>

      {/* 5. LIGHTBOX MODAL */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <button 
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors z-50"
          >
            <X className="w-8 h-8" />
          </button>

          <div className="relative max-w-5xl w-full flex flex-col items-center z-10 pointer-events-none">
            <img 
              src={selectedImage.url} 
              alt={selectedImage.judul} 
              className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl pointer-events-auto"
            />
            <div className="mt-6 text-center pointer-events-auto">
              <span className="inline-block bg-[#febe9b] text-[#331200] text-[12px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3 shadow-sm">
                {selectedImage.kategori}
              </span>
              <h3 className="text-white text-[24px] font-bold drop-shadow-md">{selectedImage.judul}</h3>
            </div>
          </div>
          
          <div 
            className="absolute inset-0 z-0 cursor-zoom-out" 
            onClick={() => setSelectedImage(null)}
          ></div>
        </div>
      )}

    </div>
  );
}