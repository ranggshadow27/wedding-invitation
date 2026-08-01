// components/wedding/WeddingGift.tsx
"use client";

import {
  Copy,
  CheckCircle,
  CurrencyBtc,
  CurrencyEth,
  PaypalLogo,
  Bank,
  SimCard,
  GiftIcon,
  CurrencyBtcIcon,
  CurrencyEthIcon,
  PaypalLogoIcon,
  BankIcon,
} from "@phosphor-icons/react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const gifts = [
  {
    id: 1,
    name: "Bitcoin Wallet",
    icon: CurrencyBtcIcon,
    account: "1111 2222 3333 4567",
    owner: "Annisa Lutfia Putri",
    badge: "CRYPTO",
  },
  {
    id: 2,
    name: "Bank Transfer (Mandiri)",
    icon: BankIcon,
    account: "1234 5678 9012 3456",
    owner: "Rangga Tito Prayogo",
    badge: "MANDIRI",
  },
  {
    id: 3,
    name: "PayPal Account",
    icon: PaypalLogoIcon,
    account: "paypal.me/yourwedding",
    owner: "Rangga Tito Prayogo",
    badge: "E-WALLET",
  },
  {
    id: 4,
    name: "Bank Transfer (BCA)",
    icon: BankIcon,
    account: "1234 5678 9012 3456",
    owner: "Rangga Tito Prayogo",
    badge: "BCA",
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-6xl font-['Allura'] text-amber-100 tracking-wide">
            Wedding Gift
          </h2>
          <div className="w-20 h-px bg-amber-200/50 mx-auto mt-4"></div>
        </motion.div>

        <motion.p
          className="text-center text-xs md:text-sm text-gray-200 max-w-xl mx-auto mb-14 leading-relaxed font-light"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
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
                className="relative overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-6 shadow-xl transition-all duration-300 hover:border-amber-200/50 hover:bg-white/15 backdrop-blur-xs transform-gpu will-change-transform"
                style={{ backfaceVisibility: "hidden" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.08,
                  duration: 0.5,
                  ease: "easeOut",
                }}
              >
                {/* Background Glare Effect */}
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />

                {/* Top Section: Chip & Badge */}
                <div className="flex items-center justify-between mb-6">
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
                  <span className="text-[0.65rem] font-semibold tracking-widest text-amber-200/90 bg-amber-400/10 border border-amber-200/20 px-2.5 py-1 rounded-full uppercase">
                    {gift.badge}
                  </span>
                </div>

                {/* Name/Label */}
                <p className="text-[.6rem] text-gray-300 uppercase tracking-wider font-bold mb-1">
                  {gift.name}
                </p>

                {/* Account Number / Copy Status & Copy Button */}
                <div className="flex items-center justify-between gap-3 my-2 bg-black/20 rounded-xl p-3 border border-white/10 min-h-12.5">
                  {/* Container Teks Rekening dengan Transisi Mode Wait */}
                  <div className="font-mono text-sm md:text-base font-bold tracking-wider text-white break-all flex-1">
                    <AnimatePresence mode="wait">
                      {isCopied ? (
                        <motion.span
                          key="copied"
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          transition={{ duration: 0.2 }}
                          className="text-emerald-400 text-xs uppercase font-mono md:text-sm font-semibold tracking-widest flex items-center gap-1.5"
                        >
                          Berhasil disalin! ✓
                        </motion.span>
                      ) : (
                        <motion.span
                          key="account"
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          transition={{ duration: 0.2 }}
                        >
                          {gift.account}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Copy Button Interactive (Menggunakan animasi bawaanmu) */}
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => copyToClipboard(gift.account, gift.id)}
                    className="flex items-center justify-center p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors relative shrink-0 cursor-pointer"
                    title="Copy Account Number"
                  >
                    <AnimatePresence mode="wait">
                      {isCopied ? (
                        <motion.div
                          key="check"
                          initial={{ scale: 0, rotate: -45 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 20,
                          }}
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
                        >
                          <Copy size={20} weight="duotone" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </div>

                {/* Owner Name */}
                <div className="mt-4 flex items-center justify-between text-[0.7rem] text-gray-300 tracking-wider">
                  <span className="uppercase text-gray-400">
                    Account Holder
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
