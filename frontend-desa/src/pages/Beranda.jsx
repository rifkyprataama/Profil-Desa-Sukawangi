import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Landmark, Users, Megaphone, 
  Newspaper, ShieldCheck, Target, Eye,
  Building2, HardHat, HeartHandshake, Leaf, AlertTriangle,
  ChevronRight, Activity
} from 'lucide-react';

export default function Beranda() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, []);

  // Data Dummy Berita Terbaru
  const beritaTerbaru = [
    { id: 1, judul: 'Penyaluran BLT Dana Desa Tahap III Berjalan Lancar', tanggal: '10 Aug 2026', kategori: 'Sosial', gambar: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=600&auto=format&fit=crop' },
    { id: 2, judul: 'Kerja Bakti Rutin Warga Dusun II', tanggal: '08 Aug 2026', kategori: 'Kegiatan Warga', gambar: 'https://images.unsplash.com/photo-1593409951662-8e7c10b067d3?q=80&w=600&auto=format&fit=crop' },
    { id: 3, judul: 'Peresmian Jembatan Gantung Desa Sukawangi', tanggal: '05 Aug 2026', kategori: 'Infrastruktur', gambar: 'https://images.unsplash.com/photo-1541888086225-ee81fb60195a?q=80&w=600&auto=format&fit=crop' }
  ];

  return (
    <div className="bg-[#fbf9f5] text-[#1b1c1a] font-['Inter'] flex flex-col min-h-screen relative overflow-hidden">
      
      {/* 1. HERO SECTION (Revisi: Background Depan Kantor Desa) */}
      <section className="relative h-[85vh] min-h-[600px] w-full flex items-center justify-center mt-0">
        <div className="absolute inset-0 z-0 bg-[#012d1d]/80">
          <img 
            // Gambar sementara representasi kantor instansi, nanti diganti foto balai desa asli dari admin
            src="https://images.unsplash.com/photo-1577563908411-50cb989766a3?q=80&w=1920&auto=format&fit=crop" 
            alt="Depan Kantor Desa Sukawangi" 
            className="w-full h-full object-cover mix-blend-overlay grayscale-[10%]"
          />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-10">
          <div className="inline-flex items-center gap-2 bg-[#febe9b]/20 backdrop-blur-md text-[#febe9b] border border-[#febe9b]/30 px-5 py-2 rounded-full text-[13px] font-bold uppercase tracking-widest mb-6 shadow-sm">
            <Landmark className="w-4 h-4" /> Selamat Datang di
          </div>
          <h1 className="text-[46px] md:text-[64px] font-extrabold text-white leading-tight drop-shadow-lg mb-6">
            Website Resmi<br/>Desa Sukawangi
          </h1>
          <p className="text-[16px] md:text-[20px] text-white/90 leading-relaxed max-w-2xl mx-auto mb-10 font-medium">
            Wadah layanan publik dan transparansi informasi untuk mewujudkan masyarakat Desa Sukawangi yang mandiri, sejahtera, dan berbudaya.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/pengaduan" className="w-full sm:w-auto bg-[#febe9b] text-[#331200] px-8 py-4 rounded-xl font-bold hover:bg-[#f8b895] transition-all shadow-lg flex items-center justify-center gap-2">
              <Megaphone className="w-5 h-5" /> Buat Pengaduan
            </Link>
            <Link to="/profil" className="w-full sm:w-auto bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-all shadow-lg flex items-center justify-center gap-2">
              Lebih Kenal Desa <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. MENU CEPAT (Quick Links) */}
      <section className="relative z-20 -mt-20 max-w-[1200px] mx-auto px-6 w-full">
        <div className="bg-white rounded-3xl shadow-xl border border-[#c1c8c2]/50 p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-0 justify-between">
          <Link to="/pemerintahan" className="flex-1 flex flex-col items-center text-center p-4 group hover:bg-[#fbf9f5] rounded-2xl transition-colors">
            <div className="w-14 h-14 bg-[#012d1d]/10 rounded-2xl flex items-center justify-center text-[#012d1d] mb-4 group-hover:scale-110 transition-transform">
              <Users className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-[#012d1d] text-[16px]">Pemerintahan</h3>
            <p className="text-[13px] text-[#717973] mt-1">Struktur & Aparatur</p>
          </Link>
          
          <div className="hidden md:block w-px bg-[#c1c8c2]/40 my-4"></div>

          <Link to="/profil" className="flex-1 flex flex-col items-center text-center p-4 group hover:bg-[#fbf9f5] rounded-2xl transition-colors">
            <div className="w-14 h-14 bg-[#835336]/10 rounded-2xl flex items-center justify-center text-[#835336] mb-4 group-hover:scale-110 transition-transform">
              <Landmark className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-[#012d1d] text-[16px]">Profil Desa</h3>
            <p className="text-[13px] text-[#717973] mt-1">Sejarah & Demografi</p>
          </Link>

          <div className="hidden md:block w-px bg-[#c1c8c2]/40 my-4"></div>

          <Link to="/berita" className="flex-1 flex flex-col items-center text-center p-4 group hover:bg-[#fbf9f5] rounded-2xl transition-colors">
            <div className="w-14 h-14 bg-[#003f63]/10 rounded-2xl flex items-center justify-center text-[#003f63] mb-4 group-hover:scale-110 transition-transform">
              <Newspaper className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-[#012d1d] text-[16px]">Kabar Desa</h3>
            <p className="text-[13px] text-[#717973] mt-1">Informasi & Berita</p>
          </Link>
        </div>
      </section>

      {/* 3. PROFIL KADES + VISI MISI (Revisi: Digabungkan dalam satu seksi) */}
      <section className="py-24 bg-[#fbf9f5]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="bg-white rounded-3xl border border-[#c1c8c2]/40 shadow-sm overflow-hidden flex flex-col lg:flex-row">
            
            {/* Foto Kepala Desa */}
            <div className="lg:w-2/5 relative min-h-[400px] bg-[#e4e2de]">
              <img 
                src="https://images.unsplash.com/photo-1555848962-6e79363ec58f?q=80&w=800&auto=format&fit=crop" 
                alt="Kepala Desa Sukawangi" 
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#012d1d] via-[#012d1d]/40 to-transparent flex flex-col justify-end p-8">
                <span className="bg-[#febe9b] text-[#331200] text-[12px] font-bold px-3 py-1 rounded-full w-max mb-3 shadow-sm">
                  Periode 2022 - 2028
                </span>
                <h3 className="text-[28px] font-bold text-white mb-1">Ahmad Sunarya</h3>
                <p className="text-[16px] text-white/80 font-medium">Kepala Desa Sukawangi</p>
              </div>
            </div>

            {/* Sambutan & Visi Misi */}
            <div className="lg:w-3/5 p-8 md:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-6">
                <ShieldCheck className="w-8 h-8 text-[#835336]" />
                <h2 className="text-[28px] font-bold text-[#012d1d]">Sambutan Kepala Desa</h2>
              </div>
              <p className="text-[16px] text-[#414844] leading-relaxed mb-10 italic border-l-4 border-[#835336] pl-6 bg-[#fbf9f5] py-4 pr-4 rounded-r-xl">
                "Selamat datang di portal resmi Desa Sukawangi. Kami berkomitmen untuk terus berinovasi dalam memberikan pelayanan terbaik, transparan, dan akuntabel kepada seluruh warga masyarakat demi kemajuan desa yang kita cintai."
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Visi */}
                <div className="bg-[#012d1d] p-8 rounded-2xl shadow-lg relative overflow-hidden group">
                  <Eye className="absolute -bottom-4 -right-4 w-24 h-24 text-white/5 group-hover:scale-110 transition-transform" />
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-[#febe9b] rounded-lg flex items-center justify-center text-[#331200]">
                      <Eye className="w-5 h-5" />
                    </div>
                    <h3 className="text-[20px] font-bold text-white">Visi</h3>
                  </div>
                  <p className="text-[15px] font-semibold text-white/90 leading-relaxed italic">
                    "Terwujudnya Desa Sukawangi yang Mandiri, Sejahtera, Agamis, dan Berbudaya berbasis Pertanian dan Teknologi."
                  </p>
                </div>

                {/* Misi */}
                <div className="bg-[#f5f3ef] border border-[#c1c8c2] p-8 rounded-2xl relative overflow-hidden">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-[#012d1d] rounded-lg flex items-center justify-center text-white">
                      <Target className="w-5 h-5" />
                    </div>
                    <h3 className="text-[20px] font-bold text-[#012d1d]">Misi Utama</h3>
                  </div>
                  <ul className="text-[14px] text-[#414844] space-y-3 font-medium">
                    <li className="flex items-start gap-2">
                      <span className="text-[#835336] font-bold mt-0.5">•</span>
                      Meningkatkan kualitas tata kelola pemerintahan yang bersih.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#835336] font-bold mt-0.5">•</span>
                      Meningkatkan pembangunan infrastruktur desa.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#835336] font-bold mt-0.5">•</span>
                      Pemberdayaan ekonomi kerakyatan & UMKM.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* 4. TRANSPARANSI APBDES (Revisi: Realisasi Pendapatan & 5 Bidang) */}
      <section className="py-24 bg-[#012d1d] text-white relative overflow-hidden">
        {/* Dekorasi Latar Belakang */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#1b4332] rounded-full blur-3xl opacity-50 translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
        
        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 border-b border-white/20 pb-8">
            <div className="max-w-2xl">
              <h2 className="text-[32px] md:text-[40px] font-bold mb-4">Transparansi Keuangan & Program Desa</h2>
              <p className="text-[16px] text-white/80 leading-relaxed">
                Wujud komitmen pemerintahan desa yang akuntabel. Berikut adalah realisasi pendapatan desa dan fokus pelaksanaan 5 bidang program kerja Tahun Anggaran 2026.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-full flex items-center gap-3">
              <Activity className="w-5 h-5 text-[#febe9b]" />
              <span className="text-[14px] font-bold tracking-wider uppercase">TA 2026</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            
            {/* Realisasi Pendapatan */}
            <div className="lg:col-span-1 bg-[#febe9b] rounded-3xl p-8 text-[#331200] flex flex-col justify-center shadow-2xl transform lg:-translate-y-6">
              <h3 className="text-[18px] font-bold mb-2 uppercase tracking-wide opacity-80">Realisasi Pendapatan</h3>
              <p className="text-[42px] font-black leading-tight mb-6">Rp 1.85 M</p>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-[14px] font-bold mb-1">
                    <span>Dana Desa (DD)</span>
                    <span>65%</span>
                  </div>
                  <div className="w-full bg-black/10 rounded-full h-2">
                    <div className="bg-[#331200] h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[14px] font-bold mb-1">
                    <span>Alokasi Dana Desa (ADD)</span>
                    <span>25%</span>
                  </div>
                  <div className="w-full bg-black/10 rounded-full h-2">
                    <div className="bg-[#331200] h-2 rounded-full" style={{ width: '25%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[14px] font-bold mb-1">
                    <span>Pendapatan Asli Desa (PADes)</span>
                    <span>10%</span>
                  </div>
                  <div className="w-full bg-black/10 rounded-full h-2">
                    <div className="bg-[#331200] h-2 rounded-full" style={{ width: '10%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* 5 Bidang Program Kerja */}
            <div className="lg:col-span-2">
              <h3 className="text-[20px] font-bold mb-6 text-white border-l-4 border-[#febe9b] pl-4">Fokus 5 Bidang Program Kerja</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div className="bg-white/5 border border-white/10 hover:bg-white/10 p-5 rounded-2xl flex items-start gap-4 transition-colors">
                  <div className="bg-[#cde5ff]/20 p-3 rounded-xl text-[#cde5ff] shrink-0">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[16px] mb-1">Penyelenggaraan Pemerintahan</h4>
                    <p className="text-[13px] text-white/70">Operasional kantor desa, pelayanan publik, dan insentif aparatur.</p>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 hover:bg-white/10 p-5 rounded-2xl flex items-start gap-4 transition-colors">
                  <div className="bg-[#febe9b]/20 p-3 rounded-xl text-[#febe9b] shrink-0">
                    <HardHat className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[16px] mb-1">Pelaksanaan Pembangunan</h4>
                    <p className="text-[13px] text-white/70">Infrastruktur fisik seperti jalan desa, irigasi, dan balai dusun.</p>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 hover:bg-white/10 p-5 rounded-2xl flex items-start gap-4 transition-colors">
                  <div className="bg-green-500/20 p-3 rounded-xl text-green-400 shrink-0">
                    <HeartHandshake className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[16px] mb-1">Pembinaan Kemasyarakatan</h4>
                    <p className="text-[13px] text-white/70">Pembinaan RT/RW, Karang Taruna, PKK, dan keamanan desa.</p>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 hover:bg-white/10 p-5 rounded-2xl flex items-start gap-4 transition-colors">
                  <div className="bg-purple-500/20 p-3 rounded-xl text-purple-400 shrink-0">
                    <Leaf className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[16px] mb-1">Pemberdayaan Masyarakat</h4>
                    <p className="text-[13px] text-white/70">Pelatihan UMKM, kelompok tani, dan peningkatan kapasitas warga.</p>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 hover:bg-white/10 p-5 rounded-2xl flex items-start gap-4 transition-colors sm:col-span-2 md:w-1/2 md:justify-self-center">
                  <div className="bg-red-500/20 p-3 rounded-xl text-red-400 shrink-0">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[16px] mb-1">Bencana & Keadaan Darurat</h4>
                    <p className="text-[13px] text-white/70">Dana siaga penanggulangan bencana alam dan kebutuhan mendesak desa.</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. BERITA TERBARU */}
      <section className="py-24 bg-[#fbf9f5]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-[32px] font-bold text-[#012d1d] mb-2">Kabar Terbaru</h2>
              <p className="text-[#414844] text-[16px]">Informasi dan berita terkini seputar Desa Sukawangi.</p>
            </div>
            <Link to="/berita" className="hidden md:flex items-center gap-2 text-[#012d1d] font-bold hover:text-[#835336] transition-colors group">
              Lihat Semua <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {beritaTerbaru.map((berita) => (
              <Link to={`/berita/${berita.id}`} key={berita.id} className="group bg-white rounded-2xl overflow-hidden border border-[#c1c8c2]/40 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col">
                <div className="h-56 overflow-hidden relative bg-[#e4e2de]">
                  <img src={berita.gambar} alt={berita.judul} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur text-[#012d1d] text-[12px] font-bold px-3 py-1.5 rounded-md">
                    {berita.kategori}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <span className="text-[#717973] text-[13px] font-bold mb-3">{berita.tanggal}</span>
                  <h3 className="text-[18px] font-extrabold text-[#012d1d] leading-snug mb-4 group-hover:text-[#3f6653] transition-colors line-clamp-2">
                    {berita.judul}
                  </h3>
                  <div className="mt-auto pt-4 border-t border-[#e4e2de] text-[14px] font-bold text-[#012d1d] flex items-center justify-between">
                    Baca Selengkapnya <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          {/* Tombol Lihat Semua (Versi Mobile) */}
          <div className="mt-10 md:hidden text-center">
             <Link to="/berita" className="inline-flex items-center gap-2 text-[#012d1d] border-2 border-[#012d1d] px-6 py-3 rounded-xl font-bold hover:bg-[#012d1d] hover:text-white transition-colors">
              Lihat Semua Berita <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}