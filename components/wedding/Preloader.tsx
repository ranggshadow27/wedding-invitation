// components/wedding/Preloader.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { HeartIcon, FastForward } from "@phosphor-icons/react";

interface PreloaderProps {
  progress: number;
  currentLog: string; // Cukup terima 1 baris log paling baru
  showSkipButton: boolean;
  onSkip: () => void;
}

export default function Preloader({
  progress,
  currentLog,
  showSkipButton,
  onSkip,
}: PreloaderProps) {
  return (
    <div className="fixed inset-0 z-50 bg-stone-950 flex flex-col items-center justify-center text-center px-6 text-white font-['Montserrat'] select-none">
      {/* Animated Spinner & Heart Icon */}
      <div className="relative mb-6 flex items-center justify-center">
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

      {/* Header Preloader */}
      <h2 className="text-xs uppercase tracking-[0.25em] text-amber-100 font-semibold mb-1">
        Preparing Memories
      </h2>

      <p className="text-[0.68rem] text-gray-400 max-w-60 leading-relaxed font-light mb-4">
        Downloading high resolution assets...
      </p>

      {/* Progress Bar */}
      <div className="w-56 h-1 bg-white/10 rounded-full overflow-hidden mb-5">
        <motion.div
          className="h-full bg-linear-to-r from-amber-300 to-amber-100"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* 🌟 Minimalist Single Line Log dengan Animasi Fade/Slide */}
      <div className="h-6 flex items-center justify-center overflow-hidden mb-4">
        <AnimatePresence mode="wait">
          <motion.p
            key={currentLog}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={`text-[0.7rem] font-light tracking-wide ${
              currentLog.includes("✓")
                ? "text-amber-200 font-medium"
                : currentLog.includes("⚠️") || currentLog.includes("⏳")
                  ? "text-amber-300/80"
                  : currentLog.includes("⏩")
                    ? "text-rose-300/80"
                    : "text-gray-400/90"
            }`}
          >
            {currentLog}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Option: Skip Best Experience Button */}
      <AnimatePresence>
        {!showSkipButton && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9, y: 5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={onSkip}
            className="flex items-center gap-2 bg-amber-200/10 hover:bg-amber-200/20 border border-amber-200/30 text-amber-200 px-4 py-2 rounded-full text-[0.68rem] font-medium uppercase tracking-wider transition-all active:scale-95 cursor-pointer mt-2"
          >
            <FastForward
              size={14}
              weight="duotone"
              className="text-amber-200"
            />
            <span>Skip Best Experience</span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
