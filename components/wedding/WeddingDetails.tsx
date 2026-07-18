// components/WeddingDetails.tsx
import { Calendar, MapPin, ExternalLink } from "lucide-react";
import Countdown from "../Countdown";

export default function WeddingDetails() {
  return (
    <div className="py-20 px-8 bg-linear-to-b from-[#CFCDC9]/90 to-[#CFCDC9]/60  backdrop-blur-sm">
      <div className="max-w-5xl mx-auto font-['Montserrat']">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-['Allura'] text-[#3E2900] tracking-wide">
            We Are Getting Married !
          </h2>
          <div className="w-24 h-px bg-[#3E2900] mx-auto mt-6"></div>
        </div>

        {/* Ayat Ar-Rum */}
        <div className="max-w-full mx-auto text-center mb-16">
          <p className="text-base md:text-xl leading-relaxed italic text-[#3E2900]/80 mb-4">
            "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan
            untukmu pasangan hidup dari jenismu sendiri, supaya kamu cenderung
            dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa
            kasih dan sayang."
          </p>
          <p className="text-[#3E2900] font-bold text-lg">Q.S. Ar-Rum : 21</p>
        </div>

        {/* Detail Pengantin */}
        <div className="mb-20 ">
          <div className="flex flex-col md:flex-row items-center justify-center">
            {/* Pengantin Perempuan */}
            <div className="w-screen p-6 flex flex-col md:flex-row items-center gap-8 md:gap-10 text-right">
              <div className="flex items-center gap-4 md:gap-8">
                <div className="flex-1">
                  <h3 className="text-lg md:text-2xl font-base text-gray-800">
                    <span className="font-bold">Annisa</span> Lutfia Putri
                    Pratama
                  </h3>
                  <p className="text-[#3E2900]/80 mt-2 text-sm">
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
            </div>

            <div className="text-7xl md:text-8xl font-['Allura'] text-[#3E2900] hidden md:block">
              {" "}
              &{" "}
            </div>
            <div className="text-6xl font-['Allura'] text-[#3E2900] md:hidden my-4">
              {" "}
              &{" "}
            </div>

            {/* Pengantin Laki-laki */}
            <div className="w-screen p-6 flex flex-col md:flex-row-reverse items-center gap-8 md:gap-10 text-left md:text-left ">
              <div className=" flex items-center gap-4 md:gap-8 ">
                <div className="w-55 h-55 md:w-75 md:h-70 rounded-3xl flex-1">
                  <img
                    src="/images/groom.png"
                    alt="Pengantin Laki-laki"
                    className="w-full h-full object-scale-down"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="text-lg md:text-2xl font-base text-gray-800">
                    <span className="font-bold">Rangga</span> Tito Prayogo
                  </h3>
                  <p className="text-[#3E2900]/80 mt-2 text-sm">
                    Putra Pertama dari Bapak Gatot Subroto & Ibu Wati
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Save The Date + Countdown */}
        <div className="text-center mb-16">
          <h2 className="text-6xl md:text-7xl font-['Allura'] text-rose-700 mb-6">
            Save The Date
          </h2>

          <Countdown targetDate="2026-12-13T08:00:00" />

          {/* Detail Tanggal & Lokasi tetap sama */}
        </div>

        {/* Lokasi */}
        <div className="text-center max-w-md mx-auto">
          <div className="flex justify-center mb-4">
            <MapPin className="w-8 h-8 text-rose-600" />
          </div>

          <p className="text-gray-700 leading-relaxed mb-8">
            Jl. Contoh Alamat Pernikahan No. 123
            <br />
            Kelurahan XYZ, Kecamatan ABC
            <br />
            Kota Sample, Indonesia
          </p>

          <button
            onClick={() => window.open("https://maps.google.com", "_blank")}
            className="group flex items-center gap-3 mx-auto bg-rose-600 hover:bg-rose-700 text-white px-8 py-4 rounded-full transition-all active:scale-95"
          >
            Buka di Google Maps
            <ExternalLink className="w-5 h-5 group-hover:rotate-45 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
