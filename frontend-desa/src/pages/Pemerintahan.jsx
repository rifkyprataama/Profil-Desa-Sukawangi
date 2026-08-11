import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Landmark, Users, FileSignature, MapPin, 
  ChevronRight, PhoneCall, Home, ShieldCheck,
  Scale, HeartHandshake
} from 'lucide-react';

export default function Pemerintahan() {
  const [loading, setLoading] = useState(true);

  // DATA DUMMY APARATUR PEMERINTAHAN DESA
  const dataAparatur = {
    kepala_desa: { nama: 'Ahmad Sunarya', jabatan: 'Kepala Desa', periode: '2022 - 2028' },
    sekretaris: { nama: 'Budi Santoso, S.IP', jabatan: 'Sekretaris Desa' },
    kaur: [
      { nama: 'Siti Aminah, S.E', jabatan: 'Kaur Keuangan' },
      { nama: 'Rina Marlina, S.Kom', jabatan: 'Kaur Tata Usaha & Umum' },
      { nama: 'Dedi Mulyadi', jabatan: 'Kaur Perencanaan' }
    ],
    kasi: [
      { nama: 'Ridwan Kamil, S.Ag', jabatan: 'Kasi Pemerintahan' },
      { nama: 'Asep Supriatna', jabatan: 'Kasi Kesejahteraan' },
      { nama: 'Hendra Gunawan', jabatan: 'Kasi Pelayanan' }
    ],
    kadus: [
      { nama: 'Ujang Saepudin', jabatan: 'Kepala Dusun I' },
      { nama: 'Maman Abdurrahman', jabatan: 'Kepala Dusun II' },
      { nama: 'Yanto Herdianto', jabatan: 'Kepala Dusun III' },
      { nama: 'Dadang Subur', jabatan: 'Kepala Dusun IV' }
    ]
  };

  // DATA DUMMY LEMBAGA MITRA DESA (BPD & LKD)
  const dataMitra = {
    bpd: [
      { nama: 'H. Suryana, S.Pd', jabatan: 'Ketua BPD' },
      { nama: 'Drs. Asep Mahmud', jabatan: 'Wakil Ketua BPD' },
      { nama: 'Neneng Hasanah', jabatan: 'Sekretaris BPD' }
    ],
    lembaga: [
      { nama: 'Hj. Nani Mulyani', jabatan: 'Ketua TP-PKK' },
      { nama: 'Rizky Firmansyah', jabatan: 'Ketua Karang Taruna' },
      { nama: 'M. Taufik Hidayat', jabatan: 'Ketua LPM' }
    ]
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  // Komponen Card Reusable (Dapat digunakan untuk Aparatur maupun Lembaga)
  const PersonCard = ({ data, isUtama = false }) => (
    <div className={`bg-white border ${isUtama ? 'border-[#835336]/30 shadow-lg' : 'border-[#c1c8c2]/40 shadow-sm'} rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-xl transition-all duration-300 group cursor-pointer relative overflow-hidden`}>
      {isUtama && (
        <div className="absolute top-0 left-0 w-full h-2 bg-[#835336]"></div>
      )}
      <div className={`w-32 h-32 ${isUtama ? 'md:w-40 md:h-40' : ''} bg-[#e4e2de] rounded-full mb-5 overflow-hidden border-[4px] border-[#efeeea] group-hover:border-[#012d1d] transition-colors shadow-sm relative`}>
        <img 
          src={`https://ui-avatars.com/api/?name=${data.nama.replace(/ /g, '+')}&background=012d1d&color=fff&size=200`} 
          alt={data.nama} 
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 absolute inset-0" 
        />
      </div>
      <h4 className={`${isUtama ? 'text-[22px]' : 'text-[17px]'} font-extrabold text-[#012d1d] mb-1 group-hover:text-[#3f6653] transition-colors`}>
        {data.nama}
      </h4>
      <p className="text-[14px] font-bold text-[#835336] uppercase tracking-wider mb-2">
        {data.jabatan}
      </p>
      {data.periode && (
        <span className="bg-[#efeeea] text-[#414844] text-[12px] font-semibold px-3 py-1 rounded-full mt-1">
          Periode {data.periode}
        </span>
      )}
    </div>
  );

  return (
    <div className="bg-[#fbf9f5] text-[#1b1c1a] font-['Inter'] flex flex-col min-h-screen">
      
      {/* 1. HERO BANNER */}
      <section className="relative h-[350px] md:h-[450px] w-full flex items-center justify-center mt-0">
        <div className="absolute inset-0 z-0 bg-[#012d1d]/70">
          <img 
            src="https://images.unsplash.com/photo-1577563908411-50cb989766a3?q=80&w=1920&auto=format&fit=crop" 
            alt="Pemerintahan Desa" 
            className="w-full h-full object-cover mix-blend-overlay"
          />
        </div>
        <div className="relative z-10 text-center px-6 mt-10">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-[13px] font-bold uppercase tracking-widest mb-6 border border-white/30 shadow-sm">
            <Landmark className="w-4 h-4" /> Aparatur & Tokoh Desa
          </div>
          <h1 className="text-[36px] md:text-[52px] font-extrabold text-white leading-tight drop-shadow-md">
            Struktur Pemerintahan
          </h1>
        </div>
      </section>

      {/* BREADCRUMB */}
      <div className="bg-white/50 backdrop-blur-sm border-b border-[#c1c8c2]/50 sticky top-[80px] z-40">
        <div className="max-w-[1200px] mx-auto px-6 py-3 flex items-center gap-2 text-[14px] font-medium text-[#717973] overflow-x-auto whitespace-nowrap hide-scrollbar">
          <Link to="/" className="hover:text-[#012d1d] flex items-center gap-1"><Home className="w-4 h-4"/> Beranda</Link>
          <ChevronRight className="w-4 h-4 shrink-0" />
          <span className="text-[#012d1d] font-bold">Pemerintahan</span>
        </div>
      </div>

      {loading ? (
        <div className="max-w-[1200px] mx-auto px-6 py-20 w-full animate-pulse flex flex-col items-center">
          <div className="h-40 w-40 bg-[#e4e2de] rounded-full mb-6"></div>
          <div className="h-8 bg-[#e4e2de] w-64 rounded mb-16"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            <div className="h-64 bg-[#e4e2de] rounded-2xl"></div>
            <div className="h-64 bg-[#e4e2de] rounded-2xl"></div>
            <div className="h-64 bg-[#e4e2de] rounded-2xl"></div>
          </div>
        </div>
      ) : (
        <>
          {/* 2. PESAN PELAYANAN */}
          <section className="py-16 bg-[#fbf9f5]">
            <div className="max-w-[800px] mx-auto px-6 text-center">
              <ShieldCheck className="w-12 h-12 text-[#835336] mx-auto mb-6" />
              <h2 className="text-[28px] font-bold text-[#012d1d] mb-4">Komitmen Pelayanan Kami</h2>
              <p className="text-[16px] md:text-[18px] text-[#414844] leading-relaxed">
                Pemerintah Desa Sukawangi beserta seluruh lembaga mitra berkomitmen penuh untuk memberikan pelayanan yang prima, transparan, dan akuntabel guna mewujudkan kemajuan desa.
              </p>
            </div>
          </section>

          {/* 3. STRUKTUR ORGANISASI UTAMA */}
          <section className="py-16 bg-[#f5f3ef] border-t border-[#c1c8c2]/30">
            <div className="max-w-[1200px] mx-auto px-6">
              
              {/* Kepala Desa & Sekdes */}
              <div className="flex flex-col items-center mb-16">
                <div className="w-full max-w-[350px] mb-8">
                  <PersonCard data={dataAparatur.kepala_desa} isUtama={true} />
                </div>
                
                {/* Garis Penghubung */}
                <div className="w-1 h-12 bg-[#c1c8c2] mb-8"></div>
                
                <div className="w-full max-w-[300px]">
                  <PersonCard data={dataAparatur.sekretaris} />
                </div>
              </div>

              {/* Kepala Urusan (KAUR) */}
              <div className="mb-16">
                <div className="flex items-center gap-3 mb-8 border-b border-[#c1c8c2]/40 pb-4">
                  <FileSignature className="w-6 h-6 text-[#003f63]" />
                  <h3 className="text-[24px] font-bold text-[#012d1d]">Kepala Urusan (KAUR)</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {dataAparatur.kaur.map((kaur, idx) => (
                    <PersonCard key={`kaur-${idx}`} data={kaur} />
                  ))}
                </div>
              </div>

              {/* Kepala Seksi (KASI) */}
              <div className="mb-16">
                <div className="flex items-center gap-3 mb-8 border-b border-[#c1c8c2]/40 pb-4">
                  <Users className="w-6 h-6 text-[#835336]" />
                  <h3 className="text-[24px] font-bold text-[#012d1d]">Kepala Seksi (KASI)</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {dataAparatur.kasi.map((kasi, idx) => (
                    <PersonCard key={`kasi-${idx}`} data={kasi} />
                  ))}
                </div>
              </div>

              {/* Kepala Dusun (KADUS) */}
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-8 border-b border-[#c1c8c2]/40 pb-4">
                  <MapPin className="w-6 h-6 text-[#012d1d]" />
                  <h3 className="text-[24px] font-bold text-[#012d1d]">Kepala Dusun (KADUS)</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                  {dataAparatur.kadus.map((kadus, idx) => (
                    <PersonCard key={`kadus-${idx}`} data={kadus} />
                  ))}
                </div>
              </div>

            </div>
          </section>

          {/* 4. LEMBAGA MITRA DESA (BPD & LKD) */}
          <section className="py-16 bg-[#fbf9f5] border-t border-[#c1c8c2]/40">
            <div className="max-w-[1200px] mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-[32px] font-bold text-[#012d1d] mb-3">Lembaga Mitra Desa</h2>
                <p className="text-[16px] text-[#414844] max-w-2xl mx-auto">
                  Badan dan organisasi kemasyarakatan yang bersinergi bersama Pemerintah Desa dalam perencanaan, pengawasan, dan pemberdayaan masyarakat.
                </p>
              </div>

              {/* BPD */}
              <div className="mb-16">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-8 border-b border-[#c1c8c2]/40 pb-4">
                  <Scale className="w-6 h-6 text-[#003f63]" />
                  <h3 className="text-[24px] font-bold text-[#012d1d] text-center md:text-left">
                    Badan Permusyawaratan Desa (BPD)
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {dataMitra.bpd.map((item, idx) => (
                    <PersonCard key={`bpd-${idx}`} data={item} />
                  ))}
                </div>
              </div>

              {/* Lembaga Kemasyarakatan Desa (LKD) */}
              <div className="mb-10">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-8 border-b border-[#c1c8c2]/40 pb-4">
                  <HeartHandshake className="w-6 h-6 text-[#835336]" />
                  <h3 className="text-[24px] font-bold text-[#012d1d] text-center md:text-left">
                    Lembaga Kemasyarakatan (PKK, LPM, Karang Taruna)
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {dataMitra.lembaga.map((item, idx) => (
                    <PersonCard key={`lembaga-${idx}`} data={item} />
                  ))}
                </div>
              </div>

            </div>
          </section>

          {/* 5. CALL TO ACTION */}
          <section className="py-16 bg-white border-t border-[#c1c8c2]/30">
            <div className="max-w-[1200px] mx-auto px-6 text-center flex flex-col items-center">
              <h2 className="text-[24px] font-bold text-[#012d1d] mb-3">Butuh Layanan Administrasi?</h2>
              <p className="text-[16px] text-[#414844] max-w-xl mb-8">
                Datang langsung ke Balai Desa Sukawangi pada jam kerja (Senin - Jumat, 08:00 - 15:00 WIB) atau hubungi kami untuk informasi lebih lanjut.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/kontak" className="inline-flex items-center gap-2 bg-[#012d1d] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#1b4332] transition-colors shadow-md">
                  <PhoneCall className="w-5 h-5" /> Hubungi Kami
                </Link>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}