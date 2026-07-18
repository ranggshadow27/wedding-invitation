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

export default function WeddingFooter() {
  return (
    <footer className="bg-gray-900 text-white py-20 px-6 font-['Montserrat']">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 text-center md:text-left mb-16">
          {/* Family Perempuan */}
          <div className="md:text-left">
            <p className="text-rose-400 text-xs tracking-widest mb-3">
              THE BIG FAMILY OF
            </p>
            <p className="text-2xl font-bold">ANNISA LUTFIA PUTRI PRATAMA</p>
          </div>

          {/* Logo Tengah */}
          <div className="flex justify-center items-center">
            <a
              href="#"
              className="text-white p-2 rounded-full transition-all hover:scale-110"
            >
              <HeartIcon size={32} weight="duotone" />
            </a>
          </div>

          {/* Family Laki-laki */}
          <div className="md:text-right">
            <p className="text-rose-400 text-xs tracking-widest mb-3">
              THE BIG FAMILY OF
            </p>
            <p className="text-2xl font-bold">RANGGA TITO PRAYOGO</p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-700 mb-10"></div>

        {/* Social Media Icons */}
        <div className="flex justify-center gap-4 mb-8">
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
        </div>

        {/* Copyright */}
        <div className="text-center font-semibold text-xs text-[#D9D9D9]">
          © 2026 ratipray. All Rights Reserved.
        </div>

        <div className="text-center text-xs font-light text-[#D9D9D9]/50 pt-1">
          icaa-awe wedding invitation
        </div>
      </div>
    </footer>
  );
}
