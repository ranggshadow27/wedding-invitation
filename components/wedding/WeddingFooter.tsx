// components/wedding/WeddingFooter.tsx
import {
  InstagramLogoIcon,
  WhatsappLogoIcon,
  FacebookLogoIcon,
  DiscordLogoIcon,
  GithubLogoIcon,
  ThreadsLogoIcon,
  HeartIcon,
} from "@phosphor-icons/react";
import { motion } from "framer-motion";

export default function WeddingFooter() {
  return (
    <>
      {/* ========================================================= */}
      {/* SECTION THANK YOU WITH BG IMAGE                           */}
      {/* ========================================================= */}
      <section className="relative w-full overflow-hidden flex items-start justify-center min-h-125 md:min-h-275 py-6 px-8 text-white text-center">
        {/* Background Image Container */}
        <div className="absolute inset-0 w-full h-full -z-10">
          <img
            src="/images/footer_bg.jpg" // Ganti dengan path foto prewedding / background-mu
            alt="Thank You Background"
            className="w-full h-full object-cover object-center"
          />
          {/* Overlay Gelap Transparan agar Teks Mudah Dibaca */}
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Content Box (Thank You + Words + Names) */}
        <motion.div
          className="max-w-xl mx-auto space-y-4 md:space-y-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* H3 Thank You */}
          <h3 className="text-3xl md:text-5xl md:mt-5 font-['Allura'] text-amber-100 tracking-wide">
            Thank You
          </h3>

          {/* Susunan Kata-kata */}
          <p className="text-[.6rem] md:text-sm font-['Montserrat'] font-light leading-relaxed tracking-wide text-gray-100 max-w-md mx-auto">
            Kami siap melangkah bersama untuk merajut masa depan. Kehadiran Anda
            bukan hanya sekadar saksi, tetapi juga pemberi doa yang akan
            menguatkan langkah kami berdua. <br /> Sampai jumpa di hari bahagia
            kami!
          </p>

          {/* Divider Kecil */}
          <div className="w-16 h-px bg-white/60 mx-auto my-2"></div>

          {/* Nama Annisa & Rangga */}
          <p className="text-xs md:text-lg font-['Montserrat'] tracking-widest text-white">
            Annisa & Rangga
          </p>
        </motion.div>
      </section>

      {/* ========================================================= */}
      {/* FOOTER MAIN (BG-GRAY-900)                                 */}
      {/* ========================================================= */}
      <footer className="relative bg-gray-900 text-white py-10 px-6 font-['Montserrat']">
        <div className="max-w-5xl mx-auto">
          {/* Family Section */}
          <motion.div
            className="grid md:grid-cols-3 gap-6 text-center md:text-left mb-16"
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
              <p className="text-lg font-bold">ANNISA LUTFIA PUTRI PRATAMA</p>
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
                <HeartIcon
                  size={40}
                  weight="duotone"
                  className="text-rose-400"
                />
              </motion.a>
            </motion.div>

            {/* Family Laki-laki */}
            <div className="md:text-right">
              <p className="text-rose-400 text-xs tracking-widest mb-3">
                THE BIG FAMILY OF
              </p>
              <p className="text-lg font-bold">RANGGA TITO PRAYOGO</p>
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
              href="https://www.instagram.com/"
              target="_blank"
              className="border border-white/70 hover:border-white text-white p-2 rounded-full transition-all hover:scale-110"
            >
              <InstagramLogoIcon size={20} weight="duotone" />
            </a>

            <a
              href="https://www.threads.com/"
              target="_blank"
              className="border border-white/70 hover:border-white text-white p-2 rounded-full transition-all hover:scale-110"
            >
              <ThreadsLogoIcon size={20} weight="duotone" />
            </a>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              className="border border-white/70 hover:border-white text-white p-2 rounded-full transition-all hover:scale-110"
            >
              <FacebookLogoIcon size={20} weight="duotone" />
            </a>
            <a
              href="https://discord.com/users/529625255229128714"
              target="_blank"
              className="border border-white/70 hover:border-white text-white p-2 rounded-full transition-all hover:scale-110"
            >
              <DiscordLogoIcon size={20} weight="duotone" />
            </a>
            <a
              href="https://github.com/ranggshadow27"
              target="_blank"
              className="border border-white/70 hover:border-white text-white p-2 rounded-full transition-all hover:scale-110"
            >
              <GithubLogoIcon size={20} weight="duotone" />
            </a>
          </motion.div>

          {/* Copyright */}
          <div className="flex items-center justify-center gap-1.5 text-[0.65rem] text-gray-400 font-bold tracking-tight">
            <span>Crafted with</span>
            <HeartIcon
              size={14}
              weight="fill"
              className="text-rose-400 inline-block"
            />
            <span>for Annisa & Rangga Wedding</span>
          </div>
          <p className="text-center text-[0.6rem] text-gray-500 font-light tracking-widest mt-1 uppercase">
            © {new Date().getFullYear()} All Rights Reserved
          </p>
          <p className="text-center text-[0.6rem] text-gray-500 font-light tracking-widest mt-1 uppercase">
            RATIPRAY
          </p>
        </div>

        {/* Trik Penutup Overleak Bounce iPhone */}
        {/* <div className="absolute top-full left-0 right-0 h-2 bg-gray-900 pointer-events-none" /> */}
      </footer>
    </>
  );
}
