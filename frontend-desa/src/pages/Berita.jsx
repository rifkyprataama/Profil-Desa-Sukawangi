import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Newspaper, Calendar, ArrowRightCircle, 
  Search, Home, ChevronRight, FileX, ChevronLeft 
} from 'lucide-react';

export default function Berita() {
  const [beritaList, setBeritaList] = useState([]);
  const [dataBanner, setDataBanner] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Semua');
  
  const categories = ['Semua', 'Pemerintahan', 'Pembangunan', 'Sosial', 'Pemberdayaan'];

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

  useEffect(() => {
    window.scrollTo(0, 0);

    Promise.all([
      fetch(`${API_URL}/api/berita`).then(res => res.json()),
      fetch(`${API_URL}/api/pengaturan-beranda`).then(res => res.json())
    ])
    .then(([resBerita, resBanner]) => {
      const dataBerita = resBerita.data?.data || resBerita.data || resBerita;
      if (Array.isArray(dataBerita)) {
        setBeritaList(dataBerita);
      }
      if (resBanner.success) {
        setDataBanner(Array.isArray(resBanner.data) ? resBanner.data[0] : resBanner.data);
      }
      setLoading(false);
    })
    .catch(error => {
      console.error('Error fetching berita:', error);
      setLoading(false);
    });
  }, [API_URL]);

  const filteredBerita = beritaList.filter((item) => {
    const matchSearch = item.judul.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = activeCategory === 'Semua' || item.kategori === activeCategory;
    return matchSearch && matchCategory;
  });

  const createExcerpt = (htmlString, maxLength = 120) => {
    if (!htmlString) return '';
    const plainText = htmlString.replace(/<[^>]+>/g, '');
    if (plainText.length <= maxLength) return plainText;
    return plainText.substring(0, maxLength) + '...';
  };

  return (
    <div className="bg-[#fbf9f5] text-[#1b1c1a] font-['Inter'] flex flex-col min-h-screen">
      
      {/* 1. HERO BANNER */}
      <section className="relative h-[300px] md:h-[400px] w-full flex items-center justify-center mt-0">
        <div className="absolute inset-0 z-0 bg-[#012d1d]/80">
          <img 
            src={
              dataBanner?.banner_berita 
                ? `${API_URL}/storage/${dataBanner.banner_berita}` 
                : "https://images.unsplash.com/photo-1585241936939-5ea1bc382c9c?q=80&w=1920&auto=format&fit=crop"
            } 
            alt="Kabar Desa" 
            className="w-full h-full object-cover mix-blend-overlay grayscale-[30%]"
          />
        </div>
        <div className="relative z-10 text-center px-6 mt-10">
          <div className="inline-flex items-center gap-2 bg-[#febe9b] text-[#331200] px-4 py-1.5 rounded-full text-[13px] font-bold uppercase tracking-widest mb-6 shadow-sm">
            <Newspaper className="w-4 h-4" /> Pusat Informasi
          </div>
          <h1 className="text-[36px] md:text-[52px] font-extrabold text-white leading-tight drop-shadow-md">
            Kabar Desa Terkini
          </h1>
        </div>
      </section>

      {/* 2. BREADCRUMB, SEARCH & FILTER */}
      <div className="bg-white/90 backdrop-blur-md border-b border-[#c1c8c2]/50 sticky top-[80px] z-40 shadow-sm">
        <div className="max-w-[1200px] mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2 text-[14px] font-medium text-[#717973] overflow-x-auto whitespace-nowrap hide-scrollbar w-full md:w-auto">
              <Link to="/" className="hover:text-[#012d1d] flex items-center gap-1"><Home className="w-4 h-4"/> Beranda</Link>
              <ChevronRight className="w-4 h-4 shrink-0" />
              <span className="text-[#012d1d] font-bold">Semua Berita</span>
            </div>

            <div className="relative w-full md:w-96">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <Search className="w-5 h-5 text-[#717973]" />
              </div>
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari judul berita..."
                className="w-full bg-[#efeeea] border-none text-[#1b1c1a] text-[14px] rounded-full focus:ring-2 focus:ring-[#012d1d] block pl-11 p-2.5 transition-shadow"
              />
            </div>
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

      {/* 3. GRID KARTU BERITA */}
      <section className="py-12 md:py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="bg-white rounded-2xl border border-[#c1c8c2]/40 p-5 h-[420px] flex flex-col gap-4 animate-pulse">
                  <div className="w-full h-48 bg-[#e4e2de] rounded-xl"></div>
                  <div className="w-1/3 h-4 bg-[#e4e2de] rounded"></div>
                  <div className="w-full h-6 bg-[#e4e2de] rounded mt-2"></div>
                  <div className="w-5/6 h-6 bg-[#e4e2de] rounded"></div>
                  <div className="mt-auto w-full h-10 bg-[#e4e2de] rounded-lg"></div>
                </div>
              ))}
            </div>
          ) : filteredBerita.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {filteredBerita.map((item, index) => (
                  <Link to={`/berita/${item.slug || item.id}`} key={index} className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-[#c1c8c2]/40 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                    <div className="h-56 w-full overflow-hidden relative shrink-0 bg-[#e4e2de]">
                      <img 
                        src={item.gambar ? `${API_URL}/storage/${item.gambar}` : 'https://via.placeholder.com/600x400?text=Berita+Desa'} 
                        alt={item.judul} 
                        loading="lazy"
                        onError={(e) => {
                          e.target.onerror = null; 
                          e.target.src = 'https://via.placeholder.com/600x400?text=Gambar+Tidak+Tersedia';
                        }}
                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 ease-in-out" 
                      />
                      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur text-[#012d1d] text-[12px] font-bold px-3 py-1.5 rounded-md shadow-sm flex items-center gap-1">
                        <Newspaper className="w-4 h-4" /> {item.kategori || 'Info Desa'}
                      </div>
                    </div>
                    
                    <div className="p-6 md:p-8 flex-grow flex flex-col">
                      <div className="flex items-center gap-2 text-[#717973] mb-3">
                        <Calendar className="w-4 h-4" />
                        <p className="text-[13px] font-bold uppercase tracking-wider">
                          {new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </p>
                      </div>
                      
                      <h3 className="text-[20px] leading-snug font-extrabold text-[#012d1d] mb-4 line-clamp-2 group-hover:text-[#3f6653] transition-colors">
                        {item.judul}
                      </h3>
                      
                      <p className="text-[15px] text-[#414844] line-clamp-3 mb-6 leading-relaxed">
                        {createExcerpt(item.isi_berita)}
                      </p>
                      
                      <div className="mt-auto pt-5 border-t border-[#e4e2de] flex justify-between items-center text-[#012d1d] font-bold text-[14px]">
                        <span className="group-hover:text-[#3f6653] transition-colors">Baca Artikel</span>
                        <ArrowRightCircle className="w-5 h-5 transform group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* 4. PAGINATION */}
              <div className="flex justify-center items-center gap-2">
                <button className="w-10 h-10 rounded-lg flex items-center justify-center border border-[#c1c8c2] bg-white text-[#414844] hover:bg-[#efeeea] transition-colors disabled:opacity-50">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 rounded-lg flex items-center justify-center border bg-[#012d1d] text-white font-bold shadow-md">
                  1
                </button>
                <button className="w-10 h-10 rounded-lg flex items-center justify-center border border-[#c1c8c2] bg-white text-[#414844] hover:bg-[#efeeea] font-bold transition-colors">
                  2
                </button>
                <button className="w-10 h-10 rounded-lg flex items-center justify-center border border-[#c1c8c2] bg-white text-[#414844] hover:bg-[#efeeea] font-bold transition-colors">
                  3
                </button>
                <span className="text-[#717973] font-bold mx-1">...</span>
                <button className="w-10 h-10 rounded-lg flex items-center justify-center border border-[#c1c8c2] bg-white text-[#414844] hover:bg-[#efeeea] transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-24 bg-white rounded-2xl border border-[#c1c8c2]/40 shadow-sm flex flex-col items-center justify-center">
               <FileX className="w-16 h-16 text-[#c1c8c2] mb-4" />
               <h3 className="text-[24px] font-bold text-[#012d1d] mb-2">Pencarian Tidak Ditemukan</h3>
               <p className="text-[#414844] text-[16px]">Maaf, tidak ada berita dengan filter/judul tersebut.</p>
               <button 
                 onClick={() => {setSearchTerm(''); setActiveCategory('Semua');}} 
                 className="mt-6 bg-[#efeeea] text-[#012d1d] px-6 py-2 rounded-lg font-bold hover:bg-[#e4e2de] transition-colors"
               >
                 Tampilkan Semua Berita
               </button>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}