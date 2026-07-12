// components/wedding/RsvpSection.tsx
"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { User, Heart } from "lucide-react";

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

  // Fetch RSVP List
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
      attending: attending ? totalAttending : 0,
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
      fetchRsvps(); // refresh list
    }

    setSubmitting(false);
  };

  return (
    <div className="py-20 px-6 bg-[#CFCDC9] font-['Montserrat_Alternates']">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-['Allura'] text-rose-700">
            Confirm Your Attendance
          </h2>
        </div>

        <p className="text-center text-lg text-gray-700 max-w-2xl mx-auto mb-16">
          Kehadiran dan doa dari Anda merupakan hadiah dan kesan terbaik bagi
          kami. Semoga Allah SWT mempertemukan kita dalam kebahagiaan.
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Form RSVP */}
          <div className="bg-white rounded-3xl p-8 shadow-sm">
            <h3 className="text-xl font-bold text-gray-800 mb-6">
              Confirm Here
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6 text-gray-500">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-rose-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-3">
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
                  <label className="block text-sm font-medium mb-2">
                    Total Attending
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={totalAttending}
                    onChange={(e) => setTotalAttending(Number(e.target.value))}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-2">
                  Your Wishes
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Semoga bahagia selalu, dilancarkan segala urusannya..."
                  rows={4}
                  className="w-full border border-gray-300 rounded-2xl px-4 py-3 focus:outline-none focus:border-rose-500"
                />
              </div>

              <button
                type="submit"
                disabled={submitting || attending === null}
                className="w-full bg-rose-600 hover:bg-rose-700 disabled:bg-gray-400 text-white py-4 rounded-2xl font-medium transition-all"
              >
                {submitting ? "Menyimpan..." : "Submit RSVP"}
              </button>
            </form>
          </div>

          {/* RSVP List */}
          <div className="bg-white bg-opacity-30 rounded-3xl p-8 shadow-sm">
            <h3 className="text-xl font-bold text-gray-800 mb-6">RSVP List</h3>

            <div className="max-h-125 overflow-y-auto space-y-4 pr-2">
              {rsvps.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Heart className="w-12 h-12 mx-auto mb-4 opacity-30" />
                  <p>Belum ada yang konfirmasi</p>
                </div>
              ) : (
                rsvps.map((rsvp, index) => (
                  <div key={index} className="flex gap-3 text-gray-500">
                    <div className="w-10 h-10 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center font-medium flex-shrink-0">
                      {rsvp.guest_name?.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="bg-gray-50 rounded-2xl rounded-tl-none p-4 flex-1">
                      <p className="font-bold text-sm">{rsvp.guest_name}</p>
                      <p className="text-sm text-gray-600">
                        {rsvp.attending
                          ? `Hadir (${rsvp.total_attending} orang)`
                          : "Tidak Hadir"}
                      </p>
                      {rsvp.message && (
                        <p className="text-sm mt-2 italic">"{rsvp.message}"</p>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
