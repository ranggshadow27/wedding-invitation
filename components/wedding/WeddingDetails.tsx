// components/wedding/WeddingDetails.tsx
import { motion } from "framer-motion";
import { Calendar, MapPin, ExternalLink } from "lucide-react";
import Countdown from "../Countdown";
import { ArrowSquareOutIcon, MapPinIcon } from "@phosphor-icons/react";

export default function WeddingDetails() {
  return (
    <div className="py-20 px-8 bg-linear-to-b from-[#CFCDC9]/90 to-[#CFCDC9]/60 backdrop-blur-sm overflow-hidden">
      <div className="max-w-5xl mx-auto font-['Montserrat']">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-['Allura'] text-[#3E2900] tracking-wide">
            We Are Getting Married !
          </h2>
          <div className="w-24 h-px bg-[#3E2900] mx-auto mt-6"></div>
        </motion.div>

        {/* Ayat Ar-Rum */}
        <motion.div
          className="max-w-full mx-auto text-center mb-10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <p className="text-base md:text-xl leading-relaxed italic text-gray-800/80 mb-4">
            "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan
            untukmu pasangan hidup dari jenismu sendiri, supaya kamu cenderung
            dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa
            kasih dan sayang."
          </p>
          <p className="text-gray-800 font-bold text-lg">Q.S. Ar-Rum : 21</p>
        </motion.div>

        {/* Detail Pengantin */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row items-center justify-center">
            {/* Pengantin Perempuan */}
            <motion.div
              className="w-screen p-6 flex flex-col md:flex-row items-center gap-8 md:gap-10 text-right"
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
            >
              <div className="flex items-center gap-4 md:gap-8">
                <div className="flex-1">
                  <motion.h3
                    className="text-xl md:text-2xl font-base text-gray-800"
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    <span className="font-bold">Annisa</span> Lutfia Putri
                    Pratama
                  </motion.h3>
                  <motion.p
                    className="text-gray-800/80 mt-2 text-sm"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                  >
                    Putri Pertama dari Bapak Deden Achmadi & Ibu Sulviana Syafri
                    (Almh)
                  </motion.p>
                </div>

                <motion.div
                  className="w-55 h-55 md:w-75 md:h-70 flex-1 "
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  <img
                    src="/images/bride.png"
                    alt="Pengantin Perempuan"
                    className="w-full h-full object-scale-down "
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Simbol & */}
            <motion.div
              className="text-4xl md:text-5xl font-semibold font-['Allura'] text-[#3E2900]"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              &
            </motion.div>

            {/* Pengantin Laki-laki */}
            <motion.div
              className="w-screen p-6 flex flex-col md:flex-row-reverse items-center gap-8 md:gap-10 text-left"
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
            >
              <div className="flex items-center gap-4 md:gap-8">
                <motion.div
                  className="w-55 h-55 md:w-75 md:h-70 rounded-3xl flex-1"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                >
                  <img
                    src="/images/groom.png"
                    alt="Pengantin Laki-laki"
                    className="w-full h-full object-scale-down"
                  />
                </motion.div>

                <div className="flex-1">
                  <motion.h3
                    className="text-xl md:text-2xl font-base text-gray-800"
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    <span className="font-bold">Rangga</span> Tito Prayogo
                  </motion.h3>
                  <motion.p
                    className="text-gray-800/80 mt-2 text-sm"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                  >
                    Putra Pertama dari Bapak Gatot Subroto & Ibu Wati
                  </motion.p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Save The Date (Judul) */}
        <motion.div
          className="text-center mb-18"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <h2 className="text-4xl md:text-6xl font-['Allura'] text-[#3E2900] tracking-wide">
            Save The Date
          </h2>
        </motion.div>

        {/* 
          Container Pembungkus Utama (Relative)
          Membungkus Image, Vector, dan Countdown agar tersusun rapi secara bertumpuk.
          Menambahkan `mb-32` agar bagian bawah tidak menabrak teks lokasi akibat efek gantung countdown.
        */}
        <motion.div
          className="relative w-full max-w-sm md:max-w-md mx-auto mb-16 md:mb-26 px-2"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* 1. LAYER 1: Container Gambar (Model Pintu) */}
          <div className="relative w-full h-120 aspect-1/2 rounded-t-[4rem] rounded-b-none overflow-hidden shadow-xl bg-stone-200 z-10">
            <img
              src="/images/gallery/img_date.png"
              alt="Wedding Photo"
              className="w-full h-full object-cover"
            />
          </div>

          {/* 2. LAYER 2: Container Vector Fence (Di atas Gambar) */}
          <div className="absolute inset-0 pointer-events-none z-20 select-none px-10 flex flex-col items-center justify-end">
            <img
              src="/rec.png"
              alt="Fence Vector Top"
              className="w-full h-160 md:h-130 object-fill items-center opacity-90 -mt-8"
            />
          </div>

          {/* 3. LAYER 3: Container Countdown Gantung (Paling Depan / z-30) */}
          {/* 
            `absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2`:
            Menaruh komponen persis di tengah bawah gambar, lalu ditarik ke bawah 50% (`translate-y-1/2`) 
            agar terpotong setengah badan di dalam gambar dan setengahnya lagi meluber keluar.
          */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-30 w-full max-w-[90%] sm:max-w-none">
            <Countdown targetDate="2026-09-26T09:00:00" />
          </div>
        </motion.div>

        {/* Lokasi */}
        <motion.div
          className="text-center max-w-md mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <p className="text-gray-700 font-medium text-lg md:text-xl leading-relaxed">
            Saturday
          </p>

          <p className="text-gray-700 font-bold text-2xl md:text-3xl leading-relaxed">
            26 September 2026
          </p>

          <p className="text-gray-700 font-medium text-base md:text-xl leading-relaxed">
            08.00 - 16.00
          </p>

          <div className="h-px bg-gray-700 my-5"></div>

          <div className="flex justify-center mb-4">
            <MapPinIcon size={32} weight="duotone" className="text-gray-800" />
          </div>

          <p className="text-gray-700 font-medium text-sm md:text-base leading-relaxed">
            <b>GEDUNG SERBAGUNA MUTIARA CIBARUSAH</b>
            <br />
            <br />
            Ruko Pelangi Blok P2 No. 12A, RW.21, Sindangmulya
            <br />
            Kec. Cibarusah, Kabupaten Bekasi
            <br />
            Jawa Barat 17340
          </p>

          <button
            onClick={() => window.open("https://maps.google.com", "_blank")}
            className="group flex mt-10 items-center gap-1 font-medium text-sm md:text-base mx-auto backdrop-blur-md bg-white/80 hover:bg-white text-gray-800 px-6 py-3 rounded-full transition-all active:scale-95"
          >
            Google Maps
            <ArrowSquareOutIcon
              className="group-hover:rotate-45 transition-transform cursor-pointer"
              size={24}
              weight="duotone"
            />
          </button>
        </motion.div>
      </div>
    </div>
  );
}
