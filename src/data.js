// ====== GANTI DI SINI untuk mengubah isi website ======

// Supaya path gambar tetap benar saat situs berada di /portofolio/ (GitHub Pages)
export const asset = (p) =>
  p && p.startsWith("/") ? import.meta.env.BASE_URL + p.slice(1) : p;

export const profile = {
  brand: "FarisRnr",
  name: "Faris Raihan Nur Rahmat",
  fullName: "Faris Raihan Nur Rahmat",
  roles: ["Junior Web Developer", "GIS Enthusiast", "Remote Sensing"],
  intro:
    "I turn data and geospatial information into insights that support better decisions.",
  about: [
    "I'm an Informatics graduate from Universitas Ahmad Dahlan who enjoys building websites. I work with JavaScript, PHP, MySQL, React, and Tailwind CSS, and I like turning Figma designs into responsive pages that people can actually use.",
    "I'm also learning GIS. For my thesis, I used satellite imagery, Google Earth Engine, and Python to study land-cover change in Bantul, and that is where my interest in maps and spatial data began.",
    "I'm early in my career and looking for opportunities to learn, build real projects, and grow with a supportive team.",
  ],
  email: "farisraihanr@gmail.com",
  resumeUrl: "https://drive.google.com/drive/folders/1KErSjHKjTfayBnEPt6vZBeXcxxeSdM2T?hl=ID", // sebaiknya link FILE CV, atau taruh di /public lalu isi asset("/CV-Faris-Raihan.pdf")
  github: "https://github.com/faris-raihan",
  linkedin: "https://www.linkedin.com/in/faris-raihan-nur-rahmat",
  tagline: ["Your vision.", "A greener future."],
  instagram: "https://www.instagram.com/faris.rhn",
  phone: "+62 899-5897-629",
  location: "Yogyakarta, Indonesia",
};

// Gambar. Ekspor dari Figma lalu simpan di /public/assets/ (lihat README)
export const images = {
  earth: "/assets/homeearth.png", // background hero (image 26 di Figma)
  portrait: "/assets/profileimagefaris.png", // foto kamu (boleh diganti hasil ekspor "image 31")
  expertise: "/assets/proyek/proyek2.webp", // gambar yang muncul saat hover keahlian
};

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Project", href: "#project" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export const stats = {
  skills: "10+",
  skillsLabel: "Number of Skills",
};

