import { Link, Outlet, useLocation } from 'react-router-dom';

export default function Layout() {
  const location = useLocation();

  // Fungsi kecil untuk mendeteksi menu mana yang sedang aktif
  const isActive = (path) => {
    return location.pathname === path ? "border-b-2 border-white pb-1 font-semibold" : "hover:text-[#a5d0b9] transition";
  };

  return (
    // Menggunakan warna latar belakang Cream (#fbf9f5) dan teks default On-Surface (#1b1c1a)
    <div className="min-h-screen flex flex-col bg-[#fbf9f5] text-[#1b1c1a] font-sans">
      
      {/* NAVBAR: Menggunakan warna Primary Deep Nature Green (#012d1d) */}
      <nav className="bg-[#012d1d] text-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            
            {/* Logo / Nama Desa */}
            <div className="text-2xl font-bold tracking-tight">
              <Link to="/">Desa Sukawangi</Link>
            </div>
            
            {/* Menu Navigasi */}
            <div className="hidden md:flex space-x-8 text-sm">
              <Link to="/" className={isActive('/')}>Home</Link>
              <Link to="/profil" className={isActive('/profil')}>Profil Desa</Link>
              <Link to="/pemerintahan" className={isActive('/pemerintahan')}>Pemerintahan</Link>
              <Link to="/pengaduan" className={isActive('/pengaduan')}>Pengaduan</Link>
              <Link to="/berita" className={isActive('/berita')}>Berita</Link>
              <Link to="/galeri" className={isActive('/galeri')}>Galeri</Link> {/* Menu baru */}
              <Link to="/kontak" className={isActive('/kontak')}>Kontak</Link>
            </div>

            {/* Tombol Call to Action */}
            <div className="hidden md:flex">
              <button className="bg-[#fbf9f5] text-[#012d1d] px-5 py-2 rounded-lg font-semibold hover:bg-[#e4e2de] transition shadow-sm">
                Layanan Mandiri
              </button>
            </div>
            
          </div>
        </div>
      </nav>

      {/* KONTEN HALAMAN */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* FOOTER */}
      <footer className="bg-[#012d1d] text-[#e4e2de] py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Desa Sukawangi</h3>
            <p className="text-sm leading-relaxed">
              Pemerintah Desa Sukawangi, Cianjur. Berdedikasi melayani masyarakat dengan transparan dan profesional.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Tautan Penting</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/profil" className="hover:text-white">Tentang Kami</Link></li>
              <li><Link to="/kebijakan" className="hover:text-white">Kebijakan Privasi</Link></li>
              <li><Link to="/syarat" className="hover:text-white">Syarat & Ketentuan</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Kontak</h3>
            <p className="text-sm mb-2">📍 Jl. Desa Sukawangi No. 1, Cianjur</p>
            <p className="text-sm">✉️ info@sukawangi.desa.id</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-8 pt-8 border-t border-[#1b4332] text-sm text-center">
          <p>© 2026 Pemerintah Desa Sukawangi, Cianjur. Seluruh Hak Cipta Dilindungi.</p>
        </div>
      </footer>
    </div>
  );
}