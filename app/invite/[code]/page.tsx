"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase";
import WeddingContent from "../../../components/wedding/WeddingContent"; // nanti kita buat

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
      {/* Landing Hero */}
      {!isOpened && (
        <div className="min-h-screen text-white flex flex-col antialiased items-center justify-end pb-20 text-center px-6 bg-[url(/images/bg.png)] bg-cover bg-center">
          <p className="text-xs  tracking-[4] font-medium font-['Montserrat'] mb-2">
            WEDDING INVITATION
          </p>

          <div className="w-full md:w-120 flex flex-wrap items-center justify-evenly mb-2">
            <h1 className="text-5xl md:text-7xl tracking-tight  font-['Allura']">
              Annisa
            </h1>
            <h1 className="text-4xl md:text-5xl tracking-tight text-rose-400  font-['Allura']">
              &
            </h1>
            <h1 className="text-5xl md:text-7xl tracking-tight  font-['Allura']">
              Rangga
            </h1>
          </div>

          <p className="text-xs tracking-[4] font-medium  font-['Montserrat'] mb-20">
            26 SEPTEMBER 2026
          </p>

          <p className="text-m italic font-semibold  font-['Montserrat'] mb-6">
            We Invite You to Celebrate Our Wedding
          </p>

          <p className="text-sm font-['Montserrat'] mb-4">Dear Sir / Madam,</p>
          <p className="text-xl font-semibold font-['Montserrat'] mb-12">
            {guest.name}
          </p>

          <button
            onClick={() => setIsOpened(true)}
            className="bg-white/50 hover:bg-white/60 text-[#404040] h-12 w-40 font-bold  rounded-2xl drop-shadow-md text-sm font-['Montserrat']"
          >
            Open Invitation
          </button>
        </div>
      )}

      {/* Semua Konten Setelah Dibuka */}
      {isOpened && <WeddingContent guest={guest} />}
    </main>
  );
}
