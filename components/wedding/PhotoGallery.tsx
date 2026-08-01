// components/wedding/PhotoGallery.tsx
"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Masonry from "react-masonry-css";

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

  // Range parallax dibuat lebih halus (-4% ke 4%) agar tidak membebankan GPU HP
  const y = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  return (
    <motion.div
      ref={cardRef}
      className="mb-2.5 md:mb-3.5 rounded-xl md:rounded-2xl overflow-hidden shadow-md transition-shadow duration-300 transform-gpu will-change-transform"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.03, duration: 0.5, ease: "easeOut" }}
    >
      <div
        className={`relative overflow-hidden w-full ${photo.aspect || "aspect-4/3"}`}
      >
        <motion.div
          style={{ y }}
          className="w-full h-full transform-gpu scale-105"
        >
          <Image
            src={photo.url}
            alt={photo.alt}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 50vw"
            quality={80}
            priority={index < 4} // Priority load untuk 4 foto teratas
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Our Moments
        </motion.h2>

        <div className="w-20 h-px bg-amber-200/50 mx-auto my-3" />

        <motion.p
          className="text-xs md:text-sm text-gray-200 leading-relaxed font-light mt-3"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          Setiap detik perjalanan kami terangkum dalam cerita indah. Dari tawa
          sederhana hingga komitmen bersama, inilah beberapa potret kebahagiaan
          kami menuju hari istimewa.
        </motion.p>
      </div>

      {/* Masonry Container */}
      <div className="max-w-5xl mx-auto">
        <Masonry
          breakpointCols={breakpointColumnsObj}
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
