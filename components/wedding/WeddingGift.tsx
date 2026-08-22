// components/wedding/WeddingGift.tsx
"use client";

import {
  Copy,
  CheckCircle,
  GiftIcon,
  CurrencyBtcIcon,
  PaypalLogoIcon,
  BankIcon,
  MapPinIcon,
  CreditCardIcon,
} from "@phosphor-icons/react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const gifts = [
  {
    id: 1,
    name: "Bank Transfer (Mandiri)",
    icon: BankIcon,
    account: "1234 5678 9012 3456",
    owner: "Annisa Lutfia Putri",
    badge: "MANDIRI",
    badgeStyle: "text-yellow-400 bg-yellow-500/10 border-yellow-400/30",
  },
  {
    id: 2,
    name: "Bank Transfer (BCA)",
    icon: BankIcon,
    account: "1234 5678 9012 3456",
    owner: "Annisa Lutfia Putri",
    badge: "BCA",
    badgeStyle: "text-blue-400 bg-blue-500/10 border-blue-400/30",
  },
  {
    id: 3,
    name: "GoPay Account",
    icon: CreditCardIcon,
    account: "0812 2234 2910",
    owner: "Rangga Tito Prayogo",
    badge: "GOPAY",
    badgeStyle: "text-emerald-400 bg-emerald-500/10 border-emerald-400/30",
  },
  {
    id: 4,
    name: "Send Your Gift At :",
    icon: MapPinIcon,
    account:
      "Jl. Mawar Indah No. 123, RT 02/RW 05, Kel. Kebayoran Baru, Jakarta Selatan 12110",
    owner: "Rangga & Annisa",
    badge: "GIFT",
    badgeStyle: "text-yellow-400 bg-yellow-500/10 border-yellow-400/30",
    isAddress: true, // Flag khusus untuk layout teks alamat
  },
];

export default function WeddingGift() {
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const copyToClipboard = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="py-16 px-6 text-white bg-linear-to-b from-[#CFCDC9]/20 via-black/30 to-[#CFCDC9]/10 font-['Montserrat'] overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ transform: "translateZ(0)" }}
        >
          <h2 className="text-3xl md:text-6xl font-['Allura'] text-amber-100 tracking-wide">
            Wedding Gift
          </h2>
          <div className="w-20 h-px bg-amber-200/50 mx-auto mt-4" />
        </motion.div>

        <motion.p
          className="text-center text-xs md:text-sm text-gray-200 max-w-xl mx-auto mb-14 leading-relaxed font-light"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
          style={{ transform: "translateZ(0)" }}
        >
          Kehadiran dan doa Anda sudah lebih dari cukup bagi kami. Namun bagi
          keluarga dan kerabat yang ingin mengirimkan tanda kasih, kami sangat
          menghargai ketulusan Anda.
        </motion.p>

        {/* Gift Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {gifts.map((gift, index) => {
            const Icon = gift.icon;
            const isCopied = copiedId === gift.id;

            return (
              <motion.div
                key={gift.id}
                className={`relative overflow-hidden rounded-2xl border border-white/20 bg-stone-900/40 p-6 shadow-xl transition-all duration-300 hover:border-amber-200/50 hover:bg-stone-900/80 ${
                  gift.isAddress ? "md:col-span-2" : ""
                }`}
                style={{
                  transform: "translateZ(0)",
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{
                  delay: index * 0.06,
                  duration: 0.45,
                  ease: "easeOut",
                }}
              >
                {/* Background Glare Effect */}
                <div
                  className="absolute -top-12 -right-12 w-32 h-32 bg-amber-200/10 rounded-full blur-xl pointer-events-none"
                  style={{ transform: "translateZ(0)" }}
                />

                {/* Top Section: Chip & Badge */}
                <div className="flex items-center justify-between mb-6 relative z-10">
                  <div className="flex items-center gap-2">
                    <GiftIcon
                      size={32}
                      weight="duotone"
                      className="text-amber-200/80"
                    />
                    <Icon
                      size={24}
                      weight="duotone"
                      className="text-white/90"
                    />
                  </div>
                  {/* Badge Warna Dinamis */}
                  <span
                    className={`text-[0.65rem] font-semibold tracking-widest border px-2.5 py-1 rounded-full uppercase ${gift.badgeStyle}`}
                  >
                    {gift.badge}
                  </span>
                </div>

                {/* Name/Label */}
                <p className="text-[.6rem] text-gray-300 uppercase tracking-wider font-bold mb-1 relative z-10">
                  {gift.name}
                </p>

                {/* Account Number / Address / Copy Status & Copy Button */}
                <div className="flex items-center justify-between gap-3 my-2 bg-black/40 rounded-xl p-3 border border-white/10 min-h-12.5 relative z-10">
                  <div
                    className={`font-mono text-sm md:text-base font-bold tracking-wider text-white flex-1 overflow-hidden ${
                      gift.isAddress
                        ? "normal-case text-xs md:text-sm font-sans font-normal leading-relaxed text-gray-200"
                        : "break-all"
                    }`}
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      {isCopied ? (
                        <motion.span
                          key="copied"
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.15 }}
                          className="text-emerald-400 text-xs uppercase font-mono md:text-sm font-semibold tracking-widest flex items-center gap-1.5"
                          style={{ display: "inline-flex" }}
                        >
                          Berhasil disalin! ✓
                        </motion.span>
                      ) : (
                        <motion.span
                          key="account"
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.15 }}
                          style={{ display: "inline-block" }}
                        >
                          {gift.account}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Copy Button Interactive */}
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => copyToClipboard(gift.account, gift.id)}
                    className="flex items-center justify-center p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors relative shrink-0 cursor-pointer self-center"
                    title={
                      gift.isAddress ? "Copy Address" : "Copy Account Number"
                    }
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      {isCopied ? (
                        <motion.div
                          key="check"
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.5, opacity: 0 }}
                          transition={{ duration: 0.15 }}
                          className="flex items-center text-emerald-400"
                        >
                          <CheckCircle size={20} weight="fill" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="copy"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.15 }}
                        >
                          <Copy size={20} weight="duotone" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </div>

                {/* Owner Name / Recipient */}
                <div className="mt-4 flex items-center justify-between text-[0.7rem] text-gray-300 tracking-wider relative z-10">
                  <span className="uppercase text-gray-400">
                    {gift.isAddress ? "Recipient" : "Account Holder"}
                  </span>
                  <span className="font-semibold text-white">{gift.owner}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
