import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Beranda from './pages/Beranda';
import Profil from './pages/Profil';
import Pemerintahan from './pages/Pemerintahan';
import Pengaduan from './pages/Pengaduan';
import Berita from './pages/Berita';
import Galeri from './pages/Galeri';
import Kontak from './pages/Kontak'; // Impor Kontak

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
          <Route path="galeri" element={<Galeri />} />
          <Route path="kontak" element={<Kontak />} /> {/* Rute Kontak */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;