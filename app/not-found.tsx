// app/not-found.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  HeartBreak,
  House,
  ArrowLeft,
  HeartIcon,
  HeartBreakIcon,
  HouseIcon,
  ArrowLeftIcon,
} from "@phosphor-icons/react";

export default function NotFound() {
  return (
    <main className="relative min-h-dvh w-full overflow-hidden bg-stone-950 font-['Montserrat'] text-white flex flex-col justify-between items-center p-6">
      {/* Background Image Overlay */}
      <div className="fixed inset-0 bg-[url('/images/bg.png')] bg-cover bg-center bg-no-repeat opacity-25 pointer-events-none -z-10" />

      {/* Dark Ambient linear */}
      <div className="absolute inset-0 bg-radial from-amber-500/10 via-black/60 to-black pointer-events-none -z-5" />

      {/* Spacer Atas untuk Balancing Flex Layout */}
      <div className="w-full h-6" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative w-full max-w-md p-8 rounded-3xl border border-white/15 bg-white/5 backdrop-blur-xl shadow-2xl text-center flex flex-col items-center my-auto"
      >
        {/* Animated Icon */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, -5, 5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="w-18 h-18 rounded-full border border-amber-200/30 bg-amber-200/10 backdrop-blur-md flex items-center justify-center mb-6 shadow-inner"
        >
          <HeartBreakIcon
            size={32}
            weight="duotone"
            className="text-amber-200"
          />
        </motion.div>

        {/* Big 404 Header */}
        <h1 className="text-6xl md:text-7xl font-bold tracking-wider bg-linear-to-r from-amber-100 via-amber-200 to-amber-400 bg-clip-text text-transparent mb-2">
          404
        </h1>

        <p className="text-xs uppercase tracking-[0.3em] font-semibold text-amber-100/80 mb-4">
          Page Not Found
        </p>

        <div className="w-16 h-px bg-linear-to-r from-transparent via-amber-200/50 to-transparent mb-6" />

        {/* Message */}
        <p className="text-xs text-gray-300 font-light leading-relaxed mb-8 max-w-xs">
          Maaf, halaman atau rute undangan yang Anda cari tidak ditemukan.
          Pastikan tautan atau kode unik undangan Anda sudah benar.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
          <Link
            href="/"
            className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-linear-to-r from-amber-200/20 to-amber-400/20 hover:from-amber-200/30 hover:to-amber-400/30 border border-amber-200/40 text-amber-100 font-semibold text-xs uppercase tracking-widest transition-all active:scale-95 shadow-lg"
          >
            <HouseIcon size={18} weight="duotone" />
            <span>Ke Beranda</span>
          </Link>

          <button
            onClick={() => window.history.back()}
            className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white font-medium text-xs uppercase tracking-widest transition-all active:scale-95 cursor-pointer"
          >
            <ArrowLeftIcon size={18} weight="duotone" />
            <span>Kembali</span>
          </button>
        </div>

        {/* Couple Signature Footer */}
        <p className="font-['Allura'] text-2xl text-amber-100/60 mt-8 tracking-wide">
          Annisa & Rangga
        </p>
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
