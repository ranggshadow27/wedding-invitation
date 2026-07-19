// components/wedding/AudioPlayer.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SpeakerHighIcon, SpeakerXIcon } from "@phosphor-icons/react";

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Inisialisasi Audio object
    audioRef.current = new Audio("/audio/wedding-song.mp3");
    audioRef.current.loop = true;

    // Kebijakan browser modern melarang autoplay sebelum user interaksi.
    // Jadi kita coba play otomatis saat user pertama kali scroll atau klik layar.
    const handleFirstInteraction = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch((err) => console.log("Autoplay dicegah oleh browser:", err));
      }
      // Hapus event listener setelah interaksi pertama terjadi
      window.removeEventListener("scroll", handleFirstInteraction);
      window.removeEventListener("click", handleFirstInteraction);
    };

    window.addEventListener("scroll", handleFirstInteraction);
    window.addEventListener("click", handleFirstInteraction);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      window.removeEventListener("scroll", handleFirstInteraction);
      window.removeEventListener("click", handleFirstInteraction);
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.button
        onClick={togglePlay}
        className="w-12 h-12 cursor-pointer rounded-full hover:bg-rose-700 text-white flex items-center justify-center shadow-lg focus:outline-none backdrop-blur-sm bg-rose-600/90"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.div
              key="playing"
              initial={{ rotate: -45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 45, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <SpeakerHighIcon className="w-6 h-6" weight="duotone" />
              {/* Efek denyut halus kalau lagu lagi nyala */}
              <span className="absolute -inset-1 rounded-full border border-white opacity-40 animate-ping" />
            </motion.div>
          ) : (
            <motion.div
              key="muted"
              initial={{ rotate: -45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 45, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <SpeakerXIcon className="w-6 h-6" weight="duotone" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
