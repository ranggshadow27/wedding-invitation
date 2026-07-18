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
    <footer className="bg-gray-900 text-white py-20 px-6 font-['Montserrat']">
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
              href="#"
              className="text-white p-2 rounded-full transition-all hover:scale-110"
              animate={{
                scale: [1, 1.15, 1], // efek detak
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
          className="h-px bg-gray-700 mb-10"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        />

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
            <XLogoIcon size={20} weight="duotone" />
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
    </footer>
  );
}