// Isi pop-up "Lihat Detail" ada di field `detail` (semua bagiannya opsional).
// Foto "Behind the Scenes": simpan di /public/assets/proyek/galeri/ lalu isi `gallery`.
export const projects = [
  {
    id: 1,
    nama: "Website Perkebunan Digital",
    desk: "Platform resmi yang menampilkan profil bisnis dalam bidang pengembangan solusi agribisnis dan teknologi perkebunan yang modern, efisien, dan berkelanjutan.",
    gambar: "/assets/proyek/halamanHomeUser.png",
    tools: ["HTML", "CSS", "Javascript", "PHP", "MYSQL", "BOOTSTRAP"],
    link: "https://github.com/faris-raihan/Kebun-Wiyono",
    linkLabel: "Lihat di GitHub",
    detail: {
      overview:
        "Website profil untuk bisnis perkebunan (Kebun Wiyono) yang menampilkan tentang usaha, metode budidaya, dan produknya dengan tampilan modern dan responsif.",
      fitur: [
        "Membangun tampilan halaman dengan HTML, CSS, dan Bootstrap",
        "Membuat layout yang responsif di desktop dan HP",
        "Membuat fitur login dan dashboard admin dengan PHP dan MySQL",
      ],
      links: [{ label: "Code on GitHub", href: "https://github.com/faris-raihan/Kebun-Wiyono" }],
      gallery: [
        { src: "/assets/proyek/tampilanLoginProject.png", caption: "Tampilan login halaman projek." },
        { src: "/assets/proyek/halamanDashboardAdmin.png", caption: "Halaman dashboard untuk admin yang menyediakan fitur manajemen data perkebunan, termasuk penambahan, pengeditan, dan penghapusan data tanaman serta pengguna." },
        { src: "/assets/proyek/cuplikanScript.png", caption: "Cuplikan kode program yang menunjukkan bagaimana fitur-fitur utama dalam aplikasi diimplementasikan, termasuk logika bisnis dan interaksi dengan database." },
        { src: "/assets/proyek/cuplikanDatabase.png", caption: "Cuplikan struktur database yang digunakan dalam sistem informasi perkebunan MPTI. Database ini menyimpan semua data terkait tanaman, pengguna, dan aktivitas perkebunan." },
      ],
    },
  },
  {
    id: 2,
    nama: "Peta Perubahan Tutupan Lahan Di Bantul pada Tahun 2016-2025",
    desk: "Analisis perubahan tutupan lahan 17 kecamatan di Kabupaten Bantul periode 2016–2025 memakai citra Landsat 8, NDVI/NDBI, klasifikasi Random Forest, dan simulasi skenario 2028 dengan QGIS MOLUSCE. Dari skripsi Informatika UAD.",
    gambar: "/assets/proyek/proyekskripsi.png",
    tools: ["Landsat 8", "Google Earth Engine", "Python", "Random Forest", "QGIS MOLUSCE"],
    link: "https://github.com/faris-raihan/bantul-lulc-change",
    linkLabel: "Lihat di GitHub",
    detail: {
      overview:
        "Skripsi Informatika UAD yang menganalisis perubahan tutupan lahan di 17 kecamatan Kabupaten Bantul periode 2016–2025, lalu mensimulasikan skenario tahun 2028.",
      peran: "Mengerjakan seluruh analisis: pengolahan citra, klasifikasi, analisis tren, dan simulasi.",
      fitur: [
        "Mengolah citra Landsat 8 di Google Earth Engine (indeks NDVI dan NDBI)",
        "Mengklasifikasikan tutupan lahan dengan Random Forest dan menghitung akurasinya",
        "Menganalisis tren dan prediksi dengan Python (Moving Average dan regresi linear)",
        "Mensimulasikan skenario 2028 dengan QGIS MOLUSCE",
      ],
      links: [{ label: "Code on GitHub", href: "https://github.com/faris-raihan/bantul-lulc-change" }],
      gallery: [
        { src: "/assets/proyek/Peta_Lokasi_Penelitian_Kabupaten_Bantul.png", caption: "Peta lokasi penelitian berada di Bantul." },
        { src: "/assets/proyek/cuplikanGEE.png", caption: "Mengolah citra Landsat di Google Earth Engine." },
        { src: "/assets/proyek/Hasil_Klasifikasi_LULC_2016_2020_2025.png", caption: "Hasil klasifikasi tutupan lahan Bantul tahun 2016, 2020, dan 2025 dengan Random Forest." },
        { src: "/assets/proyek/petaprediksi2028_portofolio.png", caption: "Peta prediksi tutupan lahan Bantul tahun 2028 hasil simulasi QGIS MOLUSCE." },
        { src: "/assets/proyek/cuplikancodepython.png", caption: "Mengolah hasil csx dari GEE ke dalam python untuk menghasilkan grafik menggunakan Moving Average dan Regresi Linear." },
      ],
    },
  },
  {
    id: 3,
    nama: "Projek di LifeMedia",
    desk: "Proyek yang saya kerjakan bersama tim di LifeMedia, mencakup pengembangan web dan pengujian aplikasi (QA) di perangkat asli.",
    gambar: "/assets/proyek/lifemedia-ber4.png",
    tools: ["JavaScript", "PHP", "Figma", "Ms Word"],
    link: "#",
    linkLabel: "Lihat proyek",
    detail: {
      overview:
        "Pengalaman bekerja bersama tim di LifeMedia. Saya terlibat dalam pengembangan tampilan web dan pengujian aplikasi, termasuk fitur yang memakai Google Maps API, langsung di perangkat asli.",
      fitur: [
        "Pembuatan dokumentasi dashboard ACS",
        "Pembuatan UI dashboard menggunakan Figma",
        "Menguji aplikasi Montir Presisi di perangkat android sebagai QA tester",
        "Memeriksa fitur peta yang memakai Google Maps API",
      ],
      // Tombol hijau di pop-up (color: "green").
      links: [
        {
          label: "Dokumentasi",
          href: "https://drive.google.com/drive/folders/1WKLU_EeomSLuhUWpcgOGCH0kF-q1HQWF?hl=ID",
          color: "green",
        },
        {
          label: "Desain Figma",
          href: "https://www.figma.com/design/xHLTnmycKgQE9BU4Wee5gN/Dashboard-monitoring?node-id=0-1&t=2qkzjgbQ7iWr9sJo-0",
        },
      ],
      gallery: [
        { src: "/assets/proyek/shift-malam.png", caption: "Foto bersama tim UAD di LifeMedia." },
        { src: "/assets/proyek/rancangan-figma.png", caption: "Merancang desain antarmuka di Figma, lalu mengimplementasikannya menjadi web dashboard ACS yang responsif dengan PHP dan JavaScript bersama tim pengembang." },
        { src: "/assets/proyek/rancangan-kita.png", caption: "Cuplikan dashboard ACS yang telah dibuat bersama tim pengembang." },
        { src: "/assets/proyek/presentasi-office.png", caption: "Mendemokan WiFi Koin kepada siswa SMK yang berkunjung ke LifeMedia dalam kegiatan kunjungan industri." },
        { src: "/assets/proyek/help-noc.png", caption: "Bersama rekan, membantu tim NOC LifeMedia memastikan koneksi tetap stabil untuk pemain esport eFootball yang bertanding memakai jaringan LifeMedia." },
        { src: "/assets/proyek/testing-montirpresisi.png", caption: "Sesi pengujian (testing) aplikasi Android Montir Presisi bersama tim dan pihak klien." },
        { src: "/assets/proyek/penyediajaringan.png", caption: "Bersama rekan tim, membantu menyediakan saluran internet untuk sebuah acara di lapangan." },
      ],
    },
  },
  {
    id: 4,
    nama: "Web Portfolio",
    desk: "Website portofolio pribadi yang menampilkan profil, keterampilan, dan proyek sebagai Web Developer dengan tampilan modern dan responsif.",
    gambar: "/assets/proyek/webporto.png",
    tools: ["React JS", "Tailwind CSS", "Javascript", "Vite"],
    link: "#",
    detail: {
      overview:
        "Website portofolio pribadi yang saya desain di Figma lalu saya bangun dengan React, Tailwind CSS, dan Vite. Menampilkan profil, keahlian, proyek, dan kontak.",
      peran: "Mendesain di Figma dan mengimplementasikannya sendiri.",
      fitur: [
        "Mengubah desain Figma menjadi halaman web yang responsif",
        "Membuat pop-up detail proyek dan daftar keahlian dengan gambar saat hover",
      ],
    },
  },
];

