"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { supabase } from "../../../lib/supabase";
import WeddingContent from "../../../components/wedding/WeddingContent";
import { HeartIcon, CaretDoubleUp } from "@phosphor-icons/react";

export default function InvitationPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const [guest, setGuest] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isOpened, setIsOpened] = useState(false);
  const [code, setCode] = useState("");
  const controls = useAnimation();

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

  const handleDragEnd = (event: any, info: any) => {
    if (info.offset.y < -50) {
      setIsOpened(true);
    } else {
      controls.start({
        y: 0,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      });
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 bg-[#CFCDC9] flex flex-col items-center justify-center text-center px-6">
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
            animate={{ scale: [1, 1.15, 1] }}
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
    /* 
      1. KITA TARUH BACKGROUND DI SINI (<main>)
      2. Menggunakan fixed inset-0 agar background menempel sempurna di viewport iPhone tanpa terpengaruh scroll.
    */
    <main className="relative w-full min-h-dvh overflow-x-hidden">
      {/* Container Khusus Background Image agar Stabil di Safari iOS */}
      <div className="fixed inset-0 bg-[url('/images/bg.png')] bg-cover bg-center bg-no-repeat pointer-events-none -z-10" />

      <AnimatePresence mode="wait">
        {!isOpened && (
          <motion.div
            key="landing"
            exit={{ opacity: 0, y: -100, scale: 0.98 }}
            transition={{ duration: 0.8 }}
            /* Class background di div ini sudah dihapus karena dipindah ke <main> */
            className="relative min-h-dvh w-full text-white flex flex-col antialiased items-center justify-end pb-12 text-center px-6 overflow-hidden touch-none"
          >
            {/* The Wedding Of */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <p className="text-xs tracking-[2] font-medium font-['Montserrat'] mb-2">
                THE WEDDING OF
              </p>
            </motion.div>

            {/* Nama Mempelai */}
            <motion.div
              className="w-full md:w-120 flex flex-wrap items-center justify-evenly mb-2 tracking-tight font-['Allura']"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl">Annisa</h1>
              <h1 className="text-4xl md:text-5xl text-rose-400">&</h1>
              <h1 className="text-5xl md:text-7xl">Rangga</h1>

              <div className="w-60 h-px bg-white/50 my-4"></div>
            </motion.div>

            {/* Tanggal */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-xs tracking-[2] antialiased font-medium font-['Montserrat']"
            >
              <p className="mb-1">SATURDAY</p>
              <p className="mb-5">26 - SEPTEMBER - 2026</p>
            </motion.div>

            {/* Dear Tamu */}
            <div className="overflow-hidden mb-5">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
                className="font-['Montserrat'] space-y-2"
              >
                <div className="w-30 h-px bg-white/50 mx-auto mb-4"></div>
                <p className="text-xs text-[#D9D9D9]">Dear Sir / Madam,</p>
                <p className="text-lg font-semibold text-white">{guest.name}</p>
                <div className="w-30 h-px bg-white/50 mx-auto mt-4"></div>
              </motion.div>
            </div>

            {/* We Invite */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <p className="text-[.6rem] text-[#D9D9D9] tracking-[2] font-medium font-['Montserrat'] mb-8">
                WE INVITE YOU TO CELEBRATE OUR <br /> WEDDING CEREMONY
              </p>
            </motion.div>

            {/* AREA DRAG/SWIPE UP */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="w-full md:w-sm pt-4 flex flex-col items-center justify-center cursor-grab active:cursor-grabbing"
            >
              <motion.div
                drag="y"
                dragConstraints={{ top: 0, bottom: 0 }}
                dragElastic={0.4}
                onDragEnd={handleDragEnd}
                animate={controls}
                className="flex flex-col items-center justify-center p-4 bg-white/10 rounded-3xl backdrop-blur-sm border border-white/20"
                whileInView={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <CaretDoubleUp
                  size={18}
                  weight="light"
                  className="text-white animate-pulse"
                />
                <span className="text-[.6rem] font-['Montserrat'] text-white/80 mt-2 font-medium tracking-widest uppercase">
                  Open Invitation
                </span>
              </motion.div>
            </motion.div>
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
