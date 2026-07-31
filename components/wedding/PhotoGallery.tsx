// components/wedding/PhotoGallery.tsx
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

const galleryImages = [
  {
    id: 1,
    url: "/images/gallery/img_7.png",
    alt: "Prewedding 1",
    aspect: "aspect-[3/4]",
  },
  {
    id: 2,
    url: "/images/gallery/img_3.png",
    alt: "Prewedding 2",
    aspect: "aspect-[4/6]",
  },
  {
    id: 3,
    url: "/images/gallery/img_2.png",
    alt: "Prewedding 3",
    aspect: "aspect-[4/5]",
  },
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
  },
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

  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <motion.div
      ref={cardRef}
      /* Gap bawah diperrapat dari mb-6 ke mb-2.5 (mobile) & mb-3.5 (desktop) */
      className="mb-2.5 md:mb-3.5 rounded-xl md:rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 group border border-white/10"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04, duration: 0.5 }}
    >
      <div
        className={`relative overflow-hidden w-full ${
          photo.aspect || "aspect-4/3"
        }`}
      >
        <motion.div
          style={{ y }}
          className="w-full h-full transform scale-115 group-hover:scale-120 transition-transform duration-500 ease-out"
        >
          <Image
            src={photo.url}
            alt={photo.alt}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 50vw"
            quality={85}
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              shimmer(600, 400),
            )}`}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function PhotoGallery() {
  const breakpointColumnsObj = {
    default: 2,
    1024: 2,
    640: 2,
  };

  return (
    <section className="py-16 px-6 md:px-8 backdrop-blur-md bg-linear-to-b from-[#CFCDC9]/20 via-black/30 to-[#CFCDC9]/10 font-['Montserrat'] text-white">
      {/* Header Section */}
      <div className="text-center mb-10 max-w-2xl mx-auto px-4">
        <motion.h2
          className="text-3xl md:text-6xl font-['Allura'] text-amber-100 tracking-wide mb-2"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Our Moments
        </motion.h2>

        <div className="w-20 h-px bg-amber-200/50 mx-auto my-3"></div>

        {/* Paragraf Cerita Momen */}
        <motion.p
          className="text-xs md:text-sm text-gray-200 leading-relaxed font-light mt-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Setiap detik perjalanan kami terangkum dalam cerita indah. Dari tawa
          sederhana hingga komitmen bersama, inilah beberapa potret kebahagiaan
          kami menuju hari istimewa.
        </motion.p>
      </div>

      {/* Masonry Container dengan Gap Rapat */}
      <div className="max-w-5xl mx-auto">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          /* Margin & Padding dirapatkan agar jarak antar foto pas & tidak bolong jauh */
          className="flex w-auto -ml-2 md:-ml-3.5"
          columnClassName="pl-2 md:pl-3.5 bg-clip-padding"
        >
          {galleryImages.map((photo, index) => (
            <ParallaxCard key={photo.id} photo={photo} index={index} />
          ))}
        </Masonry>
      </div>
    </section>
  );
}
