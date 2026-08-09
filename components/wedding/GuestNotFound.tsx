// components/wedding/GuestNotFound.tsx
"use client";

import { motion } from "framer-motion";
import {
  UserMinus,
  WhatsappLogo,
  ArrowLeft,
  Heart,
  UserMinusIcon,
  WhatsappLogoIcon,
  ArrowLeftIcon,
  HeartIcon,
} from "@phosphor-icons/react";

interface GuestNotFoundProps {
  code?: string;
}

export default function GuestNotFound({ code }: GuestNotFoundProps) {
  // Nomor WA Admin/Mempelai
  const whatsappNumber = "6281234567890";
  const waMessage = encodeURIComponent(
    `Halo Annisa & Rangga, saya mencoba membuka undangan digital dengan kode "${code || "tanpa kode"}" namun data undangan tidak ditemukan. Bisakah bantu mengeceknya?`,
  );

  return (
    <main className="relative min-h-dvh w-full overflow-hidden bg-stone-950 font-['Montserrat'] text-white flex flex-col justify-between items-center p-6">
      {/* Background Image Overlay */}
      <div className="fixed inset-0 bg-[url('/images/bg.jpg')] bg-cover bg-center bg-no-repeat opacity-20 pointer-events-none -z-10" />

      {/* Ambient Radial Gradient */}
      <div className="absolute inset-0 bg-radial from-amber-500/10 via-black/70 to-black pointer-events-none -z-5" />

      {/* Spacer Atas untuk Balancing Flex Layout */}
      <div className="w-full h-6" />

      {/* Main Card Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative w-full max-w-md p-8 rounded-3xl border border-white/15 bg-white/5 backdrop-blur-xl shadow-2xl text-center flex flex-col items-center my-auto"
      >
        {/* Animated Icon Container */}
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="w-18 h-18 rounded-full border border-amber-200/30 bg-amber-200/10 backdrop-blur-md flex items-center justify-center mb-6 shadow-inner"
        >
          <UserMinusIcon
            size={32}
            weight="duotone"
            className="text-amber-200"
          />
        </motion.div>

        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold tracking-wide text-white mb-2">
          Undangan Tidak Ditemukan
        </h2>

        <p className="text-[0.65rem] uppercase tracking-[0.25em] font-semibold text-amber-200/80 mb-4">
          Invalid Code:{" "}
          <span className="font-mono text-white">{code || "N/A"}</span>
        </p>

        <div className="w-16 h-px bg-linear-to-r from-transparent via-amber-200/50 to-transparent mb-6" />

        {/* Description */}
        <p className="text-xs text-gray-300 font-light leading-relaxed mb-8 max-w-xs">
          Mohon maaf, data tamu untuk kode unik ini tidak terdaftar. Silakan
          hubungi mempelai jika terjadi kesalahan tautan.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 w-full">
          {/* Contact WA Button */}
          <a
            href={`https://wa.me/${whatsappNumber}?text=${waMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-emerald-600/80 hover:bg-emerald-600 border border-emerald-400/40 text-white font-semibold text-xs uppercase tracking-widest transition-all active:scale-95 shadow-lg"
          >
            <WhatsappLogoIcon size={18} weight="fill" />
            <span>Konfirmasi via WA</span>
          </a>

          {/* Back Button */}
          <button
            onClick={() => window.history.back()}
            className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white font-medium text-xs uppercase tracking-widest transition-all active:scale-95 cursor-pointer"
          >
            <ArrowLeftIcon size={18} weight="duotone" />
            <span>Kembali</span>
          </button>
        </div>

        {/* Signature */}
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
