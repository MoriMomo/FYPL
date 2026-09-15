import type { FaqItem } from "@/types";

export type FaqCategory = "freshman" | "leader" | "partner";

export const FAQ_DATA: Record<FaqCategory, FaqItem[]> = {
  freshman: [
    {
      id: "freshman-1",
      question:
        "Bagaimana jika saya mengalami kendala saat melakukan absensi (WiFi Attendance atau Binusmaya)?",
      answer:
        "Jika Anda mengalami kesulitan login ke Binusmaya atau WiFi Attendance bermasalah (seperti halaman log in tidak muncul atau scan QR merah terutama di iOS), segera laporkan ke Freshmen Leader (FL) agar kehadiran Anda dicatat secara manual di sesi tersebut.",
    },
    {
      id: "freshman-2",
      question:
        "Bagaimana jika nama saya tidak terdata di absensi kelas atau jadwal di Binusmaya tidak sesuai?",
      answer:
        "Segera laporkan ke FL kelas Anda agar dapat dikoordinasikan dengan tim IT dan Admission. Beberapa freshmen mungkin mengalami keterlambatan sinkronisasi jadwal atau salah ruangan kelas (misal tertukar ABN/ruangan).",
    },
    {
      id: "freshman-3",
      question:
        "Apa yang harus saya lakukan jika belum mendapatkan Flazzcard, lanyard, atau almamater?",
      answer:
        "Jika Anda belum terdaftar, belum menerima Flazzcard (BINUSIAN Card), lanyard, atau almamater karena terlambat mendaftar atau kesalahan data logistik, harap lapor ke FL pendamping Anda agar dicatat di form kendala logistik dan dapat diproses susulan ke Admission.",
    },
    {
      id: "freshman-4",
      question:
        "Bagaimana jika ukuran almamater yang diterima tidak sesuai (kekecilan/kebesaran) atau terdapat kerusakan (seperti kancing lepas)?",
      answer:
        "Anda dapat mengajukan penukaran atau retur ukuran almamater melalui tim logistik Admission dengan mencatat kendala pada lembar retur melalui bantuan FL kelas Anda.",
    },
    {
      id: "freshman-5",
      question:
        "Mengapa jaringan internet (WiFi) di kelas lambat dan server AOB/Binusmaya lemot?",
      answer:
        "Pada hari-hari pertama FYP, lalu lintas server sangat padat. Jika komputer atau web AOB lemot, silakan laporkan ke FL. Jangan melakukan klik atau uncheck sembarangan di web AOB agar data ukuran almet/logistik Anda tidak terubah otomatis menjadi ukuran default (S).",
    },
  ],
  leader: [
    {
      id: "leader-1",
      question:
        "Bagaimana jika sistem absensi QR untuk FL error, Binusmaya down, atau saya lupa melakukan scan?",
      answer:
        "Jangan panik. Segera amankan bukti kehadiran dengan mengisi file monitoring. Setelah itu, segera hubungi koordinator FYPL pada hari yang sama untuk melaporkan kendala tersebut agar dapat diverifikasi. Jangan menunda laporan hingga esok hari agar status absensi tidak terkunci.",
    },
    {
      id: "leader-2",
      question:
        "Apa yang harus dilakukan jika terjadi kekacauan/penumpukan saat pembagian Flazzcard dan almamater?",
      answer:
        "Pembagian tugas harus jelas: delegasikan minimal satu FL untuk mengontrol barisan, satu FL mencocokkan tanda tangan freshmen di lembar serah terima, dan satu FL mengambil logistik. Jika petugas pembagian kewalahan (misal hanya ada 1 staff logistik), FL/FYPL lainnya wajib berinisiatif membackup proses distribusi.",
    },
    {
      id: "leader-3",
      question:
        "Bagaimana mengantisipasi kesalahan tanda tangan freshmen pada lembar rekap logistik?",
      answer:
        "Pastikan nomor baris di tabel rekap sesuai dengan data freshmen. Dampingi freshmen secara langsung saat tanda tangan dan minta mereka membaca nama serta ukuran almet dengan teliti agar tidak menandatangani kolom milik orang lain.",
    },
    {
      id: "leader-4",
      question:
        "Apa alternatifnya jika menu Logbook atau Session Log di Binusmaya tidak muncul, error, atau tanggalnya kosong?",
      answer:
        "Segera alihkan pencatatan dengan melakukan pengisian File Monitoring secara berkala. Catat seluruh poin aktivitas kelas (tanggal, waktu, topik bahasan, jumlah absen, dan kondisi kelas) langsung ke dalam File Monitoring yang telah disediakan oleh koordinator. Jadikan file ini sebagai laporan utama yang selalu terupdate sambil menunggu instruksi lebih lanjut terkait sistem Binusmaya.",
    },
    {
      id: "leader-5",
      question:
        "Apa yang harus dilakukan jika kelas terasa sepi, freshmen pasif, bosan, atau sibuk bermain HP?",
      answer:
        "Persiapkan rundown cadangan dan game ice-breaking menarik untuk mengisi waktu kosong (misal ketika penjelasan materi selesai lebih cepat). FL dilarang berkumpul sendiri di depan kelas; berbaurlah dan ajak freshmen berinteraksi secara aktif.",
    },
    {
      id: "leader-6",
      question:
        "Bagaimana menyikapi info perubahan jadwal kelas atau penggabungan ABN yang mendadak dari FYPL?",
      answer:
        "Bila mendapat kabar penggabungan kelas secara mendadak, segera berkoordinasi dengan FL/FP kelas mitra untuk berbagi peran penyampaian materi (siapa PIC mic utama, siapa yang backup teknis). Hal ini mencegah miss-komunikasi atau berebutan menjelaskan materi di depan kelas.",
    },
    {
      id: "leader-7",
      question:
        "Bagaimana cara mendampingi freshmen dengan kebutuhan khusus atau disabilitas (misal: tunarungu) agar tidak merasa tertinggal?",
      answer:
        "Terapkan 'Buddy System'. Dedikasikan satu FP/FL untuk menjadi pendamping khusus bagi freshmen tersebut. Pastikan ia duduk di barisan paling depan agar bisa melihat presentasi. Gunakan komunikasi visual seperti mengetik di notes HP/Tablet atau menggunakan secarik kertas untuk menjelaskan instruksi yang terlewat. Jaga komunikasi tetap empatik, sabar, dan inklusif.",
    },
    {
      id: "leader-8",
      question:
        "Langkah apa yang harus diambil jika terjadi miskomunikasi rundown kegiatan atau briefing pagi terlambat (ngaret)?",
      answer:
        "Terapkan aturan 'Prioritas 5 Menit'. Jika waktu sudah sangat mepet dengan kedatangan freshmen, hentikan perdebatan detail. Segera tentukan 3 peran paling vital saja: Siapa yang membuka kelas, siapa yang menyiapkan absensi, dan siapa yang menyalakan proyektor/materi. Sisa detail rundown yang belum jelas bisa didiskusikan secara dinamis melalui grup chat khusus FL saat kelas sedang berlangsung.",
    },
    {
      id: "leader-9",
      question:
        "Apa tindakan darurat pertama jika fasilitas fisik kelas bermasalah (misal: AC panas, mati lampu, atau speaker noise parah)?",
      answer:
        "Pertama, sampaikan permintaan maaf yang kasual kepada freshmen atas ketidaknyamanan tersebut untuk menjaga suasana tetap positif (misal: 'Wah, lagi tes mental nih AC-nya, sabar ya teman-teman'). Kedua, tugaskan satu FL untuk segera melapor ke FYPL. Sementara menunggu perbaikan, kondisikan kelas dengan aktivitas verbal ringan atau ice-breaking sederhana agar freshmen tetap tenang.",
    },
    {
      id: "leader-10",
      question:
        "Bagaimana mengelola mobilisasi freshmen dalam jumlah besar (misal saat menuju Atrium atau pulang)?",
      answer:
        "Tentukan rute mobilisasi dengan matang. Satu FL/FP bertindak sebagai penunjuk jalan di depan (lead), sementara yang lain merapikan barisan di tengah dan belakang (sweep). Lakukan koordinasi waktu agar tidak bentrok dengan ABN lain di lorong/tangga.",
    },
    {
      id: "leader-11",
      question:
        "Mengapa sesi kegiatan (FYP Opening, Briefing, Curriculum, BINUS DNA, NGO Sharing, dll.) tidak muncul di Logbook atau Schedule?",
      answer:
        "Sesi tidak muncul umumnya terjadi karena dua hal: pilihan Course Code & Class Code belum disesuaikan dengan jadwal di LMS, atau akun FL belum ter-mapping sebagai instructor pada course tersebut (misalnya pada sesi ABN-04 atau NGO). Pastikan kode kelas yang dipilih sesuai dengan LMS. Jika opsi kelas tampil 'No Option', segera laporkan ke koordinator FYPL untuk perbaikan data mapping instructor.",
    },
    {
      id: "leader-12",
      question:
        "Mengapa data Logbook yang sudah diisi berubah/berbeda atau gagal tersimpan saat di-submit?",
      answer:
        "Kendala ini terjadi ketika ada penyesuaian kelas di LMS atau ketidaksesuaian Course Code/Class Code. Pastikan kembali Course Code (misal OPN1001, NEXT1004, NEXT1062, dsb.) dan Class Code (seperti OK01, DK01, LB11, dsb.) di sistem sudah tepat sesuai LMS, kemudian isi ulang logbook. Jika kendala masih berlanjut, laporkan ke koordinator FYPL.",
    },
    {
      id: "leader-13",
      question:
        "Mengapa ada Freshmen yang tidak dapat di-checklist di Logbook atau status hadirnya berubah menjadi silang setelah submit?",
      answer:
        "Meskipun pengecekan logbook dilakukan berbasis pairingan, sistem tetap melakukan validasi session attendance ke LMS. Jika mahasiswa tersebut belum ada jadwal di LMS pada sesi tersebut, logbook tidak bisa otomatis mencentang kehadirannya. Lakukan centang kehadiran secara manual di logbook dan pastikan kelas Freshmen sama dengan kelas yang diajar. Jika mahasiswa belum terdaftar jadwal di LMS, laporkan NIM & nama mahasiswa ke tim IT/Admission.",
    },
    {
      id: "leader-14",
      question:
        "Bagaimana jika absensi otomatis sesi (seperti Student Life atau NGO Sharing) mencatat 0 hadir atau hanya tercentang sebagian?",
      answer:
        "Anda tidak perlu khawatir jika absensi otomatis tidak langsung merekam seluruh Freshmen. FL/FP dapat mencentang daftar kehadiran Freshmen secara manual pada halaman Logbook. Pastikan kelas Freshmen dan kelas diajar sudah sama, lalu lakukan submit session log kembali.",
    },
  ],
  partner: [
    {
      id: "partner-1",
      question:
        "Bagaimana peran Freshman Partner (FP) saat terjadi kendala pengisian Logbook atau sesi yang tidak muncul?",
      answer:
        "Freshman Partner (FP) bertugas mendampingi FL dalam verifikasi absensi dan ketertiban kelas. Jika FL terkendala saat mengakses Logbook Binusmaya (misal sesi belum muncul karena FL belum ter-mapping sebagai instructor), FP dapat membantu mencatat absensi mahasiswa secara manual di File Monitoring dan memastikan data pairingan Freshmen dengan LMS sudah sesuai.",
    },
    {
      id: "partner-2",
      question:
        "Apa yang harus dilakukan FP jika ada Freshmen yang jadwal LMS-nya belum muncul sehingga tidak bisa di-checklist?",
      answer:
        "FP perlu mencatat data mahasiswa tersebut (NIM, Nama Lengkap, dan Kelas ABN) pada lembar absensi manual. Dampingi mahasiswa agar tetap mengikuti seluruh rangkaian kegiatan sesi dengan tenang, lalu serahkan data tersebut ke FL/Koordinator FYPL untuk diajukan penyesuaian jadwal ke Admission/IT.",
    },
    {
      id: "partner-3",
      question:
        "Bagaimana memastikan absensi sesi khusus (seperti NGO Sharing, BINUS DNA, dan Student Life) berjalan lancar?",
      answer:
        "Pastikan FP dan FL telah mencocokkan Course Code dan Class Code sesuai penjadwalan LMS sebelum sesi dimulai. Dampingi Freshmen saat melakukan scan/attendance, dan jika hasil submit absensi di logbook berkurang/disilang, bantu FL untuk mencentang kembali kehadiran secara manual.",
    },
  ],
};

export const FAQ_TABS = [
  { id: "freshman", label: "Freshman", activeClass: "bg-pink text-white shadow-pink/30" },
  { id: "leader", label: "Freshman Leader", activeClass: "bg-cyan text-white shadow-cyan/30" },
  {
    id: "partner",
    label: "Freshman Partner",
    activeClass: "bg-linear-to-r from-pink to-cyan text-white shadow-pink/20",
  },
] as const;
