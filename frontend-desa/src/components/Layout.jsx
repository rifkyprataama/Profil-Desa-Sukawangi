import { Link, Outlet, useLocation } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';
import { 
  Menu, MapPin, Mail, Home, Info, Landmark, 
  Megaphone, Newspaper, Image, PhoneCall, ChevronRight
} from 'lucide-react'; 
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"; 
import { Toaster } from "@/components/ui/sonner";

export default function Layout() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path 
      ? "text-[#012d1d] font-bold border-b-2 border-[#012d1d] pb-1" 
      : "text-[#414844] hover:text-[#012d1d] font-medium transition-colors py-1";
  };

  const isMobileActive = (path) => {
    return location.pathname === path 
      ? "bg-[#012d1d] text-white font-bold shadow-md" 
      : "text-[#414844] hover:bg-[#efeeea] hover:text-[#012d1d] font-medium";
  };

  // Tautan gambar Logo Sugih Mukti Cianjur
  const logoCianjur = "/logo-cianjur.png";

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf9f5] text-[#1b1c1a] font-['Inter']">
      <ScrollToTop />
      
      {/* ================= NAVBAR (HEADER) ================= */}
      <nav className="sticky top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-[#c1c8c2]/40 shadow-sm transition-all duration-300">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex justify-between h-20 items-center">
            
            {/* REVISI: Logo Sugih Mukti Cianjur */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 flex items-center justify-center group-hover:scale-105 transition-transform">
                <img src={logoCianjur} alt="Logo Sugih Mukti Cianjur" className="w-full h-full object-contain drop-shadow-sm" />
              </div>
              <div className="flex flex-col">
                <span className="text-[20px] font-extrabold text-[#012d1d] leading-none tracking-tight group-hover:text-[#3f6653] transition-colors">
                  Desa Sukawangi
                </span>
                <span className="text-[11px] font-bold text-[#835336] uppercase tracking-wider mt-1">
                  Kabupaten Cianjur
                </span>
              </div>
            </Link>
            
            <div className="hidden lg:flex items-center space-x-6 text-[15px]">
              <Link to="/" className={isActive('/')}>Beranda</Link>
              <Link to="/profil" className={isActive('/profil')}>Profil</Link>
              <Link to="/pemerintahan" className={isActive('/pemerintahan')}>Pemerintahan</Link>
              <Link to="/pengaduan" className={isActive('/pengaduan')}>Pengaduan</Link>
              <Link to="/berita" className={isActive('/berita')}>Berita</Link>
              <Link to="/galeri" className={isActive('/galeri')}>Galeri</Link>
              <Link to="/kontak" className={isActive('/kontak')}>Kontak</Link>
            </div>

            <div className="hidden lg:flex">
              <Link to="/pengaduan" className="flex items-center gap-2 bg-[#012d1d] text-white px-5 py-2.5 rounded-lg text-[14px] font-bold hover:bg-[#1b4332] shadow-sm hover:shadow-md transition-all">
                Buat Pengaduan <Megaphone className="w-4 h-4" />
              </Link>
            </div>

            <div className="lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <button className="text-[#012d1d] bg-[#efeeea] flex items-center justify-center p-2.5 rounded-lg hover:bg-[#e4e2de] transition-colors">
                    <Menu className="h-6 w-6" />
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="bg-[#fbf9f5] border-l-[#c1c8c2]/30 w-[300px] p-0 flex flex-col">
                  
                  {/* REVISI: Logo di Menu Mobile */}
                  <div className="p-6 border-b border-[#c1c8c2]/30 flex items-center gap-3">
                    <div className="w-8 h-8 flex items-center justify-center">
                      <img src={logoCianjur} alt="Logo Cianjur" className="w-full h-full object-contain" />
                    </div>
                    <span className="text-[18px] font-extrabold text-[#012d1d]">Menu Desa</span>
                  </div>
                  
                  <div className="flex flex-col px-4 py-6 h-full overflow-y-auto gap-2 text-[15px]">
                    <SheetClose asChild><Link to="/" className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all ${isMobileActive('/')}`}><Home className="w-5 h-5"/> Beranda</Link></SheetClose>
                    <SheetClose asChild><Link to="/profil" className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all ${isMobileActive('/profil')} `}><Info className="w-5 h-5"/> Profil Desa</Link></SheetClose>
                    <SheetClose asChild><Link to="/pemerintahan" className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all ${isMobileActive('/pemerintahan')} `}><Landmark className="w-5 h-5"/> Pemerintahan</Link></SheetClose>
                    <SheetClose asChild><Link to="/pengaduan" className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all ${isMobileActive('/pengaduan')} `}><Megaphone className="w-5 h-5"/> Pengaduan</Link></SheetClose>
                    <SheetClose asChild><Link to="/berita" className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all ${isMobileActive('/berita')} `}><Newspaper className="w-5 h-5"/> Berita</Link></SheetClose>
                    <SheetClose asChild><Link to="/galeri" className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all ${isMobileActive('/galeri')} `}><Image className="w-5 h-5"/> Galeri</Link></SheetClose>
                    <SheetClose asChild><Link to="/kontak" className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all ${isMobileActive('/kontak')} `}><PhoneCall className="w-5 h-5"/> Kontak Pelayanan</Link></SheetClose>
                  </div>

                  <div className="p-6 border-t border-[#c1c8c2]/30 bg-white">
                    <SheetClose asChild>
                      <Link to="/pengaduan" className="w-full flex justify-center items-center gap-2 bg-[#012d1d] text-white px-4 py-3.5 rounded-xl font-bold shadow-md active:scale-95 transition-transform">
                        Buat Pengaduan <Megaphone className="w-4 h-4" />
                      </Link>
                    </SheetClose>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
            
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        <Outlet />
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="bg-[#012d1d] text-white pt-16 pb-8 mt-auto border-t-[6px] border-[#febe9b] relative overflow-hidden">
        {/* Ornamen Latar Belakang */}
        <Landmark className="absolute -bottom-10 -right-10 w-96 h-96 text-white/5 transform -rotate-12 pointer-events-none" />
        
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 relative z-10">
          
          <div className="flex flex-col gap-4">
            {/* REVISI: Logo di Footer */}
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-white/10 p-1.5 rounded-xl flex items-center justify-center">
                <img src={logoCianjur} alt="Logo Cianjur" className="w-full h-full object-contain drop-shadow-md" />
              </div>
              <h3 className="text-[22px] font-extrabold text-white leading-none">Desa Sukawangi</h3>
            </div>
            <p className="text-white/80 text-[14px] leading-relaxed pr-4">
              Website resmi Pemerintah Desa Sukawangi. Wadah digital untuk transparansi informasi, layanan masyarakat, dan pengaduan publik yang terintegrasi.
            </p>
          </div>

          <div className="flex flex-col gap-3 lg:pl-8">
            <h3 className="text-[16px] font-bold text-[#febe9b] mb-3 uppercase tracking-wider">Tautan Cepat</h3>
            <Link to="/profil" className="text-white/80 hover:text-white hover:translate-x-1 transition-all text-[15px] flex items-center gap-2"><ChevronRight className="w-4 h-4"/> Profil Desa</Link>
            <Link to="/pemerintahan" className="text-white/80 hover:text-white hover:translate-x-1 transition-all text-[15px] flex items-center gap-2"><ChevronRight className="w-4 h-4"/> Pemerintahan</Link>
            <Link to="/berita" className="text-white/80 hover:text-white hover:translate-x-1 transition-all text-[15px] flex items-center gap-2"><ChevronRight className="w-4 h-4"/> Kabar Desa</Link>
            <Link to="/galeri" className="text-white/80 hover:text-white hover:translate-x-1 transition-all text-[15px] flex items-center gap-2"><ChevronRight className="w-4 h-4"/> Galeri Foto</Link>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-[16px] font-bold text-[#febe9b] mb-3 uppercase tracking-wider">Sosial Media</h3>
            <a href="#" className="text-white/80 hover:text-white hover:translate-x-1 transition-all text-[15px] flex items-center gap-2"><ChevronRight className="w-4 h-4"/> Instagram Resmi</a>
            <a href="#" className="text-white/80 hover:text-white hover:translate-x-1 transition-all text-[15px] flex items-center gap-2"><ChevronRight className="w-4 h-4"/> Halaman Facebook</a>
            <a href="#" className="text-white/80 hover:text-white hover:translate-x-1 transition-all text-[15px] flex items-center gap-2"><ChevronRight className="w-4 h-4"/> Channel YouTube</a>
            <Link to="/pengaduan" className="text-white/80 hover:text-white hover:translate-x-1 transition-all text-[15px] flex items-center gap-2 mt-2"><Megaphone className="w-4 h-4 text-[#febe9b]"/> Buat Pengaduan</Link>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-[16px] font-bold text-[#febe9b] mb-2 uppercase tracking-wider">Kontak Pelayanan</h3>
            <div className="text-white/80 text-[14px] flex items-start gap-3">
              <MapPin className="w-5 h-5 shrink-0 mt-0.5 text-[#febe9b]" />
              <p className="leading-relaxed">Jl. Desa Sukawangi No. 1, Kec. Warungkondang, Kab. Cianjur</p>
            </div>
            <div className="text-white/80 text-[14px] flex items-center gap-3">
              <Mail className="w-5 h-5 shrink-0 text-[#febe9b]" />
              <p>pemdes@sukawangi.desa.id</p>
            </div>
            <div className="text-white/80 text-[14px] flex items-center gap-3">
              <PhoneCall className="w-5 h-5 shrink-0 text-[#febe9b]" />
              <p>Senin - Jumat (08.00 - 15.00)</p>
            </div>
          </div>

        </div>

        <div className="max-w-[1200px] mx-auto px-6 mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-white/60 text-[13px] relative z-10">
          <p>© 2026 Pemerintah Desa Sukawangi. Seluruh Hak Cipta Dilindungi.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Kebijakan Privasi</a>
            <a href="#" className="hover:text-white transition-colors">Syarat & Ketentuan</a>
          </div>
        </div>
      </footer>
      
      <Toaster position="top-right" richColors />
    </div>
  );
}