// app/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  EnvelopeSimpleOpen,
  ArrowRight,
  Heart,
  Key,
  ArrowRightIcon,
  HeartIcon,
} from "@phosphor-icons/react";

export default function HomePage() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = code.trim();

    if (!cleanCode) {
      setError("Silakan masukkan kode undangan Anda.");
      return;
    }

    setError("");
    setIsLoading(true);
    // Redirect ke rute /invite/[code]
    router.push(`/invite/${cleanCode}`);
  };

  return (
    <main className="relative min-h-dvh w-full overflow-hidden bg-stone-950 font-['Montserrat'] text-white flex flex-col justify-between items-center p-6">
      {/* Background Image Container */}
      <div className="fixed inset-0 bg-[url('/images/bg.jpg')] bg-cover bg-center bg-no-repeat opacity-30 pointer-events-none -z-10" />

      {/* Ambient Lighting linear */}
      <div className="absolute inset-0 bg-radial from-amber-500/10 via-black/70 to-black pointer-events-none -z-5" />

      {/* Spacer Atas */}
      <div className="w-full h-8" />

      {/* Main Glassmorphic Card Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative w-full max-w-md p-8 md:p-10 rounded-3xl border border-white/15 bg-white/5 backdrop-blur-xl shadow-2xl text-center flex flex-col items-center my-auto"
      >
        {/* Animated Icon */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="w-18 h-18 rounded-full border border-amber-200/40 bg-amber-200/10 backdrop-blur-md flex items-center justify-center mb-6 shadow-lg shadow-amber-500/5"
        >
          <EnvelopeSimpleOpen
            size={32}
            weight="duotone"
            className="text-amber-200"
          />
        </motion.div>

        {/* Subtitle / Header */}
        <p className="text-[0.65rem] md:text-xs tracking-[0.3em] font-medium text-amber-100 uppercase mb-2">
          Welcome To The Wedding Of
        </p>

        <h1 className="text-4xl md:text-5xl font-['Allura'] text-white tracking-wide mb-3">
          Annisa <span className="text-amber-200">&</span> Rangga
        </h1>

        <div className="w-16 h-px bg-linear-to-r from-transparent via-amber-200/50 to-transparent mb-6" />

        <p className="text-xs text-gray-300 font-light leading-relaxed mb-8 max-w-xs">
          Masukkan kode undangan khusus yang telah Anda terima untuk membuka
          lembaran momen bahagia kami.
        </p>

        {/* Form Input Kode Undangan */}
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-amber-200/60">
              <Key size={20} weight="duotone" />
            </div>
            <input
              type="text"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                if (error) setError("");
              }}
              placeholder="Contoh: ANNISA-RANGGA"
              className="w-full pl-11 pr-4 py-3.5 bg-black/30 border border-white/15 focus:border-amber-200/60 rounded-2xl text-white placeholder-gray-500 text-xs tracking-wider uppercase focus:outline-none focus:ring-1 focus:ring-amber-200/50 transition-all font-mono"
            />
          </div>

          {/* Error Message */}
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[0.7rem] text-rose-400 font-medium text-left px-1"
            >
              {error}
            </motion.p>
          )}

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-linear-to-r from-amber-200/20 to-amber-400/20 hover:from-amber-200/30 hover:to-amber-400/30 border border-amber-200/40 text-amber-100 font-semibold text-xs uppercase tracking-widest transition-all shadow-lg cursor-pointer disabled:opacity-50"
          >
            <span>{isLoading ? "Membuka Undangan..." : "Buka Undangan"}</span>
            {!isLoading && <ArrowRightIcon size={16} weight="bold" />}
          </motion.button>
        </form>
      </motion.div>

      {/* Professional Footer & Copyright */}
      <footer className="w-full max-w-md text-center py-4 font-['Montserrat']">
        <div className="flex items-center justify-center gap-1.5 text-[0.65rem] text-gray-400 font-bold tracking-tight">
          <span>Crafted with</span>
          <HeartIcon
            size={14}
            weight="fill"
            className="text-rose-400 inline-block"
          />
          <span>for Annisa & Rangga Wedding</span>
        </div>
        <p className="text-[0.6rem] text-gray-500 font-light tracking-widest mt-1 uppercase">
          © {new Date().getFullYear()} All Rights Reserved
        </p>
        <p className="text-[0.6rem] text-gray-500 font-light tracking-widest mt-1 uppercase">
          RATIPRAY
        </p>
      </footer>
    </main>
  );
}
