import { useState } from 'react';

export default function Pengaduan() {
  // 1. Menyesuaikan State dengan Kolom Database Awal
  const [nik, setNik] = useState('');
  const [nama, setNama] = useState('');
  const [judulLaporan, setJudulLaporan] = useState('');
  const [isiLaporan, setIsiLaporan] = useState('');
  const [fotoBukti, setFotoBukti] = useState(null);
  
  const [status, setStatus] = useState({ loading: false, success: false, error: false });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: false });

    const formData = new FormData();
    
    // Perhatikan: Nama-nama di sebelah kiri ini sekarang SUDAH SAMA PERSIS dengan database Anda
    formData.append('nik', nik);
    formData.append('nama_pelapor', nama); 
    formData.append('judul_laporan', judulLaporan);
    formData.append('isi_laporan', isiLaporan);
    
    if (fotoBukti) {
      formData.append('foto_bukti', fotoBukti);
    }

    try {
      const response = await fetch('http://localhost:8000/api/pengaduan', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: formData,
      });

      if (response.ok) {
        setStatus({ loading: false, success: true, error: false });
        // Kosongkan form setelah sukses
        setNik('');
        setNama('');
        setJudulLaporan('');
        setIsiLaporan('');
        setFotoBukti(null);
        setTimeout(() => setStatus({ loading: false, success: false, error: false }), 5000);
      } else {
        const errorData = await response.json();
        console.error("Error dari Laravel:", errorData);
        setStatus({ loading: false, success: false, error: true });
      }
    } catch (error) {
      console.error('Error Jaringan:', error);
      setStatus({ loading: false, success: false, error: true });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-20">
      
      <div className="text-center space-y-3 mb-12">
        <h1 className="text-4xl font-bold text-[#012d1d]">Layanan Pengaduan</h1>
        <p className="text-[#414844] max-w-2xl mx-auto">
          Pusat layanan pelaporan masyarakat Desa Sukawangi. Kami berkomitmen menindaklanjuti setiap laporan dengan transparan dan cepat.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-[#e4e2de] p-8">
            <h2 className="text-xl font-bold text-[#012d1d] mb-6 flex items-center gap-2">
              📝 Formulir Laporan
            </h2>
            
            {status.success && (
              <div className="mb-6 bg-[#c1ecd4] text-[#002114] p-4 rounded-xl font-semibold border border-[#a5d0b9]">
                ✅ Laporan Anda berhasil dikirim dan akan segera diproses oleh perangkat desa. Terima kasih!
              </div>
            )}
            
            {status.error && (
              <div className="mb-6 bg-[#ffdad6] text-[#93000a] p-4 rounded-xl font-semibold">
                ❌ Terjadi kesalahan! Mohon pastikan NIK dan data lainnya terisi dengan format yang benar.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Kolom NIK & Nama sejajar */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-[#1b1c1a] mb-2">NIK (16 Digit)</label>
                  <input 
                    type="text" 
                    required
                    maxLength="16"
                    value={nik}
                    onChange={(e) => setNik(e.target.value.replace(/\D/g, ''))} // Hanya izinkan angka
                    className="w-full px-4 py-3 bg-[#fbf9f5] border border-[#c1c8c2] rounded-xl focus:outline-none focus:border-[#012d1d] focus:ring-1 focus:ring-[#012d1d] transition"
                    placeholder="Masukkan NIK Anda"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#1b1c1a] mb-2">Nama Pelapor</label>
                  <input 
                    type="text" 
                    required
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    className="w-full px-4 py-3 bg-[#fbf9f5] border border-[#c1c8c2] rounded-xl focus:outline-none focus:border-[#012d1d] focus:ring-1 focus:ring-[#012d1d] transition"
                    placeholder="Nama Lengkap"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#1b1c1a] mb-2">Judul Laporan</label>
                <input 
                  type="text" 
                  required
                  value={judulLaporan}
                  onChange={(e) => setJudulLaporan(e.target.value)}
                  className="w-full px-4 py-3 bg-[#fbf9f5] border border-[#c1c8c2] rounded-xl focus:outline-none focus:border-[#012d1d] focus:ring-1 focus:ring-[#012d1d] transition"
                  placeholder="Contoh: Jalan Berlubang di RT 03"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#1b1c1a] mb-2">Detail Laporan</label>
                <textarea 
                  required
                  rows="4"
                  value={isiLaporan}
                  onChange={(e) => setIsiLaporan(e.target.value)}
                  className="w-full px-4 py-3 bg-[#fbf9f5] border border-[#c1c8c2] rounded-xl focus:outline-none focus:border-[#012d1d] focus:ring-1 focus:ring-[#012d1d] transition"
                  placeholder="Ceritakan kronologi atau keluhan Anda secara lengkap..."
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#1b1c1a] mb-2">Unggah Foto Bukti (Opsional)</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => setFotoBukti(e.target.files[0])}
                  className="w-full px-4 py-3 bg-[#fbf9f5] border border-[#c1c8c2] rounded-xl focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#e4e2de] file:text-[#012d1d] hover:file:bg-[#dbdad6]"
                />
              </div>

              <button 
                type="submit" 
                disabled={status.loading}
                className="w-full bg-[#012d1d] text-white font-bold py-3 px-4 rounded-xl hover:bg-[#1b4332] transition disabled:opacity-70 disabled:cursor-not-allowed shadow-md"
              >
                {status.loading ? 'Sedang Mengirim Laporan...' : 'Kirim Laporan Sekarang'}
              </button>
            </form>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[#012d1d] rounded-2xl shadow-sm p-8 text-[#e4e2de]">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="text-2xl">🕒</span> Jadwal Pelayanan
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between border-b border-[#1b4332] pb-2">
                <span>Senin - Kamis</span>
                <span className="font-semibold text-white">08.00 - 15.00 WIB</span>
              </div>
              <div className="flex justify-between border-b border-[#1b4332] pb-2">
                <span>Jumat</span>
                <span className="font-semibold text-white">08.00 - 14.00 WIB</span>
              </div>
              <div className="flex justify-between">
                <span>Sabtu - Minggu</span>
                <span className="font-semibold text-[#a5d0b9]">Tutup</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-[#e4e2de] p-8">
            <h3 className="text-xl font-bold text-[#012d1d] mb-6 flex items-center gap-2">
              <span className="text-2xl">📞</span> Kontak Penting
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4 bg-[#f5f3ef] p-4 rounded-xl">
                <div className="text-2xl">🚨</div>
                <div>
                  <p className="text-xs font-bold text-[#835336] uppercase tracking-wider">Darurat Desa</p>
                  <p className="font-bold text-[#012d1d]">0811-2233-4455</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-[#f5f3ef] p-4 rounded-xl">
                <div className="text-2xl">💬</div>
                <div>
                  <p className="text-xs font-bold text-[#835336] uppercase tracking-wider">WhatsApp Layanan</p>
                  <p className="font-bold text-[#012d1d]">0812-3456-7890</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}