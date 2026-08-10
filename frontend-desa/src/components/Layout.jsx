import { Link, Outlet, useLocation } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';
import { Menu, MapPin, Mail } from 'lucide-react'; // Menggunakan ikon Lucide
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"; // Komponen Drawer Mobile
import { Toaster } from "@/components/ui/sonner"; // Komponen Global Alert

export default function Layout() {
  const location = useLocation();

  // Fungsi untuk mendeteksi menu mana yang sedang aktif
  const isActive = (path) => {
    return location.pathname === path 
      ? "text-[#012d1d] font-bold border-b-2 border-[#012d1d] pb-1" 
      : "text-[#414844] hover:text-[#012d1d] transition-colors py-1";
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf9f5] text-[#1b1c1a] font-['Inter']">
      
      {/* Pemicu agar layar selalu kembali ke atas saat pindah halaman */}
      <ScrollToTop />
      
      {/* NAVBAR: Menggunakan warna Surface (Krem) dengan efek blur kaca */}
      <nav className="sticky top-0 w-full z-50 bg-[#fbf9f5]/90 backdrop-blur-md border-b border-[#c1c8c2]/30 transition-all duration-200 ease-in-out">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex justify-between h-20 items-center">
            
            {/* Logo / Nama Desa */}
            <div className="text-[24px] font-semibold text-[#012d1d] tracking-tight">
              <Link to="/">Desa Sukawangi</Link>
            </div>
            
            {/* Menu Navigasi Desktop */}
            <div className="hidden md:flex space-x-6 text-[14px]">
              <Link to="/" className={isActive('/')}>Beranda</Link>
              <Link to="/profil" className={isActive('/profil')}>Profil Desa</Link>
              <Link to="/pemerintahan" className={isActive('/pemerintahan')}>Pemerintahan</Link>
              <Link to="/pengaduan" className={isActive('/pengaduan')}>Pengaduan</Link>
              <Link to="/berita" className={isActive('/berita')}>Berita</Link>
              <Link to="/galeri" className={isActive('/galeri')}>Galeri</Link>
              <Link to="/kontak" className={isActive('/kontak')}>Kontak</Link>
            </div>

            {/* Tombol Layanan Mandiri */}
            <div className="hidden md:flex">
              <button className="bg-[#012d1d] text-white px-4 py-2 rounded-lg text-[14px] font-semibold hover:bg-[#012d1d]/90 transition-colors shadow-sm">
                Layanan Mandiri
              </button>
            </div>

            {/* Menu Mobile dengan Shadcn Sheet (Laci Samping) */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <button className="text-[#012d1d] flex items-center justify-center p-2">
                    <Menu className="h-7 w-7" />
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="bg-[#fbf9f5] border-l-[#c1c8c2]/30 w-[300px]">
                  <div className="flex flex-col gap-6 mt-10 text-[16px]">
                    <Link to="/" className={isActive('/')}>Beranda</Link>
                    <Link to="/profil" className={isActive('/profil')}>Profil Desa</Link>
                    <Link to="/pemerintahan" className={isActive('/pemerintahan')}>Pemerintahan</Link>
                    <Link to="/pengaduan" className={isActive('/pengaduan')}>Pengaduan</Link>
                    <Link to="/berita" className={isActive('/berita')}>Berita</Link>
                    <Link to="/galeri" className={isActive('/galeri')}>Galeri</Link>
                    <Link to="/kontak" className={isActive('/kontak')}>Kontak</Link>
                    <button className="bg-[#012d1d] text-white px-4 py-3 rounded-lg font-semibold mt-4">
                      Layanan Mandiri
                    </button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
            
          </div>
        </div>
      </nav>

      {/* KONTEN HALAMAN */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* FOOTER: Menggunakan warna Primary Deep Nature Green (#012d1d) */}
      <footer className="bg-[#012d1d] text-white py-12 mt-20">
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Kolom Info Desa */}
          <div className="flex flex-col gap-4">
            <h3 className="text-[20px] font-semibold text-white">Desa Sukawangi</h3>
            <p className="text-white/80 text-[16px] max-w-xs leading-relaxed">
              Pusat informasi dan layanan digital resmi Pemerintah Desa. Membangun desa mandiri, transparan, dan sejahtera.
            </p>
          </div>
          
          {/* Kolom Tautan */}
          <div className="flex flex-col gap-3">
            <h3 className="text-[14px] font-semibold text-white mb-2">Tautan Penting</h3>
            <Link to="/profil" className="text-white/80 hover:text-white transition-opacity text-[16px]">Tentang Kami</Link>
            <Link to="/kebijakan" className="text-white/80 hover:text-white transition-opacity text-[16px]">Kebijakan Privasi</Link>
            <Link to="/peta-situs" className="text-white/80 hover:text-white transition-opacity text-[16px]">Peta Situs</Link>
          </div>
          
          {/* Kolom Kontak (Menggunakan Lucide Icons) */}
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
      
      {/* Elemen global untuk memunculkan Alert/Toast di seluruh web */}
      <Toaster position="top-right" richColors />
    </div>
  );
}