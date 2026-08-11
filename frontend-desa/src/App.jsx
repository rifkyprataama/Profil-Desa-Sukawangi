import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Beranda from './pages/Beranda';
import Profil from './pages/Profil';
import Pemerintahan from './pages/Pemerintahan';
import Pengaduan from './pages/Pengaduan';
import Berita from './pages/Berita';
import BeritaDetail from './pages/BeritaDetail'; // <-- 1. Import file yang baru dibuat
import Galeri from './pages/Galeri';
import Kontak from './pages/Kontak';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Beranda />} />
          <Route path="profil" element={<Profil />} />
          <Route path="pemerintahan" element={<Pemerintahan />} />
          <Route path="pengaduan" element={<Pengaduan />} />
          <Route path="berita" element={<Berita />} />
          
          {/* 2. Tambahkan rute dinamis untuk detail berita di sini */}
          <Route path="berita/:slug" element={<BeritaDetail />} /> 
          
          <Route path="galeri" element={<Galeri />} />
          <Route path="kontak" element={<Kontak />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;