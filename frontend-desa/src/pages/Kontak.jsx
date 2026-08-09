import { useState } from 'react';

export default function Kontak() {
  const [nama, setNama] = useState('');
  const [keperluan, setKeperluan] = useState('');
  const [pesan, setPesan] = useState('');

  // Fungsi untuk mengirim pesan langsung ke WhatsApp Admin Desa
  const kirimKeWhatsApp = (e) => {
    e.preventDefault();
    
    // Nomor WhatsApp Admin Desa (Ganti dengan nomor asli nantinya, pastikan awali dengan 62)
    const nomorWA = "6281234567890"; 
    
    // Merakit format teks pesan
    const teksWA = `Halo Admin Desa Sukawangi,%0A%0APerkenalkan saya *${nama}*.%0ASaya ingin menanyakan perihal: *${keperluan}*.%0A%0A${pesan}%0A%0ATerima kasih.`;
    
    // Membuka tab baru menuju link WhatsApp
    window.open(`https://wa.me/${nomorWA}?text=${teksWA}`, '_blank');
    
    // Kosongkan form setelah diklik
    setNama('');
    setKeperluan('');
    setPesan('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-20 space-y-12">
      
      {/* JUDUL HALAMAN */}
      <div className="text-center space-y-3 mb-10">
        <h1 className="text-4xl font-bold text-[#012d1d]">Hubungi Kami</h1>
        <p className="text-[#414844] max-w-2xl mx-auto text-lg">
          Kami siap membantu Anda. Silakan hubungi kami melalui formulir di bawah ini atau kunjungi langsung kantor desa kami.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        
        {/* KOLOM KIRI: FORMULIR WHATSAPP */}
        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-[#e4e2de]">
          <h2 className="text-2xl font-bold text-[#012d1d] mb-8">Kirim Pesan Cepat (WhatsApp)</h2>
          
          <form onSubmit={kirimKeWhatsApp} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-[#1b1c1a] mb-2">Nama Lengkap</label>
              <input 
                type="text" 
                required
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                className="w-full px-4 py-3 bg-[#fbf9f5] border border-[#c1c8c2] rounded-xl focus:outline-none focus:border-[#012d1d] focus:ring-1 focus:ring-[#012d1d] transition"
                placeholder="Masukkan nama lengkap Anda"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#1b1c1a] mb-2">Subjek / Keperluan</label>
              <input 
                type="text" 
                required
                value={keperluan}
                onChange={(e) => setKeperluan(e.target.value)}
                className="w-full px-4 py-3 bg-[#fbf9f5] border border-[#c1c8c2] rounded-xl focus:outline-none focus:border-[#012d1d] focus:ring-1 focus:ring-[#012d1d] transition"
                placeholder="Contoh: Informasi Pembuatan KTP"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#1b1c1a] mb-2">Pesan Anda</label>
              <textarea 
                required
                rows="5"
                value={pesan}
                onChange={(e) => setPesan(e.target.value)}
                className="w-full px-4 py-3 bg-[#fbf9f5] border border-[#c1c8c2] rounded-xl focus:outline-none focus:border-[#012d1d] focus:ring-1 focus:ring-[#012d1d] transition"
                placeholder="Tuliskan pertanyaan atau pesan Anda di sini..."
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="w-full bg-[#012d1d] text-white font-bold py-4 px-4 rounded-xl hover:bg-[#1b4332] transition flex items-center justify-center gap-2 shadow-md"
            >
              <span className="text-xl">💬</span> Kirim Pesan via WhatsApp
            </button>
          </form>
        </div>

        {/* KOLOM KANAN: INFORMASI & MAPS */}
        <div className="space-y-8">
          
          {/* Kotak Informasi Kontak */}
          <div className="bg-[#f5f3ef] p-8 md:p-10 rounded-3xl shadow-sm border border-[#e4e2de] space-y-8">
            <h3 className="text-2xl font-bold text-[#012d1d]">Informasi Kontak</h3>
            
            <div className="space-y-6">
              <div className="flex gap-5 items-start">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm text-2xl border border-[#e4e2de]">📍</div>
                <div>
                  <h4 className="font-bold text-[#012d1d]">Alamat Kantor Desa</h4>
                  <p className="text-[#414844] mt-1 leading-relaxed">
                    Jl. Sukawangi No. 1, Kecamatan Warungkondang,<br/>
                    Kabupaten Cianjur, Jawa Barat 43261
                  </p>
                </div>
              </div>

              <div className="flex gap-5 items-start">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm text-2xl border border-[#e4e2de]">✉️</div>
                <div>
                  <h4 className="font-bold text-[#012d1d]">Email Resmi</h4>
                  <p className="text-[#414844] mt-1">info@sukawangi.desa.id</p>
                </div>
              </div>

              <div className="flex gap-5 items-start">
                <div className="w-12 h-12 bg-[#012d1d] text-white rounded-full flex items-center justify-center shrink-0 shadow-sm text-xl border border-[#012d1d]">📞</div>
                <div>
                  <h4 className="font-bold text-[#012d1d]">Telepon Layanan</h4>
                  <p className="text-[#414844] mt-1">(0263) 1234567</p>
                </div>
              </div>
            </div>
          </div>

          {/* Kotak Peta (Google Maps Embed) */}
          <div className="w-full h-72 bg-[#e4e2de] rounded-3xl overflow-hidden shadow-sm border border-[#e4e2de]">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126748.60912411891!2d106.96172605335198!3d-6.837834510006246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e684ce3a4130097%3A0xc3b8eb295ff68f12!2sWarungkondang%2C%20Kabupaten%20Cianjur%2C%20Jawa%20Barat!5e0!3m2!1sid!2sid!4v1715000000000!5m2!1sid!2sid" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Peta Desa Sukawangi"
            ></iframe>
          </div>

        </div>

      </div>
    </div>
  );
}