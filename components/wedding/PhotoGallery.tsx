import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Masonry from "react-masonry-css";

// Helper SVG Shimmer (tetap)
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

const galleryImages = [
  {
    id: 1,
    url: "/images/gallery/img_7.png",
    alt: "Prewedding 1",
    w: 600,
    h: 350,
  },
  {
    id: 2,
    url: "/images/gallery/img_3.png",
    alt: "Prewedding 2",
    w: 600,
    h: 450,
  },
  {
    id: 3,
    url: "/images/gallery/img_2.png",
    alt: "Prewedding 3",
    w: 600,
    h: 600,
  },
  {
    id: 4,
    url: "/images/gallery/img_1_v2.png",
    alt: "Prewedding 4",
    w: 600,
    h: 600,
  },
  {
    id: 5,
    url: "/images/gallery/img_4_wide.png",
    alt: "Prewedding 5",
    w: 600,
    h: 400,
  },
  {
    id: 6,
    url: "/images/gallery/img_6.png",
    alt: "Prewedding 6",
    w: 600,
    h: 350,
  },
  {
    id: 7,
    url: "/images/gallery/img_5_wide.png",
    alt: "Prewedding 7",
    w: 600,
    h: 400,
  },
  {
    id: 8,
    url: "/images/gallery/img_9.png",
    alt: "Prewedding 8",
    w: 600,
    h: 500,
  },
  {
    id: 9,
    url: "/images/gallery/img_8.png",
    alt: "Prewedding 9",
    w: 600,
    h: 400,
  },
];

// Sub-komponen untuk menangani efek Parallax tiap gambar
function ParallaxCard({
  photo,
  index,
}: {
  photo: (typeof galleryImages)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Melacak progres scroll khusus untuk card ini saja saat melintasi viewport
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"], // Dimulai saat bagian atas elemen menyentuh bagian bawah viewport
  });

  // Mengubah posisi Y gambar dari -10% ke 10% (pergerakan halus di dalam container)
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <motion.div
      ref={cardRef}
      className="mb-4 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.6 }}
    >
      {/* Container pembungkus gambar dibuat relative + overflow-hidden */}
      <div
        className="relative overflow-hidden rounded-2xl w-full"
        style={{ height: `${photo.h}px` }}
      >
        {/* Gambar di-scale 120% (scale-120) agar tidak terlihat bolong saat digeser y-axis nya */}
        <motion.div
          style={{ y }}
          className="w-full h-full transform scale-120 group-hover:scale-125 transition-transform duration-500 ease-out"
        >
          <Image
            src={photo.url}
            alt={photo.alt}
            width={photo.w}
            height={photo.h}
            className="w-full h-full object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={75}
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(photo.w, photo.h))}`}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function PhotoGallery() {
  const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 1,
    500: 1,
  };

  return (
    <div className="py-20 px-6 bg-linear-to-b from-[#CFCDC9]/60 to-[#CFCDC9]/10">
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
          className="flex w-auto -ml-4"
          columnClassName="pl-4 bg-clip-padding"
        >
          {galleryImages.map((photo, index) => (
            <ParallaxCard key={photo.id} photo={photo} index={index} />
          ))}
        </Masonry>
      </div>
    </div>
  );
}
