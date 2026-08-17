import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, Phone, Mail, Clock, Send, 
  Home, ChevronRight, MessageSquare, Map, 
  HelpCircle, CheckCircle 
} from 'lucide-react';
import { toast } from 'sonner';

export default function Kontak() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dataKontak, setDataKontak] = useState(null);
  const [dataBanner, setDataBanner] = useState(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    subjek: '',
    pesan: ''
  });

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

  useEffect(() => {
    window.scrollTo(0, 0);

    Promise.all([
      fetch(`${API_URL}/api/kontak`).then(res => res.json()).catch(() => null),
      fetch(`${API_URL}/api/pengaturan-beranda`).then(res => res.json()).catch(() => null)
    ])
    .then(([resKontak, resBanner]) => {
      if (resKontak) {
        const dKontak = resKontak.data || resKontak;
        setDataKontak(Array.isArray(dKontak) ? dKontak[0] : dKontak);
      }
      
      // PERBAIKAN DI SINI
      if (resBanner) {
        const dBanner = resBanner.data || resBanner;
        setDataBanner(Array.isArray(dBanner) ? dBanner[0] : dBanner);
      }
      
      setLoading(false);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      setLoading(false);
    });
  }, [API_URL]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const payload = new FormData();
      
      payload.append('nama', formData.nama);
      payload.append('no_wa', formData.email); 
      payload.append('kategori', 'Pertanyaan Informasi'); 
      const gabunganPesan = `[Subjek: ${formData.subjek}]\n\n${formData.pesan}`;
      payload.append('pesan', gabunganPesan); 
      payload.append('is_anonim', '0');
      payload.append('status', 'menunggu');

      const response = await fetch(`${API_URL}/api/pengaduan`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
        body: payload
      });

      const data = await response.json();

      if (response.ok || data.success || data.status === 'success') {
        toast.success('Pesan Berhasil Terkirim!', {
          description: 'Terima kasih, pesan Anda telah masuk ke sistem layanan desa kami.'
        });
        setFormData({ nama: '', email: '', subjek: '', pesan: '' });
      } else {
        toast.error('Gagal Mengirim Pesan', {
          description: data.message || 'Mohon periksa kembali isian form Anda.'
        });
      }
    } catch (error) {
      console.error('Error submitting pesan:', error);
      toast.error('Terjadi Kesalahan Server', {
        description: 'Tidak dapat terhubung ke server. Silakan coba lagi nanti.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqs = [
    {
      tanya: "Apa saja syarat membuat Surat Pengantar RT/RW?",
      jawab: "Anda cukup membawa Fotokopi KTP, Fotokopi KK, dan mengisi formulir permohonan yang tersedia di Balai Desa."
    },
    {
      tanya: "Berapa lama proses pembuatan surat keterangan?",
      jawab: "Jika syarat lengkap dan Kepala Desa berada di tempat, surat keterangan dapat selesai dalam waktu 1x24 jam (hari kerja)."
    },
    {
      tanya: "Apakah Balai Desa buka di hari Sabtu atau Minggu?",
      jawab: "Tidak. Sesuai jam operasional pemerintahan, Balai Desa hanya beroperasi dari hari Senin hingga Jumat (08.00 - 15.00 WIB)."
    },
    {
      tanya: "Bagaimana cara melaporkan jalan rusak?",
      jawab: "Anda dapat menggunakan menu 'Layanan Pengaduan' di website ini, sertakan foto kondisi jalan dan lokasi spesifiknya."
    }
  ];

  return (
    <div className="bg-[#fbf9f5] text-[#1b1c1a] font-['Inter'] flex flex-col min-h-screen">
      
      {/* 1. HERO BANNER */}
      <section className="relative h-[300px] md:h-[400px] w-full flex items-center justify-center mt-0">
        <div className="absolute inset-0 z-0 bg-[#012d1d]/80">
          <img 
            src={
              dataBanner?.banner_kontak 
                ? `${API_URL}/storage/${dataBanner.banner_kontak}` 
                : "https://images.unsplash.com/photo-1596524430615-b46475ddff6e?q=80&w=1920&auto=format&fit=crop"
            } 
            alt="Kontak Desa" 
            className="w-full h-full object-cover mix-blend-overlay grayscale-[20%]"
          />
        </div>
        <div className="relative z-10 text-center px-6 mt-10">
          <div className="inline-flex items-center gap-2 bg-[#febe9b] text-[#331200] px-4 py-1.5 rounded-full text-[13px] font-bold uppercase tracking-widest mb-6 shadow-sm">
            <Phone className="w-4 h-4" /> Hubungi Kami
          </div>
          <h1 className="text-[36px] md:text-[52px] font-extrabold text-white leading-tight drop-shadow-md">
            Kontak Pelayanan Desa
          </h1>
        </div>
      </section>

      {/* 2. BREADCRUMB */}
      <div className="bg-white/90 backdrop-blur-md border-b border-[#c1c8c2]/50 sticky top-[80px] z-40 shadow-sm">
        <div className="max-w-[1200px] mx-auto px-6 py-4 flex items-center gap-2 text-[14px] font-medium text-[#717973] overflow-x-auto whitespace-nowrap hide-scrollbar">
          <Link to="/" className="hover:text-[#012d1d] flex items-center gap-1"><Home className="w-4 h-4"/> Beranda</Link>
          <ChevronRight className="w-4 h-4 shrink-0" />
          <span className="text-[#012d1d] font-bold">Kontak</span>
        </div>
      </div>

      {/* 3. KARTU INFORMASI UTAMA */}
      <section className="py-16 bg-[#fbf9f5]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-[28px] md:text-[32px] font-bold text-[#012d1d] mb-3">Pusat Informasi Pelayanan</h2>
            <p className="text-[16px] text-[#414844]">Silakan hubungi atau kunjungi kami pada jam operasional kerja.</p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
              {[1, 2, 3, 4].map(i => <div key={i} className="h-48 bg-[#e4e2de] rounded-2xl"></div>)}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-8 rounded-2xl border border-[#c1c8c2]/40 shadow-sm flex flex-col items-center text-center group hover:shadow-md transition-all">
                <div className="w-16 h-16 bg-[#febe9b]/30 rounded-full flex items-center justify-center text-[#835336] mb-5 group-hover:scale-110 transition-transform">
                  <MapPin className="w-7 h-7" />
                </div>
                <h3 className="text-[18px] font-bold text-[#012d1d] mb-2">Alamat Balai Desa</h3>
                <p className="text-[14px] text-[#717973] leading-relaxed">
                  {dataKontak?.alamat || 'Belum diatur'}
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-[#c1c8c2]/40 shadow-sm flex flex-col items-center text-center group hover:shadow-md transition-all">
                <div className="w-16 h-16 bg-[#cde5ff] rounded-full flex items-center justify-center text-[#003f63] mb-5 group-hover:scale-110 transition-transform">
                  <Phone className="w-7 h-7" />
                </div>
                <h3 className="text-[18px] font-bold text-[#012d1d] mb-2">Telepon / WhatsApp</h3>
                <p className="text-[14px] text-[#717973] leading-relaxed">
                  {dataKontak?.telepon || 'Belum diatur'}
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-[#c1c8c2]/40 shadow-sm flex flex-col items-center text-center group hover:shadow-md transition-all">
                <div className="w-16 h-16 bg-[#012d1d]/10 rounded-full flex items-center justify-center text-[#012d1d] mb-5 group-hover:scale-110 transition-transform">
                  <Mail className="w-7 h-7" />
                </div>
                <h3 className="text-[18px] font-bold text-[#012d1d] mb-2">Email Resmi</h3>
                <p className="text-[14px] text-[#717973] leading-relaxed break-all">
                  {dataKontak?.email || 'Belum diatur'}
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-[#c1c8c2]/40 shadow-sm flex flex-col items-center text-center group hover:shadow-md transition-all">
                <div className="w-16 h-16 bg-[#e4e2de] rounded-full flex items-center justify-center text-[#414844] mb-5 group-hover:scale-110 transition-transform">
                  <Clock className="w-7 h-7" />
                </div>
                <h3 className="text-[18px] font-bold text-[#012d1d] mb-2">Jam Operasional</h3>
                <p className="text-[14px] text-[#717973] leading-relaxed">
                  {dataKontak?.jam_operasional || 'Belum diatur'}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4. FORMULIR PESAN & GOOGLE MAPS */}
      <section className="py-16 bg-[#f5f3ef] border-t border-[#c1c8c2]/30">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12">
            
            <div className="lg:w-5/12 w-full bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-[#c1c8c2]/40">
              <div className="flex items-center gap-3 mb-6 border-b border-[#e4e2de] pb-6">
                <MessageSquare className="w-8 h-8 text-[#835336]" />
                <div>
                  <h2 className="text-[24px] font-bold text-[#012d1d]">Kirim Pesan</h2>
                  <p className="text-[#717973] text-[14px]">Ada pertanyaan terkait administrasi desa?</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-[14px] font-bold text-[#012d1d] mb-2">Nama Lengkap</label>
                  <input type="text" name="nama" value={formData.nama} onChange={handleChange} required placeholder="Nama Anda" className="w-full bg-[#fbf9f5] border border-[#c1c8c2] text-[#1b1c1a] text-[15px] rounded-xl focus:ring-[#012d1d] focus:border-[#012d1d] block p-3.5 transition-colors" />
                </div>
                <div>
                  <label className="block text-[14px] font-bold text-[#012d1d] mb-2">Email atau No. WhatsApp</label>
                  <input type="text" name="email" value={formData.email} onChange={handleChange} required placeholder="Untuk balasan dari kami" className="w-full bg-[#fbf9f5] border border-[#c1c8c2] text-[#1b1c1a] text-[15px] rounded-xl focus:ring-[#012d1d] focus:border-[#012d1d] block p-3.5 transition-colors" />
                </div>
                <div>
                  <label className="block text-[14px] font-bold text-[#012d1d] mb-2">Subjek / Keperluan</label>
                  <input type="text" name="subjek" value={formData.subjek} onChange={handleChange} required placeholder="Misal: Info Syarat KTP" className="w-full bg-[#fbf9f5] border border-[#c1c8c2] text-[#1b1c1a] text-[15px] rounded-xl focus:ring-[#012d1d] focus:border-[#012d1d] block p-3.5 transition-colors" />
                </div>
                <div>
                  <label className="block text-[14px] font-bold text-[#012d1d] mb-2">Pesan Anda</label>
                  <textarea name="pesan" value={formData.pesan} onChange={handleChange} required rows="4" placeholder="Tuliskan pertanyaan Anda di sini..." className="w-full bg-[#fbf9f5] border border-[#c1c8c2] text-[#1b1c1a] text-[15px] rounded-xl focus:ring-[#012d1d] focus:border-[#012d1d] block p-3.5 transition-colors resize-none"></textarea>
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full inline-flex items-center justify-center gap-2 bg-[#012d1d] text-white px-8 py-4 rounded-xl text-[16px] font-bold hover:bg-[#1b4332] focus:ring-4 focus:ring-[#012d1d]/30 transition-all shadow-md active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed mt-2">
                  {isSubmitting ? 'Mengirim...' : <><Send className="w-5 h-5" /> Kirim Pesan Sekarang</>}
                </button>
              </form>
            </div>

            <div className="lg:w-7/12 w-full flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm border border-[#c1c8c2]/40 relative min-h-[400px]">
              <div className="bg-[#1b4332] text-white p-6 flex flex-wrap items-center justify-between gap-4 z-10 relative shadow-sm">
                <div className="flex items-center gap-3">
                  <Map className="w-6 h-6 text-[#febe9b]" />
                  <h2 className="text-[18px] font-bold">Peta Titik Lokasi Balai Desa</h2>
                </div>
              </div>
              <div className="flex-grow w-full bg-[#e4e2de] relative z-0 h-[350px] lg:h-auto">
                <iframe 
                  src={dataKontak?.link_peta || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126748.56347862248!2d107.55833611394142!3d-7.147779772658826!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68b63981881729%3A0x401e8f1fc28c890!2sSukawangi%2C%20Warungkondang%2C%20Cianjur%20Regency%2C%20West%20Java!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid"} 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Peta Desa Sukawangi"
                  className="absolute inset-0 w-full h-full"
                ></iframe>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. FAQ (Tanya Jawab Umum) */}
      <section className="py-16 bg-white border-t border-[#c1c8c2]/30 flex-grow">
        <div className="max-w-[900px] mx-auto px-6">
          <div className="flex flex-col items-center text-center mb-10">
            <div className="w-14 h-14 bg-[#febe9b]/30 rounded-full flex items-center justify-center text-[#835336] mb-4">
              <HelpCircle className="w-8 h-8" />
            </div>
            <h2 className="text-[28px] font-bold text-[#012d1d] mb-3">Tanya Jawab Umum (FAQ)</h2>
            <p className="text-[#414844] text-[16px]">Jawaban cepat untuk pertanyaan yang sering diajukan warga.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-[#fbf9f5] border border-[#e4e2de] rounded-2xl p-6 hover:border-[#c1c8c2] transition-colors">
                <h3 className="text-[16px] font-bold text-[#012d1d] mb-3 flex items-start gap-2">
                  <span className="text-[#835336] mt-0.5">Q:</span> {faq.tanya}
                </h3>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-[#003f63] mt-0.5 shrink-0" />
                  <p className="text-[14px] text-[#414844] leading-relaxed">{faq.jawab}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}