"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../../../lib/supabase";
import WeddingContent from "../../../components/wedding/WeddingContent";

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

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
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
            {/* WEDDING INVITATION */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xs tracking-[4] font-medium font-['Montserrat'] mb-2"
            >
              WEDDING INVITATION
            </motion.p>

            {/* Nama Pengantin */}
            <motion.div
              className="w-full md:w-120 flex flex-wrap items-center justify-evenly mb-2"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
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

            {/* Tanggal */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-xs tracking-[4] font-medium font-['Montserrat'] mb-20"
            >
              26 SEPTEMBER 2026
            </motion.p>

            {/* Invite Text */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-m italic font-semibold font-['Montserrat'] mb-6"
            >
              We Invite You to Celebrate Our Wedding
            </motion.p>

            {/* Dear */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-sm font-['Montserrat'] mb-4"
            >
              Dear Sir / Madam,
            </motion.p>

            {/* Nama Tamu */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="text-xl font-semibold font-['Montserrat'] mb-12"
            >
              {guest.name}
            </motion.p>

            {/* Button */}
            <motion.button
              onClick={() => setIsOpened(true)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 }}
              className="bg-white/50 hover:bg-white/60 text-[#404040] h-12 w-40 font-bold rounded-2xl drop-shadow-md text-sm font-['Montserrat']"
            >
              Open Invitation
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content setelah dibuka */}
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
