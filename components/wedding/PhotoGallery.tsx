// components/PhotoGallery.tsx
import Image from "next/image";
import { motion } from "framer-motion";
import Masonry from "react-masonry-css";

// Fungsi helper untuk generate SVG shimmer placeholder (tetap dipertahankan)
const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#e2e8f0" offset="20%" />
      <stop stop-color="#cbd5e1" offset="50%" />
      <stop stop-color="#e2e8f0" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#e2e8f0" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite" />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

// Tips: Berikan variasi height (misal ada yang portrait 800, ada yang landscape 450 atau 600)
// agar efek masonry pinterest-nya semakin terlihat nyata dan indah!
const galleryImages = [
  { id: 1, url: "/images/gallery/1.png", alt: "Prewedding 1", w: 600, h: 350 },
  { id: 2, url: "/images/gallery/2.jpg", alt: "Prewedding 2", w: 600, h: 450 }, // Landscape
  { id: 3, url: "/images/gallery/3.jpg", alt: "Prewedding 3", w: 600, h: 600 }, // Portrait Panjang
  { id: 4, url: "/images/gallery/4.jpg", alt: "Prewedding 4", w: 600, h: 600 },
  { id: 5, url: "/images/gallery/5.jpg", alt: "Prewedding 5", w: 600, h: 600 }, // Square
  { id: 6, url: "/images/gallery/6.jpg", alt: "Prewedding 6", w: 600, h: 350 },
  { id: 7, url: "/images/gallery/7.jpg", alt: "Prewedding 7", w: 600, h: 450 }, // Landscape
  { id: 8, url: "/images/gallery/8.jpg", alt: "Prewedding 8", w: 600, h: 600 }, // Portrait Panjang
  { id: 9, url: "/images/gallery/9.jpg", alt: "Prewedding 9", w: 600, h: 600 },
];

export default function PhotoGallery() {
  // Menentukan jumlah kolom berdasarkan ukuran layar (Responsive breakpoints)
  const breakpointColumnsObj = {
    default: 3, // Layar komputer/desktop (3 kolom)
    1100: 3,
    700: 2, // Layar tablet (2 kolom)
    500: 1, // Layar HP (1 kolom mendatar)
  };

  return (
    <div className="py-20 px-6 bg-linear-to-b from-[#CFCDC9]/60 to-[#CFCDC9]/10 backdrop-blur-xs">
      <div className="text-center mb-12">
        <motion.h2
          className="text-4xl md:text-6xl font-['Allura'] text-[#3E2900] tracking-wide"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Our Gallery
        </motion.h2>
        <div className="w-24 h-px bg-[#3E2900] mx-auto mt-6"></div>
      </div>

      <div className="max-w-6xl mx-auto">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex w-auto -ml-4" // Mengatasi margin layout masonry
          columnClassName="pl-4 bg-clip-padding" // Jarak antar kolom (Gap)
        >
          {galleryImages.map((photo, index) => (
            <motion.div
              key={photo.id}
              className="mb-4 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="overflow-hidden rounded-2xl">
                <Image
                  src={photo.url}
                  alt={photo.alt}
                  width={photo.w}
                  height={photo.h}
                  // ⚠️ PERUBAHAN DI SINI:
                  // Hapus 'h-auto', lalu paksa tingginya mengikuti prop 'h' yang kita tentukan di array.
                  // Tambahkan inline style 'height' agar ukurannya presisi memotong gambar asli.
                  className="w-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
                  style={{ height: `${photo.h}px` }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  quality={75}
                  placeholder="blur"
                  blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(photo.w, photo.h))}`}
                />
              </div>
            </motion.div>
          ))}
        </Masonry>
      </div>
    </div>
  );
}
