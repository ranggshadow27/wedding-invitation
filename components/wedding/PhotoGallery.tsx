import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Masonry from "react-masonry-css";

// Helper SVG Shimmer
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

// Kamu bisa menambahkan properti aspect ratio sendiri jika ingin ada yang beda (contoh: portrait/square/landscape)
const galleryImages = [
  {
    id: 1,
    url: "/images/gallery/img_7.png",
    alt: "Prewedding 1",
    aspect: "aspect-[3/4]",
  }, // Portrait
  {
    id: 2,
    url: "/images/gallery/img_3.png",
    alt: "Prewedding 2",
    aspect: "aspect-[4/6]",
  }, // Landscape
  {
    id: 3,
    url: "/images/gallery/img_2.png",
    alt: "Prewedding 3",
    aspect: "aspect-[4/5]",
  }, // Square
  {
    id: 4,
    url: "/images/gallery/img_1_v2.png",
    alt: "Prewedding 4",
    aspect: "aspect-[3/4]",
  },
  {
    id: 5,
    url: "/images/gallery/img_4_wide.png",
    alt: "Prewedding 5",
    aspect: "aspect-[4/3]",
  }, // Extra wide
  {
    id: 6,
    url: "/images/gallery/img_6.png",
    alt: "Prewedding 6",
    aspect: "aspect-[4/5]",
  },
  {
    id: 7,
    url: "/images/gallery/img_5_wide.png",
    alt: "Prewedding 7",
    aspect: "aspect-[4/4]",
  },
  {
    id: 8,
    url: "/images/gallery/img_9.png",
    alt: "Prewedding 8",
    aspect: "aspect-[4/6]",
  },
  {
    id: 9,
    url: "/images/gallery/img_8.png",
    alt: "Prewedding 9",
    aspect: "aspect-[4/5]",
  },
];

function ParallaxCard({
  photo,
  index,
}: {
  photo: (typeof galleryImages)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <motion.div
      ref={cardRef}
      className="mb-6 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.6 }}
    >
      {/* Menggunakan aspect-ratio dinamis dari data photo */}
      <div
        className={`relative overflow-hidden rounded-2xl w-full ${photo.aspect || "aspect-4/3"}`}
      >
        <motion.div
          style={{ y }}
          className="w-full h-full transform scale-120 group-hover:scale-125 transition-transform duration-500 ease-out"
        >
          <Image
            src={photo.url}
            alt={photo.alt}
            fill // Menggunakan fill agar Next Image otomatis mengisi container aspect-ratio
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
            quality={80}
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(600, 400))}`}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function PhotoGallery() {
  // Untuk foto berorientasi Landscape, 2 kolom pada layar desktop akan terlihat jauh lebih pas
  const breakpointColumnsObj = {
    default: 2,
    1024: 2,
    640: 2, // 1 Kolom penuh pada layar mobile HP
  };

  return (
    <div className="py-0 px-4 md:px-8 bg-linear-to-b from-[#CFCDC9]/60 to-[#CFCDC9]/10">
      <div className="text-center mb-12">
        <motion.h2
          className="text-3xl md:text-6xl font-['Allura'] text-[#3E2900] tracking-wide"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Our Gallery
        </motion.h2>
        <div className="w-24 h-px bg-[#3E2900] mx-auto mt-6"></div>
      </div>

      <div className="max-w-5xl mx-auto">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex w-auto -ml-6"
          columnClassName="pl-6 bg-clip-padding"
        >
          {galleryImages.map((photo, index) => (
            <ParallaxCard key={photo.id} photo={photo} index={index} />
          ))}
        </Masonry>
      </div>
    </div>
  );
}
