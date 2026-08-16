import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  History, Target, Eye, MapPin, Map, Users, AreaChart, 
  Compass, BookOpen, HeartPulse, Building2, Landmark,
  ArrowRight, PhoneCall, Megaphone, Home
} from 'lucide-react';

export default function Profil() {
  const [profilDesa, setProfilDesa] = useState(null);
  const [aparaturDesa, setAparaturDesa] = useState([]); // TAMBAHAN: State untuk aparatur
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

  useEffect(() => {
    window.scrollTo(0, 0);

    // TAMBAHAN: Mengambil data Profil dan Aparatur secara bersamaan
    Promise.all([
      fetch(`${API_URL}/api/profil-desa`).then(res => res.json()),
      fetch(`${API_URL}/api/aparatur`).then(res => res.json())
    ])
    .then(([resProfil, resAparatur]) => {
      setProfilDesa(resProfil.data || resProfil);
      
      // Memasukkan data aparatur jika berhasil diambil
      if (resAparatur.success) {
        setAparaturDesa(resAparatur.data);
      }
      
      setLoading(false);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      setLoading(false);
    });
  }, [API_URL]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 140;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Menghitung persentase penduduk secara dinamis (mencegah error jika data kosong)
  const persenLaki = profilDesa?.total_penduduk ? Math.round((profilDesa.penduduk_laki_laki / profilDesa.total_penduduk) * 100) : 52;
  const persenPerempuan = profilDesa?.total_penduduk ? Math.round((profilDesa.penduduk_perempuan / profilDesa.total_penduduk) * 100) : 48;

  return (
    <div className="bg-[#fbf9f5] text-[#1b1c1a] font-['Inter'] flex flex-col min-h-screen relative">
      
      {/* 1. HERO BANNER */}
      <section className="relative h-[400px] md:h-[500px] w-full flex items-center justify-center mt-0">
        <div className="absolute inset-0 z-0 bg-[#012d1d]/60">
          <img 
            src="https://images.unsplash.com/photo-1593409951662-8e7c10b067d3?q=80&w=1920&auto=format&fit=crop" 
            alt="Pemandangan Desa" 
            className="w-full h-full object-cover mix-blend-overlay"
          />
        </div>
        <div className="relative z-10 text-center px-6 mt-10">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-[13px] font-bold uppercase tracking-widest mb-6 border border-white/30 shadow-sm">
            <MapPin className="w-4 h-4" /> Mengenal Lebih Dekat
          </div>
          <h1 className="text-[40px] md:text-[56px] font-extrabold text-white leading-tight drop-shadow-md">
            Profil Desa {profilDesa?.nama_desa || 'Sukawangi'}
          </h1>
        </div>
      </section>

      {/* SUB-NAVIGASI */}
      <div className="sticky top-[80px] z-40 bg-white/80 backdrop-blur-md border-b border-[#c1c8c2]/50 shadow-sm">
        <div className="max-w-[1200px] mx-auto px-6 py-4 flex gap-8 overflow-x-auto hide-scrollbar">
          <button onClick={() => scrollToSection('sejarah')} className="text-[14px] md:text-[15px] font-bold text-[#414844] hover:text-[#012d1d] whitespace-nowrap transition-colors">Sejarah & Geografis</button>
          <button onClick={() => scrollToSection('demografi')} className="text-[14px] md:text-[15px] font-bold text-[#414844] hover:text-[#012d1d] whitespace-nowrap transition-colors">Data Demografi</button>
          <button onClick={() => scrollToSection('visimisi')} className="text-[14px] md:text-[15px] font-bold text-[#414844] hover:text-[#012d1d] whitespace-nowrap transition-colors">Visi & Misi</button>
          <button onClick={() => scrollToSection('aparatur')} className="text-[14px] md:text-[15px] font-bold text-[#414844] hover:text-[#012d1d] whitespace-nowrap transition-colors">Aparatur Desa</button>
          <button onClick={() => scrollToSection('peta')} className="text-[14px] md:text-[15px] font-bold text-[#414844] hover:text-[#012d1d] whitespace-nowrap transition-colors">Peta Lokasi</button>
        </div>
      </div>

      {loading ? (
        <div className="max-w-[1200px] mx-auto px-6 py-20 w-full animate-pulse">
          <div className="h-10 bg-[#e4e2de] w-1/3 rounded mb-8"></div>
          <div className="space-y-4 mb-16">
            <div className="h-4 bg-[#e4e2de] w-full rounded"></div>
            <div className="h-4 bg-[#e4e2de] w-full rounded"></div>
          </div>
        </div>
      ) : profilDesa ? (
        <>
          {/* 2. SEJARAH & GEOGRAFIS */}
          <section id="sejarah" className="py-20 scroll-mt-20">
            <div className="max-w-[1200px] mx-auto px-6">
              <div className="flex flex-col lg:flex-row gap-16 items-start">
                
                <div className="lg:w-7/12">
                  <div className="flex items-center gap-3 text-[#835336] mb-4">
                    <History className="w-6 h-6" />
                    <h2 className="text-[20px] font-bold uppercase tracking-wider">Sejarah Desa</h2>
                  </div>
                  <h3 className="text-[32px] md:text-[40px] font-bold text-[#012d1d] mb-6 leading-tight">
                    Jejak Langkah & Perkembangan Desa {profilDesa.nama_desa}
                  </h3>
                  
                  <div className="text-[#414844] text-[16px] md:text-[18px] leading-[1.8] [&>p]:mb-6 [&>strong]:text-[#012d1d] [&>strong]:font-bold"
                    dangerouslySetInnerHTML={{ __html: profilDesa.sejarah }} 
                  />
                </div>

                <div className="lg:w-5/12 w-full flex flex-col gap-6">
                  {/* DATA BATAS WILAYAH DINAMIS */}
                  <div className="bg-[#1b4332] text-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
                    <Map className="absolute -bottom-4 -right-4 w-32 h-32 opacity-10" />
                    <h4 className="text-[20px] font-bold mb-6 flex items-center gap-2"><Compass className="w-6 h-6 text-[#febe9b]" /> Batas Wilayah</h4>
                    <div className="space-y-4 relative z-10">
                      <div className="flex justify-between border-b border-white/20 pb-3"><span className="text-white/70">Sebelah Utara</span><span className="font-bold">{profilDesa.batas_utara || '-'}</span></div>
                      <div className="flex justify-between border-b border-white/20 pb-3"><span className="text-white/70">Sebelah Selatan</span><span className="font-bold">{profilDesa.batas_selatan || '-'}</span></div>
                      <div className="flex justify-between border-b border-white/20 pb-3"><span className="text-white/70">Sebelah Timur</span><span className="font-bold">{profilDesa.batas_timur || '-'}</span></div>
                      <div className="flex justify-between"><span className="text-white/70">Sebelah Barat</span><span className="font-bold">{profilDesa.batas_barat || '-'}</span></div>
                    </div>
                  </div>

                  {/* DATA LUAS & DUSUN DINAMIS */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white border border-[#c1c8c2]/50 p-5 rounded-2xl shadow-sm text-center flex flex-col items-center hover:border-[#835336] transition-colors">
                      <AreaChart className="w-8 h-8 text-[#835336] mb-2" />
                      <h4 className="text-[24px] font-extrabold text-[#012d1d] mb-1">{profilDesa.luas_wilayah || 0}</h4>
                      <p className="text-[12px] font-bold text-[#717973] uppercase tracking-wide">Total Hektar</p>
                    </div>
                    
                    <div className="bg-white border border-[#c1c8c2]/50 p-5 rounded-2xl shadow-sm text-center flex flex-col items-center hover:border-[#1b4332] transition-colors">
                      <Home className="w-8 h-8 text-[#1b4332] mb-2" />
                      <h4 className="text-[24px] font-extrabold text-[#012d1d] mb-1">{profilDesa.luas_dihuni || 0}</h4>
                      <p className="text-[12px] font-bold text-[#717973] uppercase tracking-wide">Hektar Dihuni</p>
                    </div>
                    
                    <div className="bg-white border border-[#c1c8c2]/50 p-5 rounded-2xl shadow-sm text-center flex flex-col items-center col-span-2 hover:border-[#003f63] transition-colors">
                      <Building2 className="w-8 h-8 text-[#003f63] mb-2" />
                      <h4 className="text-[24px] font-extrabold text-[#012d1d] mb-1">{profilDesa.jumlah_dusun || 0} Dusun / {profilDesa.jumlah_rw || 0} RW</h4>
                      <p className="text-[12px] font-bold text-[#717973] uppercase tracking-wide">Pembagian Wilayah Administrasi</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 3. DEMOGRAFI & FASILITAS */}
          <section id="demografi" className="py-20 bg-[#f5f3ef] scroll-mt-20">
            <div className="max-w-[1200px] mx-auto px-6">
              <div className="text-center mb-12">
                <h2 className="text-[32px] font-bold text-[#012d1d] mb-2">Data Demografi & Infrastruktur</h2>
                <p className="text-[16px] text-[#414844]">Gambaran umum kependudukan dan fasilitas penunjang di Desa {profilDesa.nama_desa}.</p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="bg-white rounded-2xl p-8 border border-[#c1c8c2]/40 shadow-sm">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 bg-[#012d1d]/10 rounded-full flex items-center justify-center text-[#012d1d]"><Users className="w-6 h-6" /></div>
                    <div><h3 className="text-[20px] font-bold text-[#012d1d]">Populasi Penduduk</h3><p className="text-[14px] text-[#717973]">Total: {profilDesa.total_penduduk || 0} Jiwa</p></div>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between text-[14px] font-bold mb-2"><span className="text-[#003f63]">Laki-laki ({persenLaki}%)</span><span className="text-[#012d1d]">{profilDesa.penduduk_laki_laki || 0} Jiwa</span></div>
                      <div className="w-full bg-[#efeeea] rounded-full h-3"><div className="bg-[#003f63] h-3 rounded-full" style={{ width: `${persenLaki}%` }}></div></div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[14px] font-bold mb-2"><span className="text-[#835336]">Perempuan ({persenPerempuan}%)</span><span className="text-[#012d1d]">{profilDesa.penduduk_perempuan || 0} Jiwa</span></div>
                      <div className="w-full bg-[#efeeea] rounded-full h-3"><div className="bg-[#835336] h-3 rounded-full" style={{ width: `${persenPerempuan}%` }}></div></div>
                    </div>
                  </div>
                </div>

                {/* INFRASTRUKTUR DINAMIS */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-2xl p-6 border border-[#c1c8c2]/40 shadow-sm flex items-start gap-4">
                    <div className="bg-[#febe9b]/30 p-3 rounded-xl text-[#835336]"><BookOpen className="w-6 h-6"/></div>
                    <div><h4 className="text-[24px] font-bold text-[#012d1d]">{profilDesa.jumlah_sekolah || 0}</h4><p className="text-[13px] font-semibold text-[#717973]">Gedung Sekolah</p></div>
                  </div>
                  <div className="bg-white rounded-2xl p-6 border border-[#c1c8c2]/40 shadow-sm flex items-start gap-4">
                    <div className="bg-[#cde5ff] p-3 rounded-xl text-[#003f63]"><HeartPulse className="w-6 h-6"/></div>
                    <div><h4 className="text-[24px] font-bold text-[#012d1d]">{profilDesa.jumlah_puskesmas || 0}</h4><p className="text-[13px] font-semibold text-[#717973]">Puskesmas / Pustu</p></div>
                  </div>
                  <div className="bg-white rounded-2xl p-6 border border-[#c1c8c2]/40 shadow-sm flex items-start gap-4">
                    <div className="bg-[#1b4332]/10 p-3 rounded-xl text-[#012d1d]"><Landmark className="w-6 h-6"/></div>
                    <div><h4 className="text-[24px] font-bold text-[#012d1d]">{profilDesa.jumlah_masjid || 0}</h4><p className="text-[13px] font-semibold text-[#717973]">Masjid / Mushola</p></div>
                  </div>
                  <div className="bg-white rounded-2xl p-6 border border-[#c1c8c2]/40 shadow-sm flex items-start gap-4">
                    <div className="bg-gray-100 p-3 rounded-xl text-gray-700"><Building2 className="w-6 h-6"/></div>
                    <div><h4 className="text-[24px] font-bold text-[#012d1d]">{profilDesa.jumlah_fasum || 0}</h4><p className="text-[13px] font-semibold text-[#717973]">Fasilitas Umum</p></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 4. VISI MISI */}
          <section id="visimisi" className="py-20 bg-[#012d1d] scroll-mt-20">
            <div className="max-w-[1200px] mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-[36px] font-bold text-white mb-4">Visi & Misi Desa</h2>
                <div className="w-20 h-1 bg-[#febe9b] mx-auto rounded-full"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white/5 border border-white/10 p-10 md:p-14 rounded-3xl backdrop-blur-sm">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 bg-[#febe9b] text-[#331200] rounded-2xl flex items-center justify-center shadow-lg transform -rotate-6"><Eye className="w-8 h-8" /></div>
                    <h3 className="text-[28px] font-bold text-white">Visi</h3>
                  </div>
                  <p className="text-[24px] md:text-[28px] font-semibold italic text-white/90 leading-snug">"{profilDesa.visi}"</p>
                </div>
                
                <div className="bg-white/5 border border-white/10 p-10 md:p-14 rounded-3xl backdrop-blur-sm">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 bg-white text-[#012d1d] rounded-2xl flex items-center justify-center shadow-lg transform rotate-6"><Target className="w-8 h-8" /></div>
                    <h3 className="text-[28px] font-bold text-white">Misi</h3>
                  </div>
                  <div className="text-white/80 text-[16px] leading-[1.8]" dangerouslySetInnerHTML={{ __html: profilDesa.misi }} />
                </div>
              </div>
            </div>
          </section>

          {/* 5. TEASER APARATUR DESA */}
          <section id="aparatur" className="py-20 bg-[#fbf9f5] scroll-mt-20">
            <div className="max-w-[1200px] mx-auto px-6">
              <div className="text-center mb-12">
                <h2 className="text-[32px] font-bold text-[#012d1d] mb-2">Aparatur Pemerintahan Desa</h2>
                <p className="text-[16px] text-[#414844]">Ujung tombak pelayanan dan pembangunan Desa {profilDesa.nama_desa}.</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                {/* TAMBAHAN: Menggabungkan Kepala Desa dan maksimal 3 Aparatur secara dinamis */}
                {[
                  { 
                    nama: profilDesa?.nama_kepala_desa || 'Belum Diisi', 
                    jabatan: 'Kepala Desa', 
                    foto: profilDesa?.foto_kepala_desa ? `${API_URL}/storage/${profilDesa.foto_kepala_desa}` : null 
                  },
                  ...aparaturDesa.slice(0, 3).map(aparatur => ({
                    nama: aparatur.nama_lengkap,
                    jabatan: aparatur.jabatan,
                    foto: aparatur.foto ? `${API_URL}/storage/${aparatur.foto}` : null
                  }))
                ].map((pejabat, idx) => (
                  <div key={idx} className="bg-white border border-[#c1c8c2]/40 rounded-2xl p-6 flex flex-col items-center text-center shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer">
                    <div className="w-24 h-24 bg-[#e4e2de] rounded-full mb-5 overflow-hidden border-[3px] border-[#efeeea] group-hover:border-[#012d1d] transition-colors shadow-sm relative">
                      <img 
                        src={pejabat.foto ? pejabat.foto : `https://ui-avatars.com/api/?name=${pejabat.nama.replace(/ /g, '+')}&background=012d1d&color=fff&size=150`} 
                        alt={pejabat.nama} 
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 absolute inset-0" 
                      />
                    </div>
                    <h4 className="text-[16px] font-extrabold text-[#012d1d] mb-1">{pejabat.nama}</h4>
                    <p className="text-[13px] font-semibold text-[#835336] uppercase tracking-wider">{pejabat.jabatan}</p>
                  </div>
                ))}
              </div>
              <div className="text-center">
                <Link to="/pemerintahan" className="inline-flex items-center justify-center gap-2 bg-white text-[15px] font-bold border-2 border-[#e4e2de] text-[#012d1d] px-8 py-3.5 rounded-lg hover:bg-[#efeeea] hover:border-[#c1c8c2] transition-all shadow-sm group">
                  Lihat Susunan Lengkap <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </section>

          {/* 6. PETA LOKASI DINAMIS */}
          <section id="peta" className="py-20 bg-[#f5f3ef] scroll-mt-20 border-t border-[#c1c8c2]/40">
            <div className="max-w-[1200px] mx-auto px-6">
              <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
                <div>
                  <h2 className="text-[28px] font-bold text-[#012d1d] mb-2">Peta Lokasi Desa</h2>
                  <p className="text-[16px] text-[#414844]">Kunjungi balai desa kami pada jam kerja operasional.</p>
                </div>
              </div>
              <div className="w-full h-[450px] bg-[#e4e2de] rounded-2xl overflow-hidden shadow-inner border border-[#c1c8c2]/50 relative z-10">
                <iframe 
                  src={profilDesa.link_peta || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126748.56347862248!2d107.55833611394142!3d-7.147779772658826!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68b63981881729%3A0x401e8f1fc28c890!2sSukawangi%2C%20Warungkondang%2C%20Cianjur%20Regency%2C%20West%20Java!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid"} 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Peta Desa"
                ></iframe>
              </div>
            </div>
          </section>

          {/* 7. BOTTOM CTA */}
          <section className="py-16 bg-white border-t border-[#c1c8c2]/30">
            <div className="max-w-[1200px] mx-auto px-6 text-center flex flex-col items-center">
              <h2 className="text-[24px] font-bold text-[#012d1d] mb-3">Butuh Bantuan atau Informasi Lebih Lanjut?</h2>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/kontak" className="inline-flex items-center gap-2 bg-[#012d1d] text-white px-8 py-3 rounded-lg font-bold shadow-md"><PhoneCall className="w-5 h-5" /> Hubungi Kami</Link>
              </div>
            </div>
          </section>

        </>
      ) : (
        <div className="flex-grow flex items-center justify-center py-32">
          <p className="text-[18px] text-[#717973]">Gagal memuat data profil desa.</p>
        </div>
      )}
    </div>
  );
}