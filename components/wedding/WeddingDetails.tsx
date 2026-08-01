// components/wedding/WeddingDetails.tsx
"use client";

import { motion } from "framer-motion";
import Countdown from "../Countdown";
import { ArrowSquareOutIcon, MapPinIcon } from "@phosphor-icons/react";

export default function WeddingDetails() {
  return (
    <div className="py-10 px-8 backdrop-brightness-75 bg-linear-to-b from-[#CFCDC9]/90 to-[#CFCDC9]/60 overflow-hidden">
      <div className="max-w-5xl mx-auto font-['Montserrat']">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-6xl font-['Allura'] text-[#3E2900] tracking-wide">
            We Are Getting Married !
          </h2>
          <div className="w-20 h-px bg-[#3E2900] mx-auto mt-3"></div>
        </motion.div>

        {/* Ayat Ar-Rum */}
        <motion.div
          className="max-w-full mx-auto text-center mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs md:text-sm leading-relaxed italic text-gray-800 mb-3 font-light">
            "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan
            untukmu pasangan hidup dari jenismu sendiri, supaya kamu cenderung
            dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa
            kasih dan sayang."
          </p>
          <p className="text-gray-800 font-bold text-xs tracking-widest uppercase">
            — Q.S. Ar-Rum : 21
          </p>
        </motion.div>

        {/* Detail Pengantin */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row items-center justify-center">
            {/* Pengantin Perempuan */}
            <motion.div
              className="w-full p-6 flex flex-col md:flex-row items-center gap-8 md:gap-10 text-right transform-gpu"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="flex items-center gap-4 md:gap-8">
                <div className="flex-1">
                  <p className="text-base md:text-2xl font-base text-gray-800">
                    <span className="font-bold">Annisa</span> Lutfia Putri
                    Pratama
                  </p>
                  <p className="text-gray-800/80 mt-2 text-xs">
                    Putri Pertama dari Bapak Deden Achmadi & Ibu Sulviana Syafri
                    (Almh)
                  </p>
                </div>

                <div className="w-55 h-55 md:w-75 md:h-70 flex-1">
                  <img
                    src="/images/bride.png"
                    alt="Pengantin Perempuan"
                    className="w-full h-full object-scale-down"
                  />
                </div>
              </div>
            </motion.div>

            {/* Simbol & */}
            <motion.div
              className="text-4xl md:text-5xl font-semibold font-['Allura'] text-[#3E2900]"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              &
            </motion.div>

            {/* Pengantin Laki-laki */}
            <motion.div
              className="w-full p-6 flex flex-col md:flex-row-reverse items-center gap-8 md:gap-10 text-left transform-gpu"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="flex items-center gap-4 md:gap-8">
                <div className="w-55 h-55 md:w-75 md:h-70 rounded-3xl flex-1">
                  <img
                    src="/images/groom.png"
                    alt="Pengantin Laki-laki"
                    className="w-full h-full object-scale-down"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="text-base md:text-2xl font-base text-gray-800">
                    <span className="font-bold">Rangga</span> Tito Prayogo
                  </h3>
                  <p className="text-gray-800/80 mt-2 text-xs">
                    Putra Pertama dari Bapak Gatot Subroto & Ibu Wati
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Save The Date */}
        <motion.div
          className="text-center mb-18"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-6xl font-['Allura'] text-[#3E2900] tracking-wide">
            Save The Date
          </h2>
        </motion.div>

        {/* Countdown Container */}
        <motion.div
          className="relative w-full max-w-sm md:max-w-md mx-auto mb-16 md:mb-26 px-2 transform-gpu"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="relative w-full h-120 aspect-1/2 rounded-t-[4rem] rounded-b-none overflow-hidden shadow-xl bg-stone-200 z-10">
            <img
              src="/images/gallery/img_date.png"
              alt="Wedding Photo"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="absolute inset-0 pointer-events-none z-20 select-none px-10 flex flex-col items-center justify-end">
            <img
              src="/rec.png"
              alt="Fence Vector Top"
              className="w-full h-160 md:h-130 object-fill items-center opacity-90 -mt-8"
            />
          </div>

          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-30 w-full max-w-[90%] sm:max-w-none">
            <Countdown targetDate="2026-09-26T09:00:00" />
          </div>
        </motion.div>

        {/* Event Details & Location */}
        <motion.div
          className="flex flex-col text-center items-center justify-center max-w-lg mx-auto bg-black/15 border border-white/10 p-8 rounded-3xl transform-gpu"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="space-y-1 mb-6">
            <p className="text-amber-200 font-semibold text-xs tracking-widest uppercase">
              SATURDAY
            </p>
            <p className="text-sm md:text-3xl font-bold tracking-widest text-white">
              26 SEPTEMBER 2026
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full max-w-xs my-2 py-4 border-y border-white/10">
            <div className="border-r border-white/10 pr-2">
              <p className="text-[0.65rem] uppercase tracking-wider text-amber-200 font-semibold mb-1">
                Akad Nikah
              </p>
              <p className="text-xs md:text-sm font-medium text-white">
                09.00 - 10.00 WIB
              </p>
            </div>
            <div className="pl-2">
              <p className="text-[0.65rem] uppercase tracking-wider text-amber-200 font-semibold mb-1">
                Resepsi
              </p>
              <p className="text-xs md:text-sm font-medium text-white">
                11.00 - 16.00 WIB
              </p>
            </div>
          </div>

          <div className="my-6">
            <MapPinIcon
              size={32}
              weight="duotone"
              className="text-amber-200 mx-auto mb-3"
            />
            <p className="font-bold text-xs md:text-sm tracking-wide text-white mb-2 uppercase">
              Gedung Serbaguna Mutiara Bekasi Jaya Cibarusah
            </p>
            <p className="text-[0.75rem] text-gray-100 font-light leading-relaxed max-w-sm">
              Ruko Pelangi Blok P2 No. 12A, RW.21, Sindangmulya, Kec. Cibarusah,
              Kabupaten Bekasi, Jawa Barat 17340
            </p>
          </div>

          {/* Google Maps Button - Menggunakan motion.button ringkas */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              window.open("https://maps.app.goo.gl/MPQG5Svx15RAzmEZ8", "_blank")
            }
            className="flex items-center gap-2 bg-linear-to-r from-amber-200/20 to-amber-400/20 hover:from-amber-200/30 hover:to-amber-400/30 border border-amber-200/40 text-amber-100 px-6 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold transition-all shadow-md cursor-pointer mt-2 animate-bounce"
          >
            <span>Google Maps</span>
            <ArrowSquareOutIcon size={18} weight="duotone" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
