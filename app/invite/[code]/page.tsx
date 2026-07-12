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
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-gradient-to-b from-rose-50 to-white">
          <h1 className="text-5xl md:text-7xl font-serif mb-6">
            Nama Pengantin
          </h1>
          <p className="text-2xl text-gray-600 mb-12">Yth. {guest.name}</p>

          <button
            onClick={() => setIsOpened(true)}
            className="bg-rose-600 text-white px-12 py-5 rounded-full text-xl"
          >
            Buka Undangan
          </button>
        </div>
      )}

      {/* Semua Konten Setelah Dibuka */}
      {isOpened && <WeddingContent guest={guest} />}
    </main>
  );
}
