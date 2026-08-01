// components/wedding/LandingHero.tsx
"use client";

import { motion, useAnimation } from "framer-motion";
import { CaretDoubleUp } from "@phosphor-icons/react";

interface LandingHeroProps {
  guestName: string;
  onOpen: () => void;
}

export default function LandingHero({ guestName, onOpen }: LandingHeroProps) {
  const controls = useAnimation();

  const handleDragEnd = (_: any, info: any) => {
    if (info.offset.y < -50) {
      onOpen();
    } else {
      controls.start({
        y: 0,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      });
    }
  };

  return (
    <motion.div
      key="landing"
      exit={{ opacity: 0, y: -100, scale: 0.98 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-dvh w-full text-white flex flex-col antialiased items-center justify-end pb-10 text-center px-6 overflow-hidden touch-none"
    >
      <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black/80 via-black/40 to-transparent -z-5 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <p className="text-[0.65rem] md:text-xs tracking-[0.3em] font-medium font-['Montserrat'] text-amber-100 uppercase mb-3">
          The Wedding Of
        </p>
      </motion.div>

      <motion.div
        className="w-full max-w-md flex items-center justify-center gap-3 md:gap-5 mb-3 font-['Allura']"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl md:text-7xl text-white tracking-wide">
          Annisa
        </h1>
        <span className="text-3xl md:text-5xl text-amber-200/90">&</span>
        <h1 className="text-5xl md:text-7xl text-white tracking-wide">
          Rangga
        </h1>
      </motion.div>

      <div className="w-40 h-px bg-gradient-to-r from-transparent via-amber-200/50 to-transparent mb-4" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-[0.65rem] md:text-xs tracking-[0.25em] font-medium font-['Montserrat'] text-gray-200 mb-6 uppercase"
      >
        <p className="mb-0.5">Saturday</p>
        <p className="font-semibold text-white">26 • September • 2026</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="w-full max-w-xs mb-6 p-4 rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md shadow-xl font-['Montserrat']"
      >
        <p className="text-[0.65rem] text-gray-300 font-light uppercase tracking-widest mb-1">
          Dear Sir / Madam,
        </p>
        <p className="text-base md:text-lg font-bold text-white tracking-wide capitalize truncate px-2">
          {guestName}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <p className="text-[0.55rem] md:text-[0.65rem] text-gray-300 tracking-[0.2em] font-light font-['Montserrat'] uppercase mb-6 leading-relaxed">
          We invite you to celebrate our <br /> wedding ceremony
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        className="w-full max-w-xs flex flex-col items-center justify-center cursor-grab active:cursor-grabbing"
      >
        <motion.div
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={0.4}
          onDragEnd={handleDragEnd}
          animate={controls}
          className="flex flex-col items-center justify-center py-3 px-6 bg-white/10 hover:bg-white/15 backdrop-blur-lg rounded-full border border-amber-200/30 shadow-lg"
          whileInView={{ y: [0, -8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <CaretDoubleUp
            size={16}
            weight="bold"
            className="text-amber-200 animate-pulse"
          />
          <span className="text-[0.6rem] font-['Montserrat'] text-white mt-1 font-semibold tracking-[0.2em] uppercase">
            Swipe Up to Open
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
