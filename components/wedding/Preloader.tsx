// components/wedding/Preloader.tsx
"use client";

import { motion } from "framer-motion";
import { HeartIcon } from "@phosphor-icons/react";

interface PreloaderProps {
  progress: number;
}

export default function Preloader({ progress }: PreloaderProps) {
  return (
    <div className="fixed inset-0 z-50 bg-stone-950 flex flex-col items-center justify-center text-center px-6 text-white font-['Montserrat']">
      <div className="relative mb-8 flex items-center justify-center">
        <motion.div
          className="w-28 h-28 border-2 border-white/10 border-t-amber-200 rounded-full"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <div className="absolute flex flex-col items-center justify-center">
          <HeartIcon
            size={32}
            weight="duotone"
            className="text-amber-200 mb-1"
          />
          <span className="text-xs font-bold text-amber-100">{progress}%</span>
        </div>
      </div>

      <h2 className="text-xs uppercase tracking-[0.25em] text-amber-100 font-semibold mb-2">
        Preparing Memories
      </h2>
      <p className="text-[0.68rem] text-gray-400 max-w-60 leading-relaxed font-light">
        Downloading high resolution assets for the best experience...
      </p>

      <div className="w-48 h-1 bg-white/10 rounded-full mt-6 overflow-hidden">
        <motion.div
          className="h-full bg-linear-to-r from-amber-300 to-amber-100"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
}
