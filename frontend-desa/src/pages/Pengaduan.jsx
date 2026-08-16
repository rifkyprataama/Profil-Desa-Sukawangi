import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Megaphone, ShieldCheck, Clock, CheckCircle,
  Upload, AlertTriangle, PhoneCall, ChevronRight,
  Home, Send, EyeOff, Info, FileText
} from 'lucide-react';
import { toast } from 'sonner';

export default function Pengaduan() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewName, setPreviewName] = useState('');

  // 1. TAMBAHAN STATE: no_wa
  const [formData, setFormData] = useState({
    nama: '',
    nik: '',
    no_wa: '',
    kategori: 'Infrastruktur & Lingkungan',
    pesan: '',
    isAnonim: false,
    lampiran: null
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else if (type === 'file') {
      const file = files[0];
      if (file) {
        // 2. LOGIKA VALIDASI FILE: Tolak jika lebih dari 5MB
        if (file.size > 5 * 1024 * 1024) {
          toast.error('Ukuran file terlalu besar!', {
            description: 'Mohon unggah file dengan ukuran maksimal 5MB.'
          });
          e.target.value = null; // Reset input file
          return;
        }
        setPreviewName(file.name);
        setFormData({ ...formData, lampiran: file });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 1. Bungkus data menggunakan FormData karena kita mengirimkan File
    const submitData = new FormData();

    // Jika anonim, kosongkan NIK, jika tidak, pakai data aslinya
    submitData.append('nama', formData.isAnonim ? 'Anonim' : formData.nama);
    submitData.append('nik', formData.isAnonim ? '' : formData.nik);
    submitData.append('no_wa', formData.no_wa);
    submitData.append('kategori', formData.kategori);
    submitData.append('pesan', formData.pesan);

    // React mengirim boolean (true/false), Laravel meminta angka (1/0)
    submitData.append('is_anonim', formData.isAnonim ? 1 : 0);

    // Masukkan file jika ada
    if (formData.lampiran) {
      submitData.append('lampiran', formData.lampiran);
    }

    // 2. Kirim data ke API Laravel (DENGAN TAMBAHAN HEADERS)
    fetch('http://localhost:8000/api/pengaduan', {
      method: 'POST',
      headers: {
        'Accept': 'application/json' // INI KUNCI UTAMANYA
      },
      body: submitData,
    })
      .then(async (response) => {
        // Kita tangkap error dari Laravel jika ada data yang tidak sesuai
        const data = await response.json();
        if (!response.ok) {
          throw data; // Lempar error ke blok catch di bawah
        }
        return data;
      })
      .then((res) => {
        setIsSubmitting(false);

        if (res.status === 'success') {
          toast.success('Pengaduan berhasil dikirim! Terima kasih atas partisipasi Anda.', {
            description: 'Tindak lanjut akan diinformasikan melalui nomor WhatsApp yang Anda cantumkan.'
          });

          // Reset form ke kondisi kosong setelah berhasil
          setFormData({
            nama: '',
            nik: '',
            no_wa: '',
            kategori: 'Infrastruktur & Lingkungan',
            pesan: '',
            isAnonim: false,
            lampiran: null
          });
          setPreviewName('');
        } else {
          toast.error('Gagal mengirim laporan. Pastikan data terisi dengan benar.');
        }
      })
      .catch((error) => {
        setIsSubmitting(false);
        console.error("Detail Error dari Laravel:", error); // Cek console inspect element jika masih gagal

        // Menampilkan pesan error validasi spesifik dari Laravel jika ada
        if (error.errors) {
          toast.error('Data tidak valid!', {
            description: 'Pastikan Nomor WhatsApp dan semua kolom wajib sudah terisi.'
          });
        } else {
          toast.error('Terjadi kesalahan jaringan atau server. Silakan coba lagi nanti.');
        }
      });
  };

  return (
    <div className="bg-[#fbf9f5] text-[#1b1c1a] font-['Inter'] flex flex-col min-h-screen">

      {/* 1. HERO BANNER */}
      <section className="relative h-[350px] md:h-[450px] w-full flex items-center justify-center mt-0">
        <div className="absolute inset-0 z-0 bg-[#012d1d]/80">
          <img
            src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=1920&auto=format&fit=crop"
            alt="Layanan Pengaduan"
            className="w-full h-full object-cover mix-blend-overlay"
          />
        </div>
        <div className="relative z-10 text-center px-6 mt-10">
          <div className="inline-flex items-center gap-2 bg-[#febe9b] text-[#331200] px-4 py-1.5 rounded-full text-[13px] font-bold uppercase tracking-widest mb-6 shadow-sm">
            <Megaphone className="w-4 h-4" /> Suara Warga
          </div>
          <h1 className="text-[36px] md:text-[52px] font-extrabold text-white leading-tight drop-shadow-md">
            Layanan Pengaduan Online
          </h1>
          <p className="text-white/80 text-[16px] md:text-[18px] max-w-2xl mx-auto mt-4">
            Sampaikan aspirasi, laporan, atau keluhan Anda terkait pelayanan dan fasilitas di Desa Sukawangi secara aman dan transparan.
          </p>
        </div>
      </section>

      {/* BREADCRUMB */}
      <div className="bg-white/50 backdrop-blur-sm border-b border-[#c1c8c2]/50 sticky top-[80px] z-40">
        <div className="max-w-[1200px] mx-auto px-6 py-3 flex items-center gap-2 text-[14px] font-medium text-[#717973] overflow-x-auto whitespace-nowrap hide-scrollbar">
          <Link to="/" className="hover:text-[#012d1d] flex items-center gap-1"><Home className="w-4 h-4" /> Beranda</Link>
          <ChevronRight className="w-4 h-4 shrink-0" />
          <span className="text-[#012d1d] font-bold">Layanan Pengaduan</span>
        </div>
      </div>

      {/* 2. ALUR PENGADUAN */}
      <section className="py-16 bg-[#fbf9f5]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-[28px] font-bold text-[#012d1d] mb-2">Bagaimana Prosesnya?</h2>
            <p className="text-[16px] text-[#414844]">Pemerintah desa menjamin kerahasiaan dan tindak lanjut dari setiap laporan yang valid.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-1 bg-[#e4e2de] z-0"></div>

            <div className="relative z-10 flex flex-col items-center text-center bg-white p-8 rounded-2xl border border-[#c1c8c2]/40 shadow-sm">
              <div className="w-20 h-20 bg-[#febe9b]/30 rounded-full flex items-center justify-center text-[#835336] mb-6 shadow-inner border border-white"><FileText className="w-8 h-8" /></div>
              <h3 className="text-[18px] font-bold text-[#012d1d] mb-2">1. Tulis Laporan</h3>
              <p className="text-[14px] text-[#717973] leading-relaxed">Sampaikan keluhan dengan detail. Anda dapat memilih opsi anonim untuk merahasiakan identitas.</p>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center bg-white p-8 rounded-2xl border border-[#c1c8c2]/40 shadow-sm">
              <div className="w-20 h-20 bg-[#cde5ff] rounded-full flex items-center justify-center text-[#003f63] mb-6 shadow-inner border border-white"><Clock className="w-8 h-8" /></div>
              <h3 className="text-[18px] font-bold text-[#012d1d] mb-2">2. Verifikasi & Proses</h3>
              <p className="text-[14px] text-[#717973] leading-relaxed">Admin balai desa akan memverifikasi laporan maksimal 2x24 jam sebelum diteruskan ke unit terkait.</p>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center bg-[#012d1d] p-8 rounded-2xl shadow-lg transform md:-translate-y-2">
              <div className="w-20 h-20 bg-[#1b4332] rounded-full flex items-center justify-center text-[#febe9b] mb-6 shadow-inner border border-[#012d1d]"><CheckCircle className="w-8 h-8" /></div>
              <h3 className="text-[18px] font-bold text-white mb-2">3. Tindak Lanjut</h3>
              <p className="text-[14px] text-white/80 leading-relaxed">Aparatur desa akan menindaklanjuti keluhan dan menginformasikan status penyelesaiannya.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FORMULIR PENGADUAN & KONTAK DARURAT */}
      <section className="py-16 bg-[#f5f3ef] border-t border-[#c1c8c2]/30">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12 items-start">

            <div className="lg:w-8/12 w-full bg-white rounded-3xl p-8 md:p-12 shadow-md border border-[#c1c8c2]/40 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-[#012d1d]"></div>
              <div className="mb-8">
                <h2 className="text-[28px] font-bold text-[#012d1d] mb-2">Formulir Pengaduan</h2>
                <p className="text-[#717973] text-[15px]">Harap isi data dengan sebenar-benarnya agar laporan dapat diproses.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">

                <div className="bg-[#fbf9f5] p-5 rounded-xl border border-[#e4e2de] flex items-start gap-4 hover:border-[#c1c8c2] transition-colors">
                  <div className="flex items-center h-6">
                    <input
                      id="anonim"
                      name="isAnonim"
                      type="checkbox"
                      checked={formData.isAnonim}
                      onChange={handleChange}
                      className="w-5 h-5 text-[#012d1d] bg-white border-[#c1c8c2] rounded focus:ring-[#012d1d] focus:ring-2 cursor-pointer"
                    />
                  </div>
                  <div>
                    <label htmlFor="anonim" className="font-bold text-[#012d1d] cursor-pointer flex items-center gap-2">
                      <EyeOff className="w-4 h-4 text-[#835336]" /> Kirim sebagai Anonim
                    </label>
                    <p className="text-[13px] text-[#717973] mt-1">Identitas Anda tidak akan dipublikasikan atau diketahui oleh masyarakat umum, hanya untuk rekam jejak admin.</p>
                  </div>
                </div>

                {/* 3. TAMBAHAN UI: Kolom Nama, NIK, dan No. WA */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-[14px] font-bold text-[#012d1d] mb-2">Nama Lengkap <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      name="nama"
                      value={formData.nama}
                      onChange={handleChange}
                      required={!formData.isAnonim}
                      disabled={formData.isAnonim}
                      placeholder={formData.isAnonim ? "Identitas disembunyikan (Anonim)" : "Masukkan nama lengkap sesuai KTP"}
                      className={`w-full border text-[15px] rounded-xl focus:ring-[#012d1d] focus:border-[#012d1d] block p-3.5 transition-colors ${formData.isAnonim ? 'bg-[#e4e2de] border-[#c1c8c2] text-[#717973] cursor-not-allowed' : 'bg-[#fbf9f5] border-[#c1c8c2] text-[#1b1c1a]'}`}
                    />
                  </div>
                  <div>
                    <label className="block text-[14px] font-bold text-[#012d1d] mb-2">Nomor WhatsApp (Aktif) <span className="text-red-500">*</span></label>
                    <input
                      type="tel"
                      name="no_wa"
                      value={formData.no_wa}
                      onChange={handleChange}
                      required
                      placeholder="Contoh: 081234567890"
                      className="w-full bg-[#fbf9f5] border border-[#c1c8c2] text-[#1b1c1a] text-[15px] rounded-xl focus:ring-[#012d1d] focus:border-[#012d1d] block p-3.5 transition-colors"
                    />
                    <p className="text-[12px] text-[#717973] mt-1.5">Untuk mengirimkan status update laporan.</p>
                  </div>
                  <div>
                    <label className="block text-[14px] font-bold text-[#012d1d] mb-2">NIK KTP (Opsional)</label>
                    <input
                      type="number"
                      name="nik"
                      value={formData.nik}
                      onChange={handleChange}
                      placeholder="16 Digit NIK"
                      className="w-full bg-[#fbf9f5] border border-[#c1c8c2] text-[#1b1c1a] text-[15px] rounded-xl focus:ring-[#012d1d] focus:border-[#012d1d] block p-3.5 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[14px] font-bold text-[#012d1d] mb-2">Kategori Laporan <span className="text-red-500">*</span></label>
                  <select
                    name="kategori"
                    value={formData.kategori}
                    onChange={handleChange}
                    className="w-full bg-[#fbf9f5] border border-[#c1c8c2] text-[#1b1c1a] text-[15px] rounded-xl focus:ring-[#012d1d] focus:border-[#012d1d] block p-3.5 cursor-pointer appearance-none"
                  >
                    <option value="Infrastruktur & Lingkungan">Infrastruktur & Fasilitas Umum (Jalan rusak, dll)</option>
                    <option value="Pelayanan Publik">Administrasi & Pelayanan Balai Desa</option>
                    <option value="Keamanan & Ketertiban">Keamanan & Ketertiban Lingkungan</option>
                    <option value="Kesejahteraan Sosial">Bantuan Sosial & Kesejahteraan</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[14px] font-bold text-[#012d1d] mb-2">Detail Laporan / Kronologi <span className="text-red-500">*</span></label>
                  <textarea
                    name="pesan"
                    value={formData.pesan}
                    onChange={handleChange}
                    required
                    rows="5"
                    placeholder="Jelaskan secara detail masalah yang Anda temui, lokasi kejadian, dan waktu jika diperlukan..."
                    className="w-full bg-[#fbf9f5] border border-[#c1c8c2] text-[#1b1c1a] text-[15px] rounded-xl focus:ring-[#012d1d] focus:border-[#012d1d] block p-3.5 transition-colors resize-none"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-[14px] font-bold text-[#012d1d] mb-2">Lampiran Bukti (Foto/Dokumen)</label>
                  <div className="flex items-center justify-center w-full">
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-[#c1c8c2] border-dashed rounded-xl cursor-pointer bg-[#fbf9f5] hover:bg-[#efeeea] hover:border-[#012d1d] transition-colors">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                        <Upload className="w-8 h-8 mb-3 text-[#717973]" />
                        {previewName ? (
                          <p className="text-[14px] font-bold text-[#012d1d] truncate max-w-[200px] md:max-w-[400px]">{previewName}</p>
                        ) : (
                          <>
                            <p className="mb-2 text-[14px] text-[#414844]"><span className="font-bold">Klik untuk mengunggah</span> atau seret file ke sini</p>
                            <p className="text-[12px] text-[#717973]">Format .JPG, .PNG, atau .PDF (Maks. 5MB)</p>
                          </>
                        )}
                      </div>
                      <input id="dropzone-file" name="lampiran" type="file" className="hidden" onChange={handleChange} accept="image/*,.pdf" />
                    </label>
                  </div>
                </div>

                <div className="pt-6 border-t border-[#e4e2de]">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-[#012d1d] text-white px-10 py-4 rounded-xl text-[16px] font-bold hover:bg-[#1b4332] focus:ring-4 focus:ring-[#012d1d]/30 transition-all shadow-lg active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      'Memproses...'
                    ) : (
                      <><Send className="w-5 h-5" /> Kirim Laporan Sekarang</>
                    )}
                  </button>
                  <p className="text-[13px] text-[#717973] mt-4 flex items-start gap-1.5">
                    <Info className="w-4 h-4 shrink-0 mt-0.5" />
                    Dengan mengirimkan form ini, Anda menyatakan bahwa informasi yang diberikan adalah benar dan dapat dipertanggungjawabkan.
                  </p>
                </div>
              </form>
            </div>

            <div className="lg:w-4/12 w-full flex flex-col gap-6 sticky top-[150px]">
              <div className="bg-[#1b4332] text-white p-8 rounded-3xl shadow-lg relative overflow-hidden">
                <AlertTriangle className="absolute -bottom-6 -right-6 w-40 h-40 opacity-10" />
                <h3 className="text-[22px] font-bold mb-4 relative z-10 flex items-center gap-2">
                  <PhoneCall className="w-6 h-6 text-[#febe9b]" /> Kondisi Darurat?
                </h3>
                <p className="text-white/80 text-[15px] leading-relaxed mb-6 relative z-10">
                  Untuk kondisi darurat seperti bencana alam, kebakaran, atau ancaman keamanan, abaikan form ini dan segera hubungi:
                </p>

                <div className="space-y-4 relative z-10">
                  <a href="tel:112" className="flex items-center gap-4 bg-white/10 hover:bg-white/20 p-4 rounded-xl backdrop-blur-sm transition-colors border border-white/20 group">
                    <div className="bg-[#febe9b] p-3 rounded-lg text-[#331200] font-black text-xl group-hover:scale-110 transition-transform">112</div>
                    <div>
                      <p className="font-bold text-[16px]">Call Center Bencana</p>
                      <p className="text-[13px] text-white/70">Aktif 24 Jam</p>
                    </div>
                  </a>
                  <a href="#" className="flex items-center gap-4 bg-white/10 hover:bg-white/20 p-4 rounded-xl backdrop-blur-sm transition-colors border border-white/20 group">
                    <div className="bg-white p-3 rounded-lg text-[#012d1d] group-hover:scale-110 transition-transform"><ShieldCheck className="w-6 h-6" /></div>
                    <div>
                      <p className="font-bold text-[16px]">Bhabinkamtibmas</p>
                      <p className="text-[13px] text-white/70">Polsek</p>
                    </div>
                  </a>
                </div>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-[#c1c8c2]/40 shadow-sm">
                <h3 className="text-[18px] font-bold text-[#012d1d] mb-4">Tips Melapor yang Baik:</h3>
                <ul className="space-y-3 text-[14px] text-[#414844]">
                  <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-[#835336] shrink-0" /> Tuliskan lokasi secara spesifik (RT/RW atau patokan jalan).</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-[#835336] shrink-0" /> Lampirkan foto terbaru yang jelas (tidak buram).</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-5 h-5 text-[#835336] shrink-0" /> Gunakan bahasa yang sopan dan kronologis.</li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}