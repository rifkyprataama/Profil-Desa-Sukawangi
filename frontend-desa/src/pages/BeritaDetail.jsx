import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Share2, Tag, ChevronRight, Home, FileEdit } from 'lucide-react';
import { toast } from 'sonner';

export default function BeritaDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  const [berita, setBerita] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

  useEffect(() => {
    // TRIK PINTAR: Ambil semua data berita, lalu filter di frontend
    // Ini memastikan halaman tidak akan error meskipun backend belum punya endpoint detail
    fetch(`${API_URL}/api/berita`)
      .then(response => response.json())
      .then(res => {
        const dataBerita = res.data?.data || res.data || res;
        
        if (Array.isArray(dataBerita)) {
          // Cari berita yang id atau slug-nya sama dengan parameter di URL
          const foundBerita = dataBerita.find(
            (item) => String(item.slug) === String(slug) || String(item.id) === String(slug)
          );
          
          // Pastikan berita yang ditemukan valid dan memiliki judul
          if (foundBerita && foundBerita.judul) {
            setBerita(foundBerita);
          } else {
            setBerita(null); // Jika tidak valid, lempar ke halaman "Tidak Ditemukan"
          }
        } else {
          setBerita(null);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching detail berita:', error);
        setLoading(false);
      });
      
    // Scroll otomatis ke atas saat halaman dibuka
    window.scrollTo(0, 0);
  }, [slug, API_URL]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Tautan artikel berhasil disalin!");
  };

  // Fungsi pengaman agar tidak muncul "Invalid Date"
  const formatDateSafe = (dateString) => {
    if (!dateString) return 'Tanggal tidak diketahui';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Tanggal tidak valid';
    return date.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  };

  // 1. TAMPILAN SKELETON (SAAT LOADING)
  if (loading) {
    return (
      <div className="max-w-[800px] mx-auto px-6 py-16 animate-pulse bg-[#fbf9f5] min-h-screen">
        <div className="h-4 bg-[#e4e2de] w-32 rounded mb-8"></div>
        <div className="h-10 bg-[#e4e2de] w-full rounded mb-4"></div>
        <div className="h-10 bg-[#e4e2de] w-3/4 rounded mb-8"></div>
        <div className="h-64 md:h-[400px] w-full bg-[#e4e2de] rounded-2xl mb-10"></div>
        <div className="space-y-4">
          <div className="h-4 bg-[#e4e2de] w-full rounded"></div>
          <div className="h-4 bg-[#e4e2de] w-full rounded"></div>
          <div className="h-4 bg-[#e4e2de] w-5/6 rounded"></div>
        </div>
      </div>
    );
  }

  // 2. TAMPILAN ERROR (JIKA BERITA TIDAK ADA / URL SALAH)
  if (!berita) {
    return (
      <div className="max-w-[1200px] mx-auto px-6 py-32 text-center flex flex-col items-center bg-[#fbf9f5] min-h-screen">
        <div className="w-24 h-24 bg-[#e4e2de] rounded-full flex items-center justify-center mb-6">
          <FileEdit className="w-10 h-10 text-[#717973]" />
        </div>
        <h1 className="text-[32px] font-bold text-[#012d1d] mb-4">Berita Tidak Ditemukan</h1>
        <p className="text-[18px] text-[#414844] mb-8">Maaf, artikel yang Anda cari mungkin telah dihapus atau tautannya salah.</p>
        <button onClick={() => navigate(-1)} className="bg-[#012d1d] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#1b4332] transition-colors">
          Kembali ke Halaman Sebelumnya
        </button>
      </div>
    );
  }

  // 3. TAMPILAN UTAMA (KONTEN ARTIKEL BERHASIL DIMUAT)
  return (
    <div className="bg-[#fbf9f5] min-h-screen pb-20">
      
      {/* BREADCRUMB NAVIGASI */}
      <div className="border-b border-[#c1c8c2]/30 bg-white/50 backdrop-blur-sm sticky top-20 z-40">
        <div className="max-w-[800px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[14px] font-medium text-[#717973] overflow-x-auto whitespace-nowrap hide-scrollbar">
            <Link to="/" className="hover:text-[#012d1d] flex items-center gap-1"><Home className="w-4 h-4"/> Beranda</Link>
            <ChevronRight className="w-4 h-4 shrink-0" />
            <Link to="/berita" className="hover:text-[#012d1d]">Berita</Link>
            <ChevronRight className="w-4 h-4 shrink-0" />
            <span className="text-[#012d1d] truncate max-w-[150px] md:max-w-[300px]">{berita.judul}</span>
          </div>
          
          <button onClick={() => navigate(-1)} className="hidden md:flex items-center gap-1 text-[14px] font-bold text-[#012d1d] hover:text-[#3f6653] transition-colors">
            <ArrowLeft className="w-4 h-4" /> Kembali
          </button>
        </div>
      </div>

      <article className="max-w-[800px] mx-auto px-6 mt-10 md:mt-16">
        
        {/* HEADER ARTIKEL */}
        <header className="mb-10 text-center md:text-left">
          <div className="inline-flex items-center gap-1 bg-[#e4e2de] text-[#414844] px-3 py-1 rounded-md text-[12px] font-bold uppercase tracking-wider mb-6">
            <Tag className="w-3.5 h-3.5" /> Info Desa
          </div>
          
          <h1 className="text-[32px] md:text-[46px] leading-[1.2] font-extrabold text-[#012d1d] mb-6">
            {berita.judul}
          </h1>
          
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-8 text-[14px] text-[#717973] font-medium border-y border-[#c1c8c2]/30 py-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#835336]" />
              {formatDateSafe(berita.created_at)}
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-[#835336]" />
              Pemerintah Desa
            </div>
          </div>
        </header>

        {/* GAMBAR HERO */}
        <figure className="mb-12 relative rounded-2xl overflow-hidden shadow-lg border border-[#c1c8c2]/30 bg-[#e4e2de]">
          <img 
            src={berita.gambar ? `${API_URL}/storage/${berita.gambar}` : 'https://via.placeholder.com/1200x600?text=Berita+Desa'} 
            alt={berita.judul} 
            className="w-full h-auto max-h-[500px] object-cover"
            onError={(e) => {
              e.target.onerror = null; 
              e.target.src = 'https://via.placeholder.com/1200x600?text=Gambar+Tidak+Tersedia';
            }}
          />
        </figure>

        {/* ISI KONTEN */}
        <div 
          className="text-[#1b1c1a] text-[16px] md:text-[18px] leading-[1.8] md:leading-[2] tracking-normal
          [&>p]:mb-6 
          [&>h2]:text-[24px] [&>h2]:font-bold [&>h2]:text-[#012d1d] [&>h2]:mt-10 [&>h2]:mb-4
          [&>h3]:text-[20px] [&>h3]:font-bold [&>h3]:text-[#012d1d] [&>h3]:mt-8 [&>h3]:mb-3
          [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6 [&>ul>li]:mb-2
          [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-6 [&>ol>li]:mb-2
          [&>blockquote]:border-l-4 [&>blockquote]:border-[#012d1d] [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-[#414844] [&>blockquote]:bg-[#e4e2de]/30 [&>blockquote]:py-2 [&>blockquote]:my-6
          [&>img]:rounded-xl [&>img]:my-8 [&>img]:shadow-md
          [&>a]:text-[#003f63] [&>a]:underline [&>a]:font-semibold"
          dangerouslySetInnerHTML={{ __html: berita.isi_berita || '<p>Isi berita tidak tersedia.</p>' }} 
        />

        {/* FOOTER ARTIKEL (SHARE BUTTON) */}
        <footer className="mt-16 pt-8 border-t border-[#c1c8c2]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[15px] text-[#717973] font-medium">Bagikan informasi ini ke warga lainnya:</p>
          <button onClick={handleShare} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white border-2 border-[#e4e2de] text-[#012d1d] px-6 py-2.5 rounded-lg text-[14px] font-bold hover:bg-[#efeeea] hover:border-[#c1c8c2] transition-all shadow-sm active:scale-95">
            <Share2 className="w-4 h-4" /> Salin Tautan
          </button>
        </footer>

      </article>
    </div>
  );
}