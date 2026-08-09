// components/wedding/AudioPlayer.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SpeakerHighIcon, SpeakerXIcon } from "@phosphor-icons/react";
import { STREAMING_AUDIO_URL } from "@/lib/preloadAssets";

interface AudioPlayerProps {
  isOpened?: boolean; // Prop penanda apakah cover undangan sudah dibuka
}

export default function AudioPlayer({ isOpened = false }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const updateMediaSession = (audio: HTMLAudioElement) => {
    if (!("mediaSession" in navigator)) return;

    navigator.mediaSession.metadata = new MediaMetadata({
      title: "The Wedding of Annisa & Rangga",
      artist: "Pancakes & Butter - Jason Mraz",
      album: "26 September 2026",
      artwork: [
        { src: "/images/music_96.png", sizes: "96x96", type: "image/png" },
        { src: "/images/music_256.png", sizes: "256x256", type: "image/png" },
        { src: "/images/music_512.png", sizes: "512x512", type: "image/png" },
      ],
    });

    navigator.mediaSession.setActionHandler("play", () => {
      audio.play();
      setIsPlaying(true);
    });

    navigator.mediaSession.setActionHandler("pause", () => {
      audio.pause();
      setIsPlaying(false);
    });
  };

  // Begitu tamu swipe/klik Buka Undangan (isOpened = true), otomatis play lagu!
  useEffect(() => {
    if (isOpened && audioRef.current && !isPlaying) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          if (audioRef.current) updateMediaSession(audioRef.current);
        })
        .catch((err) => console.log("Autoplay blocked:", err));
    }
  }, [isOpened]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          if (audioRef.current) updateMediaSession(audioRef.current);
        })
        .catch((err) => console.log("Gagal memutar audio:", err));
    }
  };

  return (
    <>
      {/* Native HTML5 Audio Tag untuk Progressive Byte-Streaming Supabase */}
      <audio ref={audioRef} src={STREAMING_AUDIO_URL} preload="metadata" loop />

      {/* Floating Control Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          onClick={togglePlay}
          className="w-12 h-12 cursor-pointer rounded-full text-amber-100 flex items-center justify-center shadow-xl focus:outline-none backdrop-blur-md bg-stone-900/80 border border-amber-200/30 hover:border-amber-200/60 transition-all active:scale-95"
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
                className="relative flex items-center justify-center"
              >
                <SpeakerHighIcon
                  className="w-6 h-6 text-amber-200"
                  weight="duotone"
                />
                <span className="absolute -inset-1 rounded-full border border-amber-200/50 opacity-40 animate-ping" />
              </motion.div>
            ) : (
              <motion.div
                key="muted"
                initial={{ rotate: -45, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 45, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center"
              >
                <SpeakerXIcon
                  className="w-6 h-6 text-gray-400"
                  weight="duotone"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </>
  );
}
