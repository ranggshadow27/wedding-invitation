// components/wedding/WeddingFooter.tsx
import {
  InstagramLogoIcon,
  WhatsappLogoIcon,
  FacebookLogoIcon,
  DiscordLogoIcon,
  GithubLogoIcon,
  XLogoIcon,
  ThreadsLogoIcon,
  HeartIcon,
} from "@phosphor-icons/react";
import { motion } from "framer-motion";

export default function WeddingFooter() {
  return (
    /* 
      1. Ditambahkan class `relative` 
    */
    <footer className="relative bg-gray-900 text-white py-20 px-6 font-['Montserrat']">
      <div className="max-w-5xl mx-auto">
        {/* Family Section */}
        <motion.div
          className="grid md:grid-cols-3 gap-12 text-center md:text-left mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Family Perempuan */}
          <div className="md:text-left">
            <p className="text-rose-400 text-xs tracking-widest mb-3">
              THE BIG FAMILY OF
            </p>
            <p className="text-2xl font-bold">ANNISA LUTFIA PUTRI PRATAMA</p>
          </div>

          {/* Logo Tengah */}
          <motion.div
            className="flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <motion.a
              className="text-white p-2 rounded-full transition-all hover:scale-110"
              animate={{
                scale: [1, 1.5, 1], // efek detak
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            >
              <HeartIcon size={40} weight="duotone" className="text-rose-400" />
            </motion.a>
          </motion.div>

          {/* Family Laki-laki */}
          <div className="md:text-right">
            <p className="text-rose-400 text-xs tracking-widest mb-3">
              THE BIG FAMILY OF
            </p>
            <p className="text-2xl font-bold">RANGGA TITO PRAYOGO</p>
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="h-px bg-gray-700 mb-2"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        />

        {/* Logo */}
        <motion.div
          className="w-full h-20 flex items-center justify-center my-8"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div>
            <img
              src="/logo.png"
              alt="Wedding Photo"
              className="w-20 h-20 object-cover"
            />
          </div>
        </motion.div>

        {/* Social Media Icons */}
        <motion.div
          className="flex justify-center gap-4 mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <a
            href="#"
            className="border border-white/70 hover:border-white text-white p-2 rounded-full transition-all hover:scale-110"
          >
            <InstagramLogoIcon size={20} weight="duotone" />
          </a>

          <a
            href="#"
            className="border border-white/70 hover:border-white text-white p-2 rounded-full transition-all hover:scale-110"
          >
            <ThreadsLogoIcon size={20} weight="duotone" />
          </a>
          <a
            href="#"
            className="border border-white/70 hover:border-white text-white p-2 rounded-full transition-all hover:scale-110"
          >
            <FacebookLogoIcon size={20} weight="duotone" />
          </a>
          <a
            href="#"
            className="border border-white/70 hover:border-white text-white p-2 rounded-full transition-all hover:scale-110"
          >
            <DiscordLogoIcon size={20} weight="duotone" />
          </a>
          <a
            href="#"
            className="border border-white/70 hover:border-white text-white p-2 rounded-full transition-all hover:scale-110"
          >
            <GithubLogoIcon size={20} weight="duotone" />
          </a>
        </motion.div>

        {/* Copyright */}
        <motion.div
          className="text-center font-semibold text-xs text-[#D9D9D9]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          © 2026 ratipray. All Rights Reserved.
        </motion.div>

        <motion.div
          className="text-center text-xs font-light text-[#D9D9D9]/50 pt-1"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          icaa-awe wedding invitation
        </motion.div>
      </div>

      {/* 
        2. Trik Penutup Overleak:
        Elemen di bawah ini akan memanjangkan warna hitam (bg-gray-900) sejauh 100vh ke bawah.
        Sehingga saat user scroll paksa di paling bawah (overscroll bounce di iPhone),
        yang terlihat tetap warna hitam footer dan menutup video/image leak.
      */}
      <div className="absolute top-full left-0 right-0 h-2 bg-gray-900 pointer-events-none" />
    </footer>
  );
}
