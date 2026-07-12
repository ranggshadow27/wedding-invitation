// components/WeddingDetails.tsx
import { Calendar, MapPin, ExternalLink } from "lucide-react";
import Countdown from "../Countdown";

export default function WeddingDetails() {
  return (
    <div className="bg-white">
      <div className="pt-12 pb-20 px-6 max-w-5xl mx-auto font-['Montserrat_Alternates']">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-['Allura'] text-rose-700 tracking-wide">
            We Are Getting Married
          </h2>
          <div className="w-24 h-px bg-rose-400 mx-auto mt-6"></div>
        </div>

        {/* Ayat Ar-Rum */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-lg md:text-xl leading-relaxed italic text-gray-800 mb-4">
            "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan
            untukmu pasangan hidup dari jenismu sendiri, supaya kamu cenderung
            dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa
            kasih dan sayang."
          </p>
          <p className="text-rose-700 font-medium">Q.S. Ar-Rum : 21</p>
        </div>

        {/* Detail Pengantin */}
        <div className="mb-20">
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20">
            {/* Pengantin Perempuan */}
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-10 text-center md:text-left">
              <div className="w-64 h-64 md:w-72 md:h-72 rounded-3xl overflow-hidden border-8 border-rose-100 shadow-xl">
                <img
                  src="/images/bride.jpg"
                  alt="Pengantin Perempuan"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-3xl md:text-4xl font-semibold text-gray-800">
                  Aisyah Putri
                </h3>
                <p className="text-rose-700 mt-2">
                  Putri Pertama dari Bapak & Ibu
                </p>
              </div>
            </div>

            <div className="text-7xl md:text-8xl font-['Allura'] text-rose-400 hidden md:block">
              {" "}
              &{" "}
            </div>
            <div className="text-6xl font-['Allura'] text-rose-400 md:hidden my-4">
              {" "}
              &{" "}
            </div>

            {/* Pengantin Laki-laki */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-10 text-center md:text-right">
              <div className="w-64 h-64 md:w-72 md:h-72 rounded-3xl overflow-hidden border-8 border-rose-100 shadow-xl">
                <img
                  src="/images/groom.jpg"
                  alt="Pengantin Laki-laki"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-3xl md:text-4xl font-semibold text-gray-800">
                  Ahmad Rafi
                </h3>
                <p className="text-rose-700 mt-2">
                  Putra Pertama dari Bapak & Ibu
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Save The Date + Countdown */}
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
