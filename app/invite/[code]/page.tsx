"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../../../lib/supabase";
import WeddingContent from "../../../components/wedding/WeddingContent";
import { HeartIcon } from "@phosphor-icons/react";

export default function InvitationPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const [guest, setGuest] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isOpened, setIsOpened] = useState(false);
  const [code, setCode] = useState("");

  useEffect(() => {
    params.then((p) => setCode(p.code));
  }, [params]);

  useEffect(() => {
    if (!code) return;
    supabase
      .from("guests")
      .select("*")
      .eq("unique_code", code)
      .single()
      .then(({ data }) => {
        setGuest(data);
        setLoading(false);
      });
  }, [code]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#CFCDC9] flex flex-col items-center justify-center text-center px-6">
        {/* Lingkaran + Heart */}
        <div className="relative mb-10">
          <motion.div
            className="w-26 h-26 border-4 border-white/30 border-t-rose-400 rounded-full"
            animate={{ rotate: 360 }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            animate={{
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <HeartIcon size={40} weight="duotone" className="text-rose-400" />
          </motion.div>
        </div>

        {/* Text */}
        <h2 className="text-xl font-semibold font-['Montserrat'] text-gray-600 mb-3">
          Preparing Invitation
        </h2>

        <p className="text-xs font-['Montserrat'] text-gray-600 max-w-60">
          Currently setting up your invitation kindly please wait a moment...
        </p>
      </div>
    );
  }

  if (!guest) return <div>Undangan tidak ditemukan</div>;

  return (
    <main>
      <AnimatePresence mode="wait">
        {!isOpened && (
          <motion.div
            key="landing"
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.8 }}
            className="min-h-screen text-white flex flex-col antialiased items-center justify-end pb-20 text-center px-6 bg-[url(/images/bg.png)] bg-cover bg-center"
          >
            {/* 2. Group: Wedding Invitation, Tanggal, We Invite (muncul bareng) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <p className="text-xs tracking-[4] font-medium font-['Montserrat'] mb-2">
                WEDDING INVITATION
              </p>
            </motion.div>

            {/* 1. Annisa & Rangga - Slide Up */}
            <motion.div
              className="w-full md:w-120 flex flex-wrap items-center justify-evenly mb-2"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl tracking-tight font-['Allura']">
                Annisa
              </h1>
              <h1 className="text-4xl md:text-5xl tracking-tight text-rose-400 font-['Allura']">
                &
              </h1>
              <h1 className="text-5xl md:text-7xl tracking-tight font-['Allura']">
                Rangga
              </h1>
            </motion.div>

            {/* 2. Group: Wedding Invitation, Tanggal, We Invite (muncul bareng) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <p className="text-xs tracking-[4] font-medium font-['Montserrat'] mb-20">
                26 SEPTEMBER 2026
              </p>

              <p className="text-m italic font-semibold font-['Montserrat'] mb-6">
                We Invite You to Celebrate Our Wedding
              </p>
            </motion.div>

            {/* 3. Group: Dear + Nama Tamu (muncul bareng) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              <p className="text-sm font-['Montserrat'] mb-4">
                Dear Sir / Madam,
              </p>
              <p className="text-xl font-semibold font-['Montserrat'] mb-12">
                {guest.name}
              </p>
            </motion.div>

            {/* 4. Button - Slide Up Terakhir */}
            {/* Button dengan animasi wiggle */}
            <motion.button
              onClick={() => setIsOpened(true)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 40 }}
              animate={{
                opacity: 1,
                x: 0,
                // Efek wiggle / bounce berulang
                y: [0, -8, 0, -5, 0],
              }}
              transition={{
                delay: 1.5,
                duration: 0.8,
                y: {
                  duration: 5.0,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                },
              }}
              className="bg-white/50 hover:bg-white/60 text-[#404040] h-12 w-40 font-bold rounded-2xl drop-shadow-md text-sm font-['Montserrat']"
            >
              Open Invitation
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpened && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <WeddingContent guest={guest} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
