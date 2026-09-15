export interface TimelineItem {
  id: string;
  color: string; // Tailwind bg-* class
  accentColor: string; // hex, for JS-driven styling
  label: string;
  description: string;
}

export const TIMELINE_ITEMS: TimelineItem[] = [
  {
    id: "01",
    color: "bg-pink",
    accentColor: "#E8185A",
    label: "PRE-FYP",
    description:
      "Kegiatan sebelum dimulainya FYP. Kesempatan pertama Freshmen untuk mengenal lebih dalam tentang fakultas dan program studi pilihan.",
  },
  {
    id: "02",
    color: "bg-cyan",
    accentColor: "#45C8D8",
    label: "OPENING FYP",
    description:
      "Tanda resmi dimulainya program FYP. Upacara pembukaan dilaksanakan serentak di seluruh kampus BINUS University.",
  },
  {
    id: "03",
    color: "bg-navy-dark",
    accentColor: "#2A3B9E",
    label: "NEXT",
    description:
      "New Student Experience and Transition — pembekalan visi, misi, budaya kampus, dan kehidupan akademik bersama Freshmen Leader.",
  },
  {
    id: "04",
    color: "bg-navy-dark",
    accentColor: "#2A3B9E",
    label: "ACADEMIC ORIENTATION",
    description:
      "Pengenalan mendalam jurusan, kurikulum 4 tahun, dan pimpinan program studi yang dikemas seperti simulasi perkuliahan.",
  },
  {
    id: "05",
    color: "bg-pink",
    accentColor: "#E8185A",
    label: "INAUGURATION",
    description:
      "Upacara peresmian mahasiswa baru BINUS University yang diiringi dengan pentas seni Freshmen dan Unit Kegiatan Mahasiswa (UKM).",
  },
  {
    id: "06",
    color: "bg-cyan",
    accentColor: "#45C8D8",
    label: "EXCELLENCE PROGRAM",
    description:
      "Program peningkatan soft skill dan pengembangan diri mahasiswa baru dengan pendampingan langsung dari Freshmen Partner.",
  },
];
