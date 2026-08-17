import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Image as ImageIcon, Home, ChevronRight, 
  X, ZoomIn, Camera, ChevronDown, PhoneCall,
  PlayCircle, Video
} from 'lucide-react';

export default function Galeri() {
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [selectedItem, setSelectedItem] = useState(null);
  const [dataBanner, setDataBanner] = useState(null);
  
  const [dataGaleri, setDataGaleri] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);

  const categories = ['Semua', 'Infrastruktur', 'Pemerintahan', 'Kegiatan Warga', 'Sosial', 'Kesehatan'];

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

  useEffect(() => {
    window.scrollTo(0, 0);
    
    Promise.all([
      fetch(`${API_URL}/api/galeri`).then(res => res.json()).catch(() => null),
      fetch(`${API_URL}/api/pengaturan-beranda`).then(res => res.json()).catch(() => null)
    ])
    .then(([resGaleri, resBanner]) => {
      if (resGaleri) {
        const d = resGaleri.data?.data || resGaleri.data || resGaleri;
        if (Array.isArray(d)) {
          const formattedData = d.map(item => ({
            id: item.id,
            tipe: item.tipe || 'foto',
            judul: item.judul_kegiatan,
            kategori: item.kategori,
            url: `${API_URL}/storage/${item.file_gambar}`,
            videoId: item.link_video
          }));
          setDataGaleri(formattedData);
        }
      }
      
      // PERBAIKAN DI SINI
      if (resBanner) {
        const dBanner = resBanner.data || resBanner;
        setDataBanner(Array.isArray(dBanner) ? dBanner[0] : dBanner);
      }
      
      setLoading(false);
    })
    .catch(error => {
      console.error('Error fetching galeri:', error);
      setLoading(false);
    });
  }, [API_URL]);

  useEffect(() => {
    setVisibleCount(8);
  }, [activeCategory]);

  const filteredGallery = dataGaleri.filter(item => 
    activeCategory === 'Semua' || item.kategori === activeCategory
  );

  const displayedGallery = filteredGallery.slice(0, visibleCount);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedItem(null);
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
            src={
              dataBanner?.banner_galeri 
                ? `${API_URL}/storage/${dataBanner.banner_galeri}` 
                : "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?q=80&w=1920&auto=format&fit=crop"
            } 
            alt="Galeri Desa" 
            className="w-full h-full object-cover mix-blend-overlay grayscale-[20%]"
          />
        </div>
        <div className="relative z-10 text-center px-6 mt-10">
          <div className="inline-flex items-center gap-2 bg-[#febe9b] text-[#331200] px-4 py-1.5 rounded-full text-[13px] font-bold uppercase tracking-widest mb-6 shadow-sm">
            <Camera className="w-4 h-4" /> Dokumentasi
          </div>
          <h1 className="text-[36px] md:text-[52px] font-extrabold text-white leading-tight drop-shadow-md">
            Galeri Audio Visual
          </h1>
        </div>
      </section>

      {/* 2. BREADCRUMB & FILTER KATEGORI */}
      <div className="bg-white/90 backdrop-blur-md border-b border-[#c1c8c2]/50 sticky top-[80px] z-40 shadow-sm">
        <div className="max-w-[1200px] mx-auto px-6 py-4 flex flex-col gap-4">
          <div className="flex items-center gap-2 text-[14px] font-medium text-[#717973] overflow-x-auto whitespace-nowrap hide-scrollbar">
            <Link to="/" className="hover:text-[#012d1d] flex items-center gap-1"><Home className="w-4 h-4"/> Beranda</Link>
            <ChevronRight className="w-4 h-4 shrink-0" />
            <span className="text-[#012d1d] font-bold">Galeri Foto & Video</span>
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

      {/* 3. GRID FOTO & VIDEO */}
      <section className="py-12 md:py-16 flex-grow">
        <div className="max-w-[1200px] mx-auto px-6">
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <div key={item} className="h-64 bg-[#e4e2de] rounded-2xl animate-pulse"></div>
              ))}
            </div>
          ) : displayedGallery.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {displayedGallery.map((item) => (
                  <div 
                    key={item.id} 
                    onClick={() => setSelectedItem(item)}
                    className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 bg-[#012d1d]"
                  >
                    <img 
                      src={item.url} 
                      alt={item.judul} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-50"
                      loading="lazy"
                    />
                    
                    {item.tipe === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                        <PlayCircle className="w-14 h-14 text-white/90 drop-shadow-lg group-hover:scale-110 transition-transform" />
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-[#012d1d]/90 via-[#012d1d]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      {item.tipe === 'foto' ? (
                        <ZoomIn className="w-8 h-8 text-white mb-auto self-end opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-100" />
                      ) : (
                        <Video className="w-8 h-8 text-[#febe9b] mb-auto self-end opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-100" />
                      )}
                      
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

              {visibleCount < filteredGallery.length && (
                <div className="mt-12 text-center">
                  <button 
                    onClick={() => setVisibleCount(prev => prev + 8)}
                    className="inline-flex items-center justify-center gap-2 bg-white text-[15px] font-bold border-2 border-[#e4e2de] text-[#012d1d] px-8 py-3.5 rounded-lg hover:bg-[#efeeea] hover:border-[#c1c8c2] transition-all shadow-sm group"
                  >
                    Muat Lebih Banyak <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-24 bg-white rounded-2xl border border-[#c1c8c2]/40 shadow-sm flex flex-col items-center justify-center">
               <ImageIcon className="w-16 h-16 text-[#c1c8c2] mb-4" />
               <h3 className="text-[24px] font-bold text-[#012d1d] mb-2">Tidak Ada Dokumentasi</h3>
               <p className="text-[#414844] text-[16px]">Belum ada foto atau video untuk kategori "{activeCategory}".</p>
            </div>
          )}

        </div>
      </section>

      {/* 4. CALL TO ACTION */}
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
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <button 
            onClick={() => setSelectedItem(null)}
            className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors z-50"
          >
            <X className="w-8 h-8" />
          </button>

          <div className="relative max-w-5xl w-full flex flex-col items-center z-10 pointer-events-none">
            {selectedItem.tipe === 'video' ? (
              <div className="w-full aspect-video bg-black rounded-lg shadow-2xl overflow-hidden pointer-events-auto border border-white/10">
                <iframe 
                  src={`https://www.youtube.com/embed/${selectedItem.videoId}?autoplay=1`} 
                  title={selectedItem.judul}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                  className="w-full h-full border-0"
                ></iframe>
              </div>
            ) : (
              <img 
                src={selectedItem.url} 
                alt={selectedItem.judul} 
                className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl pointer-events-auto"
              />
            )}

            <div className="mt-6 text-center pointer-events-auto">
              <span className="inline-block bg-[#febe9b] text-[#331200] text-[12px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3 shadow-sm">
                {selectedItem.kategori}
              </span>
              <h3 className="text-white text-[24px] font-bold drop-shadow-md flex items-center justify-center gap-2">
                {selectedItem.tipe === 'video' && <Video className="w-6 h-6 text-[#febe9b]" />}
                {selectedItem.judul}
              </h3>
            </div>
          </div>
          
          <div 
            className="absolute inset-0 z-0 cursor-zoom-out" 
            onClick={() => setSelectedItem(null)}
          ></div>
        </div>
      )}

    </div>
  );
}