export const expertise = [
  { id: 1, nama: "Frontend Development", tools: "React JS • Tailwind CSS • JavaScript", gambar: "/assets/proyek/proyek1.webp" },
  { id: 2, nama: "UI Implementation", tools: "Figma • HTML • CSS • Responsive Design", gambar: "/assets/proyek/webporto.png" },
  { id: 3, nama: "Quality Assurance (QA) Tester", tools: "Real Device • Google Maps API", gambar: "/assets/proyek/lifemedia-ber4.png" },
  { id: 4, nama: "Spatial Analysis", tools: "QGIS • Google Earth Engine", gambar: "/assets/proyek/proyekskripsi.png" },
  { id: 5, nama: "Remote Sensing", tools: "Landsat 8 • NDVI • NDBI", gambar: "/assets/proyek/proyekskripsi.png" },
  { id: 6, nama: "Land Cover Modeling", tools: "QGIS MOLUSCE • Random Forest", gambar: "/assets/proyek/proyekskripsi.png" },
  { id: 7, nama: "Geospatial Automation", tools: "Python • Google Earth Engine", gambar: "/assets/proyek/proyekskripsi.png" },
  { id: 8, nama: "Cartography", tools: "Map Design • Data Visualization", gambar: "/assets/proyek/proyekskripsi.png" },
];

// --- perbaiki path agar jalan di GitHub Pages (jangan dihapus) ---
for (const k of Object.keys(images)) images[k] = asset(images[k]);
for (const p of projects) {
  p.gambar = asset(p.gambar);
  p.detail?.gallery?.forEach((g) => (g.src = asset(g.src)));
}
for (const e of expertise) e.gambar = asset(e.gambar);