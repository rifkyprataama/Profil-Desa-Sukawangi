import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Megaphone, Info, Quote, Eye, Target, ArrowRight, 
  Tractor, Store, Mountain, Headset, FileEdit, 
  Newspaper, Calendar, ArrowRightCircle 
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";

export default function Beranda() {
  const [profilDesa, setProfilDesa] = useState(null);
  const [beritaTerbaru, setBeritaTerbaru] = useState([]);
  
  // State untuk mengontrol animasi loading
  const [loadingProfil, setLoadingProfil] = useState(true);
  const [loadingBerita, setLoadingBerita] = useState(true);

  // Menggunakan Environment Variable untuk URL API (agar aman saat di-hosting)
  // Fallback ke localhost:8000 jika .env belum dibuat
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

  useEffect(() => {
    // 1. Fetch Profil
    fetch(`${API_URL}/api/profil-desa`)
      .then(response => response.json())
      .then(res => {
        setProfilDesa(res.data || res);
        setLoadingProfil(false);
      })
      .catch(error => {
        console.error('Error Profil:', error);
        setLoadingProfil(false);
      });

    // 2. Fetch Berita
    fetch(`${API_URL}/api/berita`)
      .then(response => response.json())
      .then(res => {
        const dataBerita = res.data?.data || res.data || res;
        if (Array.isArray(dataBerita)) {
          setBeritaTerbaru(dataBerita.slice(0, 3));
        }
        setLoadingBerita(false); // Matikan loading saat data selesai diambil
      })
      .catch(error => {
        console.error('Error Berita:', error);
        setLoadingBerita(false); // Matikan loading jika terjadi error
      });
  }, [API_URL]);

  return (
    <div className="bg-[#fbf9f5] text-[#1b1c1a] font-['Inter'] flex flex-col">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-[600px] md:h-[700px] w-full flex items-center justify-center">
        <div className="absolute inset-0 z-0 bg-[#012d1d]/30">
          <div className="bg-cover bg-center w-full h-full object-cover" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1920&auto=format&fit=crop')` }}></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#fbf9f5] via-[#fbf9f5]/50 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 text-center flex flex-col items-center mt-16">
          <h1 className="text-[36px] leading-[44px] md:text-[56px] md:leading-[64px] font-extrabold tracking-tight text-[#012d1d] mb-6 drop-shadow-sm">
            Selamat Datang di<br />Desa Sukawangi
          </h1>
          <p className="text-[18px] leading-[28px] md:text-[20px] md:leading-[32px] text-[#274e3d] font-medium max-w-2xl mb-10">
            Harmoni kehidupan agraris dengan tata kelola digital yang modern, transparan, dan responsif terhadap masyarakat.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/pengaduan" className="bg-[#012d1d] text-white text-[15px] font-semibold px-8 py-3.5 rounded-lg hover:bg-[#012d1d]/90 transition-colors shadow-lg flex items-center justify-center gap-2">
              <Megaphone className="w-5 h-5" /> Layanan Pengaduan
            </Link>
            <Link to="/profil" className="bg-white text-[#012d1d] text-[15px] font-semibold px-8 py-3.5 rounded-lg border border-[#c1c8c2] hover:bg-[#efeeea] transition-colors shadow-sm flex items-center justify-center gap-2">
              <Info className="w-5 h-5" /> Profil Desa
            </Link>
          </div>
        </div>
      </section>

      {/* 2. SAMBUTAN KEPALA DESA */}
      <section className="py-20 bg-[#fbf9f5]">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
          {loadingProfil ? (
            <div className="w-full flex flex-col md:flex-row items-center gap-12 animate-pulse">
              <div className="md:w-1/3 flex justify-center"><div className="w-64 h-64 md:w-80 md:h-80 bg-[#e4e2de] rounded-full"></div></div>
              <div className="md:w-2/3 text-center md:text-left w-full space-y-4">
                <div className="h-6 bg-[#e4e2de] w-48 rounded mx-auto md:mx-0"></div>
                <div className="h-8 bg-[#e4e2de] w-3/4 rounded mx-auto md:mx-0 mb-6"></div>
                <div className="space-y-3"><div className="h-4 bg-[#e4e2de] w-full rounded"></div><div className="h-4 bg-[#e4e2de] w-full rounded"></div></div>
              </div>
            </div>
          ) : profilDesa ? (
            <>
              <div className="md:w-1/3 flex justify-center">
                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-[#efeeea] shadow-sm">
                  <img 
                    className="object-cover w-full h-full bg-[#e4e2de]" 
                    src={profilDesa.foto_kepala_desa ? `${API_URL}/storage/${profilDesa.foto_kepala_desa}` : 'https://via.placeholder.com/400'} 
                    alt="Kepala Desa"
                    loading="lazy"
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/400?text=Foto+Tidak+Tersedia'; }}
                  />
                </div>
              </div>
              <div className="md:w-2/3 text-center md:text-left">
                <div className="flex items-center gap-2 text-[#835336] mb-2 justify-center md:justify-start">
                  <Quote className="w-6 h-6" />
                  <span className="text-[14px] font-bold uppercase tracking-wider">Sambutan Kepala Desa</span>
                </div>
                <h2 className="text-[28px] font-bold text-[#012d1d] mb-4">Membangun Desa Bersama</h2>
                <p className="text-[18px] text-[#414844] mb-8 leading-relaxed italic">"{profilDesa.sambutan}"</p>
                <div className="inline-block border-l-4 border-[#012d1d] pl-4 text-left">
                  <p className="text-[16px] text-[#012d1d] font-bold">{profilDesa.nama_kepala_desa}</p>
                  <p className="text-[14px] text-[#717973] font-medium">Kepala Desa Sukawangi</p>
                </div>
              </div>
            </>
          ) : (
            <div className="w-full text-center py-10 text-[#414844]">Gagal memuat profil desa.</div>
          )}
        </div>
      </section>

      {/* 3. VISI & MISI BENTO GRID */}
      <section className="py-20 bg-[#f5f3ef]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-[28px] font-bold text-[#012d1d] mb-2">Visi & Misi</h2>
            <p className="text-[16px] text-[#414844]">Arah pembangunan Desa Sukawangi</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#fbf9f5] rounded-xl p-10 md:p-12 border border-[#c1c8c2]/40 shadow-sm md:col-span-2 flex flex-col justify-center transition-transform hover:-translate-y-1 hover:shadow-md duration-300">
              <div className="w-14 h-14 rounded-full bg-[#1b4332]/10 flex items-center justify-center mb-6 text-[#012d1d]">
                <Eye className="w-7 h-7" />
              </div>
              <h3 className="text-[20px] font-bold text-[#012d1d] mb-4 uppercase tracking-wide">Visi</h3>
              {loadingProfil ? (
                <div className="h-8 bg-[#e4e2de] w-3/4 rounded animate-pulse"></div>
              ) : (
                <p className="text-[28px] md:text-[32px] font-bold italic text-[#012d1d]/90 leading-snug">
                  "{profilDesa ? profilDesa.visi : 'Visi belum tersedia'}"
                </p>
              )}
            </div>
            <div className="flex flex-col gap-6">
              <div className="bg-[#fbf9f5] rounded-xl p-8 border border-[#c1c8c2]/40 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md duration-300 h-full flex flex-col">
                <div className="flex items-start gap-3 mb-5">
                  <div className="w-10 h-10 rounded-full bg-[#febe9b]/30 flex items-center justify-center shrink-0 text-[#835336]">
                    <Target className="w-5 h-5" />
                  </div>
                  <h4 className="text-[16px] font-bold text-[#012d1d] mt-2 uppercase tracking-wide">Misi Utama</h4>
                </div>
                {loadingProfil ? (
                   <div className="space-y-3 animate-pulse ml-[52px]">
                      <div className="h-4 bg-[#e4e2de] w-full rounded"></div>
                      <div className="h-4 bg-[#e4e2de] w-full rounded"></div>
                      <div className="h-4 bg-[#e4e2de] w-2/3 rounded"></div>
                   </div>
                ) : profilDesa ? (
                  <div className="text-[15px] text-[#414844] prose prose-sm max-w-none ml-[52px] line-clamp-6 flex-grow" dangerouslySetInnerHTML={{ __html: profilDesa.misi }} />
                ) : (
                  <p className="text-[15px] text-[#414844] ml-[52px]">Misi belum tersedia</p>
                )}
                <Link to="/profil" className="text-[#012d1d] font-semibold text-[14px] mt-6 ml-[52px] flex items-center gap-1 group">
                  Lihat Detail <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. KEKAYAAN & POTENSI DESA */}
      <section className="py-20 bg-[#fbf9f5]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-[28px] font-bold text-[#012d1d] mb-2">Potensi Unggulan</h2>
              <p className="text-[16px] text-[#414844]">Kekayaan alam dan produk lokal desa</p>
            </div>
            <Link to="/profil" className="hidden md:flex items-center gap-1 text-[14px] font-semibold text-[#012d1d] hover:text-[#1b4332] transition-colors group">
              Telusuri <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center p-10 border border-[#c1c8c2]/40 rounded-xl hover:bg-[#1b4332]/5 transition-all duration-300 hover:shadow-md cursor-pointer group">
              <div className="w-16 h-16 rounded-full bg-[#1b4332]/10 flex items-center justify-center text-[#012d1d] mb-5 group-hover:scale-110 transition-transform"><Tractor className="w-8 h-8"/></div>
              <h3 className="text-[18px] font-bold text-[#012d1d] mb-3">Pertanian Padi Organik</h3>
              <p className="text-[15px] text-[#414844] leading-relaxed">Menghasilkan beras kualitas premium dengan sistem irigasi alami pegunungan.</p>
            </div>
            <div className="flex flex-col items-center text-center p-10 border border-[#c1c8c2]/40 rounded-xl hover:bg-[#835336]/5 transition-all duration-300 hover:shadow-md cursor-pointer group">
              <div className="w-16 h-16 rounded-full bg-[#febe9b]/30 flex items-center justify-center text-[#835336] mb-5 group-hover:scale-110 transition-transform"><Store className="w-8 h-8"/></div>
              <h3 className="text-[18px] font-bold text-[#835336] mb-3">UMKM Kripik Singkong</h3>
              <p className="text-[15px] text-[#414844] leading-relaxed">Pusat produksi kripik lokal yang memberdayakan ekonomi warga desa secara mandiri.</p>
            </div>
            <div className="flex flex-col items-center text-center p-10 border border-[#c1c8c2]/40 rounded-xl hover:bg-[#003f63]/5 transition-all duration-300 hover:shadow-md cursor-pointer group">
              <div className="w-16 h-16 rounded-full bg-[#cde5ff] flex items-center justify-center text-[#002842] mb-5 group-hover:scale-110 transition-transform"><Mountain className="w-8 h-8"/></div>
              <h3 className="text-[18px] font-bold text-[#002842] mb-3">Wisata Alam Curug</h3>
              <p className="text-[15px] text-[#414844] leading-relaxed">Potensi wisata air terjun asri yang dikelola langsung oleh unit usaha BUMDes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION */}
      <section className="py-12 bg-[#fbf9f5]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="bg-[#012d1d] text-white rounded-2xl p-10 md:p-14 flex flex-col md:flex-row items-center justify-between shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 opacity-10 transform translate-x-1/4 -translate-y-1/4"><Headset className="w-64 h-64" /></div>
            <div className="mb-8 md:mb-0 md:mr-10 relative z-10 text-center md:text-left">
              <h2 className="text-[28px] font-bold mb-4 flex items-center justify-center md:justify-start gap-3">
                Layanan Pengaduan Warga
              </h2>
              <p className="text-[16px] text-white/80 max-w-2xl leading-relaxed">Ada infrastruktur rusak, masalah pelayanan, atau kejadian darurat di lingkungan Anda? Laporkan segera secara online agar ditindaklanjuti.</p>
            </div>
            <Link to="/pengaduan" className="relative z-10 bg-[#febe9b] text-[#331200] text-[15px] font-bold px-8 py-4 rounded-lg hover:bg-[#f8b895] hover:scale-105 transition-all shadow-md whitespace-nowrap flex items-center gap-2">
              <FileEdit className="w-5 h-5" /> Buat Laporan Baru
            </Link>
          </div>
        </div>
      </section>

      {/* 6. KABAR DESA TERKINI */}
      <section className="py-20 bg-[#f5f3ef]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div><h2 className="text-[28px] font-bold text-[#012d1d] mb-2">Kabar Desa Terkini</h2><p className="text-[16px] text-[#414844]">Update informasi dari balai desa</p></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {loadingBerita ? (
              /* SKELETON BERITA */
              [1, 2, 3].map((item) => (
                <div key={item} className="bg-[#fbf9f5] rounded-xl border border-[#c1c8c2]/40 p-5 h-[400px] flex flex-col gap-4 animate-pulse">
                  <div className="w-full h-48 bg-[#e4e2de] rounded-lg"></div>
                  <div className="w-1/3 h-4 bg-[#e4e2de] rounded"></div>
                  <div className="w-full h-6 bg-[#e4e2de] rounded mt-2"></div>
                  <div className="w-5/6 h-6 bg-[#e4e2de] rounded"></div>
                  <div className="mt-auto w-full h-4 bg-[#e4e2de] rounded"></div>
                </div>
              ))
            ) : beritaTerbaru.length > 0 ? (
              beritaTerbaru.map((item, index) => (
                <Dialog key={index}>
                  
                  {/* TRIGGER (KARTU BERITA) */}
                  <DialogTrigger asChild>
                    <div className="bg-[#fbf9f5] rounded-xl overflow-hidden border border-[#c1c8c2]/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group transform hover:-translate-y-2 cursor-pointer text-left h-full">
                      <div className="h-52 w-full overflow-hidden relative shrink-0">
                        {/* PENANGANAN GAMBAR LAZY LOAD & ONERROR */}
                        <img 
                          src={item.gambar ? `${API_URL}/storage/${item.gambar}` : 'https://via.placeholder.com/400x300?text=Berita'} 
                          alt={item.judul} 
                          loading="lazy"
                          onError={(e) => {
                            e.target.onerror = null; 
                            e.target.src = 'https://via.placeholder.com/400x300?text=Gambar+Tidak+Tersedia';
                          }}
                          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 ease-in-out bg-[#e4e2de]" 
                        />
                        <div className="absolute top-4 right-4 bg-[#fbf9f5]/95 backdrop-blur text-[#012d1d] text-[12px] font-bold px-3 py-1.5 rounded-md shadow-sm flex items-center gap-1">
                          <Newspaper className="w-4 h-4" /> Info Desa
                        </div>
                      </div>
                      <div className="p-7 flex-grow flex flex-col">
                        <div className="flex items-center gap-2 text-[#717973] mb-4">
                          <Calendar className="w-4 h-4" />
                          <p className="text-[13px] font-semibold uppercase tracking-wider">{new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                        </div>
                        <h3 className="text-[20px] leading-snug font-bold text-[#012d1d] mb-4 line-clamp-2 group-hover:text-[#3f6653] transition-colors">{item.judul}</h3>
                        <div className="text-[15px] text-[#414844] line-clamp-3 mb-6 prose prose-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: item.isi_berita }} />
                        <div className="mt-auto pt-5 border-t border-[#e4e2de] flex justify-between items-center text-[#012d1d] font-bold text-[14px]">
                          <span className="group-hover:text-[#3f6653] transition-colors">Baca Cepat</span>
                          <ArrowRightCircle className="w-5 h-5 transform group-hover:translate-x-2 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </DialogTrigger>
                  
                  {/* KONTEN POPUP (UI/UX PREMIUM) */}
                  <DialogContent className="max-w-[750px] w-[95vw] max-h-[85vh] bg-[#fbf9f5] p-0 overflow-hidden flex flex-col rounded-2xl shadow-2xl border-0">
                    
                    {/* 1. AREA KONTEN (BISA DI-SCROLL) */}
                    <div className="overflow-y-auto flex-grow relative">
                      
                      {/* Gambar Cover Full Width */}
                      <div className="relative w-full h-56 md:h-72 bg-[#e4e2de] shrink-0">
                        <img 
                          src={item.gambar ? `${API_URL}/storage/${item.gambar}` : 'https://via.placeholder.com/800x400?text=Berita'} 
                          alt={item.judul} 
                          loading="lazy"
                          onError={(e) => {
                            e.target.onerror = null; 
                            e.target.src = 'https://via.placeholder.com/800x400?text=Gambar+Tidak+Tersedia';
                          }}
                          className="object-cover w-full h-full" 
                        />
                        {/* Label Kategori */}
                        <div className="absolute top-5 left-5 bg-white/95 backdrop-blur text-[#012d1d] text-[12px] font-bold px-3 py-1.5 rounded-md shadow-sm flex items-center gap-1">
                          <Newspaper className="w-4 h-4" /> Info Desa
                        </div>
                        {/* Latar putih transparan di pojok kanan atas agar tombol [X] bawaan shadcn tetap terlihat jelas */}
                        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/70 to-transparent pointer-events-none"></div>
                      </div>

                      {/* Teks & Judul Berita */}
                      <div className="p-6 md:p-8 pt-6">
                        <DialogHeader>
                          <div className="flex items-center gap-2 text-[#717973] mb-3">
                            <Calendar className="w-4 h-4" />
                            <p className="text-[13px] font-bold uppercase tracking-wider">
                              {new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </p>
                          </div>
                          <DialogTitle className="text-[24px] md:text-[32px] font-extrabold text-[#012d1d] leading-tight mb-2 text-left">
                            {item.judul}
                          </DialogTitle>
                        </DialogHeader>
                        
                        <div className="mt-6 prose prose-sm md:prose-base text-[#414844] max-w-none leading-relaxed md:leading-loose text-left" dangerouslySetInnerHTML={{ __html: item.isi_berita }} />
                      </div>
                    </div>
                    
                    {/* 2. AREA FOOTER (FIXED / SELALU MENEMPEL DI BAWAH) */}
                    <div className="p-5 md:px-8 border-t border-[#c1c8c2]/40 bg-white shrink-0 flex justify-end shadow-[0_-10px_30px_rgba(0,0,0,0.03)] z-10">
                      <DialogClose asChild>
                        <Link to={`/berita/${item.slug || item.id}`} className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-[#012d1d] text-white px-8 py-3.5 rounded-xl text-[15px] font-bold hover:bg-[#1b4332] active:scale-95 transition-all shadow-md">
                          Baca Artikel Penuh <ArrowRight className="w-5 h-5" />
                        </Link>
                      </DialogClose>
                    </div>

                  </DialogContent>
                  
                </Dialog>
              ))
            ) : (
              <div className="col-span-3 text-center py-16 bg-[#fbf9f5] rounded-xl border border-[#c1c8c2]/40 shadow-sm flex flex-col items-center justify-center">
                 <Newspaper className="w-12 h-12 text-[#c1c8c2] mb-4" />
                <p className="text-[#414844] text-[18px] font-medium">Belum ada kabar berita terbaru saat ini.</p>
              </div>
            )}
          </div>

          <div className="mt-12 text-center">
            <Link to="/berita" className="inline-flex items-center justify-center gap-2 bg-white text-[15px] font-bold border-2 border-[#e4e2de] text-[#012d1d] px-8 py-3.5 rounded-lg hover:bg-[#efeeea] hover:border-[#c1c8c2] transition-all shadow-sm group">
              Lihat Semua Berita <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}