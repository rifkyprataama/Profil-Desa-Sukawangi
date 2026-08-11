import { Link, Outlet, useLocation } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';
// Penambahan Ikon untuk menu Mobile agar lebih intuitif
import { Menu, MapPin, Mail, Home, Info, Landmark, Megaphone, Newspaper, Image, PhoneCall } from 'lucide-react'; 
// Menambahkan SheetClose untuk menutup laci otomatis
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"; 
import { Toaster } from "@/components/ui/sonner";

export default function Layout() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path 
      ? "text-[#012d1d] font-bold border-b-2 border-[#012d1d] pb-1" 
      : "text-[#414844] hover:text-[#012d1d] transition-colors py-1";
  };

  // Fungsi untuk menu mobile agar lebih dinamis
  const isMobileActive = (path) => {
    return location.pathname === path 
      ? "bg-[#012d1d]/10 text-[#012d1d] font-bold" 
      : "text-[#414844] hover:bg-[#e4e2de] hover:text-[#012d1d]";
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf9f5] text-[#1b1c1a] font-['Inter']">
      <ScrollToTop />
      
      <nav className="sticky top-0 w-full z-50 bg-[#fbf9f5]/90 backdrop-blur-md border-b border-[#c1c8c2]/30 transition-all duration-200 ease-in-out">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex justify-between h-20 items-center">
            
            <div className="text-[24px] font-semibold text-[#012d1d] tracking-tight">
              <Link to="/">Desa Sukawangi</Link>
            </div>
            
            <div className="hidden md:flex space-x-6 text-[14px]">
              <Link to="/" className={isActive('/')}>Beranda</Link>
              <Link to="/profil" className={isActive('/profil')}>Profil Desa</Link>
              <Link to="/pemerintahan" className={isActive('/pemerintahan')}>Pemerintahan</Link>
              <Link to="/pengaduan" className={isActive('/pengaduan')}>Pengaduan</Link>
              <Link to="/berita" className={isActive('/berita')}>Berita</Link>
              <Link to="/galeri" className={isActive('/galeri')}>Galeri</Link>
              <Link to="/kontak" className={isActive('/kontak')}>Kontak</Link>
            </div>

            <div className="hidden md:flex">
              <button className="bg-[#012d1d] text-white px-4 py-2 rounded-lg text-[14px] font-semibold hover:bg-[#012d1d]/90 transition-colors shadow-sm">
                Layanan Mandiri
              </button>
            </div>

            {/* Perbaikan UX Menu Mobile */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <button className="text-[#012d1d] flex items-center justify-center p-2 rounded-md hover:bg-[#012d1d]/5">
                    <Menu className="h-7 w-7" />
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="bg-[#fbf9f5] border-l-[#c1c8c2]/30 w-[300px] p-0">
                  <div className="flex flex-col px-4 py-8 h-full overflow-y-auto">
                    <h3 className="text-[18px] font-bold text-[#012d1d] mb-6 px-4">Menu Navigasi</h3>
                    
                    {/* SheetClose membungkus Link agar laci langsung menutup saat diklik */}
                    <div className="flex flex-col gap-2 text-[15px]">
                      <SheetClose asChild><Link to="/" className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${isMobileActive('/')}`}><Home className="w-5 h-5"/> Beranda</Link></SheetClose>
                      <SheetClose asChild><Link to="/profil" className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${isMobileActive('/profil')} `}><Info className="w-5 h-5"/> Profil Desa</Link></SheetClose>
                      <SheetClose asChild><Link to="/pemerintahan" className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${isMobileActive('/pemerintahan')} `}><Landmark className="w-5 h-5"/> Pemerintahan</Link></SheetClose>
                      <SheetClose asChild><Link to="/pengaduan" className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${isMobileActive('/pengaduan')} `}><Megaphone className="w-5 h-5"/> Pengaduan</Link></SheetClose>
                      <SheetClose asChild><Link to="/berita" className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${isMobileActive('/berita')} `}><Newspaper className="w-5 h-5"/> Berita</Link></SheetClose>
                      <SheetClose asChild><Link to="/galeri" className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${isMobileActive('/galeri')} `}><Image className="w-5 h-5"/> Galeri</Link></SheetClose>
                      <SheetClose asChild><Link to="/kontak" className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${isMobileActive('/kontak')} `}><PhoneCall className="w-5 h-5"/> Kontak</Link></SheetClose>
                    </div>

                    <div className="mt-auto px-4 pt-6 pb-4">
                      <button className="w-full bg-[#012d1d] text-white px-4 py-3.5 rounded-xl font-semibold shadow-md active:scale-95 transition-transform">
                        Layanan Mandiri
                      </button>
                    </div>
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

      <footer className="bg-[#012d1d] text-white py-12 mt-20">
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col gap-4">
            <h3 className="text-[20px] font-semibold text-white">Desa Sukawangi</h3>
            <p className="text-white/80 text-[16px] max-w-xs leading-relaxed">
              Pusat informasi dan layanan digital resmi Pemerintah Desa. Membangun desa mandiri, transparan, dan sejahtera.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="text-[14px] font-semibold text-white mb-2">Tautan Penting</h3>
            <Link to="/profil" className="text-white/80 hover:text-white transition-opacity text-[16px]">Tentang Kami</Link>
            <Link to="/kebijakan" className="text-white/80 hover:text-white transition-opacity text-[16px]">Kebijakan Privasi</Link>
            <Link to="/peta-situs" className="text-white/80 hover:text-white transition-opacity text-[16px]">Peta Situs</Link>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="text-[14px] font-semibold text-white mb-3">Kontak</h3>
            <div className="text-white/80 text-[16px] flex items-start gap-2">
              <MapPin className="w-5 h-5 shrink-0" />
              <p>Jl. Desa Sukawangi No. 1</p>
            </div>
            <div className="text-white/80 text-[16px] flex items-center gap-2 mt-1">
              <Mail className="w-5 h-5 shrink-0" />
              <p>info@sukawangi.desa.id</p>
            </div>
          </div>
        </div>
        <div className="max-w-[1200px] mx-auto px-6 mt-8 pt-8 border-t border-white/20 text-center text-white/60 text-sm">
          <p>© 2026 Pemerintah Desa Sukawangi, Cianjur. Seluruh Hak Cipta Dilindungi.</p>
        </div>
      </footer>
      <Toaster position="top-right" richColors />
    </div>
  );
}