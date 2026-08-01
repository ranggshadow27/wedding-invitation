// components/wedding/RsvpSection.tsx
"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import {
  Heart,
  CheckCircle2,
  XCircle,
  Send,
  UserCheck,
  UserX,
} from "lucide-react";
import { motion } from "framer-motion";

interface RsvpSectionProps {
  guest: any;
}

export default function RsvpSection({ guest }: RsvpSectionProps) {
  const [name, setName] = useState(guest?.name || "");
  const [attending, setAttending] = useState<boolean | null>(null);
  const [totalAttending, setTotalAttending] = useState(1);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [rsvps, setRsvps] = useState<any[]>([]);

  // Helper function untuk mengubah tanggal menjadi time ago format
  const formatDateDiff = (dateString: string) => {
    if (!dateString) return "";
    const now = new Date();
    const past = new Date(dateString);
    const diffInMs = now.getTime() - past.getTime();

    const diffInMins = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMins < 1) return "Just now";
    if (diffInMins < 60) return `${diffInMins}m ago`;
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${diffInDays}d ago`;
  };

  const fetchRsvps = async () => {
    const { data } = await supabase
      .from("rsvps")
      .select("*")
      .order("submitted_at", { ascending: false });
    setRsvps(data || []);
  };

  useEffect(() => {
    fetchRsvps();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (attending === null)
      return alert("Silakan pilih kepastian kehadiran ya ❤️");

    setSubmitting(true);

    const { error } = await supabase.from("rsvps").insert({
      guest_name: name,
      attending: attending ? true : false,
      total_attending: attending ? totalAttending : 0,
      message: message.trim(),
      guest_id: guest?.id,
    });

    if (error) {
      alert("Gagal menyimpan RSVP, coba lagi ya");
    } else {
      alert("Terima kasih! Konfirmasi berhasil disimpan ❤️");
      setMessage("");
      setAttending(null);
      fetchRsvps();
    }

    setSubmitting(false);
  };

  return (
    <section className="py-16 px-6  bg-linear-to-b from-[#CFCDC9]/20 via-black/30 to-[#CFCDC9]/10 font-['Montserrat'] w-full overflow-hidden text-white">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-6xl font-['Allura'] text-amber-100 tracking-wide">
            Confirm Your Attendance
          </h2>
          <div className="w-20 h-px bg-amber-200/50 mx-auto mt-3"></div>
        </motion.div>

        <motion.p
          className="text-center text-xs md:text-sm text-gray-200 max-w-xl mx-auto mb-14 leading-relaxed font-light"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Kehadiran serta doa restu Anda merupakan hadiah dan kesan terindah di
          hari bahagia kami. Mohon kesediaannya untuk mengonfirmasi kehadiran di
          bawah ini.
        </motion.p>

        {/* Main Grid Layout */}
        <div className="grid md:grid-cols-2 gap-8 backdrop-blur-sm items-start">
          {/* ================= FORM CARD ================= */}
          <motion.div
            className="rounded-2xl border border-white/20 bg-white/10 p-6 md:p-8 relative overflow-hidden"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {/* Background Glare */}
            <div className="absolute -top-16 -left-16 w-32 h-32 bg-rose-400/10 rounded-full blur-3xl pointer-events-none" />

            <h3 className="text-lg font-semibold text-white mb-6 tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-400"></span>
              RSVP Confirmation
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5 text-gray-200">
              {/* Input Nama */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-gray-300">
                  Your Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Masukkan nama Anda"
                  className="w-full border border-white/20 bg-black/30 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-amber-200 focus:ring-1 focus:ring-amber-200/50 transition-all"
                  required
                />
              </div>

              {/* Radio Attendance Custom */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-gray-300">
                  Will you be there? *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setAttending(true)}
                    className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-medium transition-all ${
                      attending === true
                        ? "bg-emerald-500/20 border-emerald-400 text-emerald-200 shadow-lg"
                        : "bg-black/20 border-white/10 text-gray-300 hover:bg-white/10"
                    }`}
                  >
                    <UserCheck className="w-4 h-4 text-emerald-400" />
                    I'll attend ❤️
                  </button>

                  <button
                    type="button"
                    onClick={() => setAttending(false)}
                    className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-medium transition-all ${
                      attending === false
                        ? "bg-rose-500/20 border-rose-400 text-rose-200 shadow-lg"
                        : "bg-black/20 border-white/10 text-gray-300 hover:bg-white/10"
                    }`}
                  >
                    <UserX className="w-4 h-4 text-rose-400" />
                    Can't attend 😔
                  </button>
                </div>
              </div>

              {/* Input Total Person */}
              {attending && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-gray-300">
                    Total Attending (Person)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="2"
                    value={totalAttending}
                    onChange={(e) => setTotalAttending(Number(e.target.value))}
                    className="w-full border border-white/20 bg-black/30 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-200 transition-all"
                  />
                </motion.div>
              )}

              {/* Wishes TextArea */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-gray-300">
                  Your Wishes & Prayers
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tuliskan ucapan dan doa terbaik Anda..."
                  rows={4}
                  className="w-full border border-white/20 bg-black/30 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-amber-200 focus:ring-1 focus:ring-amber-200/50 transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting || attending === null}
                className="w-full flex items-center justify-center gap-2 bg-linear-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 disabled:opacity-40 text-white py-3 px-6 rounded-xl font-semibold text-xs uppercase tracking-widest transition-all shadow-lg active:scale-[0.98] cursor-pointer"
              >
                {submitting ? (
                  "Submitting..."
                ) : (
                  <>
                    <span>Send Confirmation</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* ================= WISHES & RSVP LIST ================= */}
          <motion.div
            className="rounded-2xl border border-white/20 bg-white/10  p-6 md:p-8 flex flex-col h-130"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
              <h3 className="text-lg font-semibold text-white tracking-wide flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                Wishes & Greetings
              </h3>
              <span className="text-xs bg-white/10 px-3 py-2 rounded-xl text-amber-200 font-mono">
                {rsvps.length} messages
              </span>
            </div>

            {/* Scrollable Container */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-1 custom-scrollbar">
              {rsvps.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-gray-400">
                  <Heart className="w-12 h-12 mb-3 text-rose-300/40 animate-pulse" />
                  <p className="text-xs font-light">
                    Belum ada konfirmasi. Jadilah yang pertama!
                  </p>
                </div>
              ) : (
                rsvps.map((rsvp, index) => (
                  <motion.div
                    key={index}
                    className="p-4 rounded-xl border border-white/10 bg-black/20 hover:bg-black/30 transition-all"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.04 }}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-linear-to-tr from-rose-400 to-amber-200 text-gray-900 font-bold text-xs flex items-center justify-center shadow-md">
                          {rsvp.guest_name?.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-xs text-white">
                            {rsvp.guest_name}
                          </p>
                          <p className="text-[0.65rem] text-gray-400">
                            {formatDateDiff(rsvp.submitted_at)}
                          </p>
                        </div>
                      </div>

                      {/* Status Badge */}
                      {rsvp.attending ? (
                        <span className="inline-flex items-center gap-1 text-[0.65rem] font-medium text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          Hadir ({rsvp.total_attending || 1})
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[0.65rem] font-medium text-rose-300 bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded-full">
                          <XCircle className="w-3 h-3 text-rose-400" />
                          Absen
                        </span>
                      )}
                    </div>

                    {rsvp.message && (
                      <p className="text-xs text-gray-200 leading-relaxed font-light italic mt-2 pl-10">
                        "{rsvp.message}"
                      </p>
                    )}
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
