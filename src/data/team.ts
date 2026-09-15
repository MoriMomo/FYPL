export interface TeamMember {
  id: string;
  name: string;
  image: string;
  accentColor: string;
  description: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "t01",
    name: "School of Design",
    image: "/team/SOD.png",
    accentColor: "#E8185A",
    description:
      "Mengembangkan solusi desain yang inovatif dan berpusat pada pengguna untuk proyek FYP.",
  },
  {
    id: "t02",
    name: "School of Computer Science",
    image: "/team/SOCS.png",
    accentColor: "#45C8D8",
    description:
      "Membangun sistem dan aplikasi teknis yang menjadi tulang punggung proyek FYP.",
  },
  {
    id: "t03",
    name: "School of Information Systems",
    image: "/team/sois.png",
    accentColor: "#E8185A",
    description:
      "Merancang arsitektur informasi dan integrasi sistem untuk mendukung proyek.",
  },
  {
    id: "t04",
    name: "Faculty of Engineering",
    image: "/team/teknik.png",
    accentColor: "#45C8D8",
    description:
      "Menerapkan prinsip rekayasa untuk menyelesaikan tantangan teknis proyek FYP.",
  },
  {
    id: "t05",
    name: "Faculty of Digital Communication & Hotel Management",
    image: "/team/FCDHT.png",
    accentColor: "#E8185A",
    description:
      "Menghadirkan strategi komunikasi dan pengalaman layanan dalam proyek FYP.",
  },
  {
    id: "t06",
    name: "Binus Business School",
    image: "/team/BBS.png",
    accentColor: "#45C8D8",
    description:
      "Menyusun strategi bisnis dan model keberlanjutan untuk proyek FYP.",
  },
  {
    id: "t07",
    name: "School of Accounting",
    image: "/team/SOA.png",
    accentColor: "#E8185A",
    description:
      "Mengelola aspek keuangan dan akuntabilitas dalam pelaksanaan proyek FYP.",
  },
  {
    id: "t08",
    name: "Faculty of Humanity",
    image: "/team/foh.png",
    accentColor: "#45C8D8",
    description:
      "Membawa perspektif sosial dan humaniora ke dalam pendekatan proyek FYP.",
  },
];
