// components/wedding/RsvpSection.tsx
"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { User, Heart } from "lucide-react";
import { motion } from "framer-motion";

interface RsvpSectionProps {
  guest: any;
}

export default function RsvpSection({ guest }: RsvpSectionProps) {
  const [name, setName] = useState(guest?.name || "unknown");
  const [attending, setAttending] = useState<boolean | null>(null);
  const [totalAttending, setTotalAttending] = useState(1);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [rsvps, setRsvps] = useState<any[]>([]);

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
    if (!attending) return alert("Pilih kehadiran dulu ya");

    setSubmitting(true);

    const { error } = await supabase.from("rsvps").insert({
      guest_name: name,
      attending: attending ? true : false,
      total_attending: attending ? totalAttending : 0,
      message: message.trim(),
      guest_id: guest.id,
    });

    if (error) {
      alert("Gagal submit RSVP, coba lagi");
    } else {
      alert("Terima kasih! RSVP berhasil disimpan ❤️");
      setMessage("");
      setAttending(null);
      fetchRsvps();
    }

    setSubmitting(false);
  };

  return (
    <div className="py-20 px-8 backdrop-blur-xs bg-[#CFCDC9]/10 font-['Montserrat']">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-['Allura'] text-[#D9D9D9]">
            Confirm Your Attendance
          </h2>
        </motion.div>

        <motion.p
          className="text-center text-base text-[#D9D9D9] max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Kehadiran dan doa dari Anda merupakan hadiah dan kesan terbaik bagi
          kami. Semoga Allah SWT mempertemukan kita dalam kebahagiaan.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-2">
          {/* Form RSVP */}
          <motion.div
            className="rounded-3xl p-4"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-2xl text-center font-bold text-[#D9D9D9] mb-6">
              Confirm Here
            </h3>

            <form onSubmit={handleSubmit} className="space-y-8 text-[#D9D9D9]">
              <div>
                <label className="block text-lg font-bold mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border-3 border-[#D9D9D9] bg-[#D9D9D9]/20 rounded-xl px-4 py-3 focus:outline-none focus:border-rose-500"
                  required
                />
              </div>

              <div>
                <label className="block text-lg font-bold text-[#D9D9D9] mb-3">
                  Will you be there?
                </label>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="attending"
                      checked={attending === true}
                      onChange={() => setAttending(true)}
                    />
                    <span>I'll be definitely there ❤️</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="attending"
                      checked={attending === false}
                      onChange={() => setAttending(false)}
                    />
                    <span>Sorry, I can't make it 😔</span>
                  </label>
                </div>
              </div>

              {attending && (
                <div>
                  <label className="block text-lg font-bold text-[#D9D9D9] mb-2">
                    Total Attending
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={totalAttending}
                    onChange={(e) => setTotalAttending(Number(e.target.value))}
                    className="w-full border-3 border-[#D9D9D9] bg-[#D9D9D9]/20 rounded-xl px-4 py-3"
                  />
                </div>
              )}

              <div>
                <label className="block text-lg font-bold text-[#D9D9D9] mb-2">
                  Your Wishes
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Semoga bahagia selalu, dilancarkan segala urusannya..."
                  rows={4}
                  className="w-full border-3 border-[#D9D9D9] bg-[#D9D9D9]/20 rounded-2xl px-4 py-3 focus:outline-none focus:border-rose-500"
                />
              </div>

              <button
                type="submit"
                disabled={submitting || attending === null}
                className="w-full bg-rose-600 hover:bg-rose-700 disabled:bg-gray-400 text-white py-4 rounded-2xl font-medium transition-all"
              >
                {submitting ? "Menyimpan..." : <b>Submit RSVP</b>}
              </button>
            </form>
          </motion.div>

          {/* RSVP List */}
          <motion.div
            className="rounded-3xl p-4"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-2xl text-center font-bold text-[#D9D9D9] mb-10">
              RSVP List
            </h3>

            <div className="max-h-150 overflow-y-auto space-y-4 pr-2">
              {rsvps.length === 0 ? (
                <div className="text-center py-12 text-[#D9D9D9]">
                  <Heart className="w-12 h-12 mx-auto mb-4 opacity-30" />
                  <p>Belum ada yang konfirmasi</p>
                </div>
              ) : (
                rsvps.map((rsvp, index) => (
                  <motion.div
                    key={index}
                    className="flex gap-3 text-[#D9D9D9]"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className="w-10 h-10 bg-[#D9D9D9] text-[#404040] rounded-4xl flex items-center justify-center font-bold shrink-0">
                      {rsvp.guest_name?.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="bg-[#D9D9D9]/20 rounded-2xl rounded-tl-none px-4 py-2 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-base">
                          {rsvp.guest_name}
                        </p>
                        <p className="font-light text-sm italic">2d ago</p>
                      </div>
                      {rsvp.message && (
                        <p className="text-base mt-2">"{rsvp.message}"</p>
                      )}
                      <p className="text-sm text-white italic mt-4">
                        {rsvp.attending
                          ? `Hadir (${rsvp.total_attending} orang)`
                          : "Tidak Hadir"}
                      </p>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
