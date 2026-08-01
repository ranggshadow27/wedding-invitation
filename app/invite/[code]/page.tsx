// app/invite/[code]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import {
  ASSETS_TO_PRELOAD,
  preloadImage,
  preloadVideo,
} from "@/lib/preloadAssets";
import Preloader from "@/components/wedding/Preloader";
import LandingHero from "@/components/wedding/LandingHero";
import WeddingContent from "@/components/wedding/WeddingContent";
import GuestNotFound from "@/components/wedding/GuestNotFound";
import AudioPlayer from "@/components/wedding/AudioPlayer";

export default function InvitationPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const [guest, setGuest] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [videoBlobUrl, setVideoBlobUrl] = useState<string>("");
  const [isOpened, setIsOpened] = useState(false);
  const [code, setCode] = useState("");

  useEffect(() => {
    params.then((p) => setCode(p.code));
  }, [params]);

  useEffect(() => {
    if (!code) return;
    let isMounted = true;

    const prepareInvitation = async () => {
      try {
        // Fetch Supabase
        const { data: guestData } = await supabase
          .from("guests")
          .select("*")
          .eq("unique_code", code)
          .single();

        if (isMounted) setGuest(guestData);

        // Calculate progress
        const totalAssets =
          ASSETS_TO_PRELOAD.images.length + ASSETS_TO_PRELOAD.videos.length;
        let loadedCount = 0;

        const updateProgress = () => {
          loadedCount++;
          if (isMounted) {
            setLoadProgress(Math.round((loadedCount / totalAssets) * 100));
          }
        };

        // Preload tasks
        const imagePromises = ASSETS_TO_PRELOAD.images.map((src) =>
          preloadImage(src).then(updateProgress),
        );

        const videoPromises = ASSETS_TO_PRELOAD.videos.map(async (src) => {
          const blobUrl = await preloadVideo(src);
          if (blobUrl && isMounted) setVideoBlobUrl(blobUrl);
          updateProgress();
        });

        await Promise.all([...imagePromises, ...videoPromises]);
      } catch (error) {
        console.error("Initialization failed:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    prepareInvitation();

    return () => {
      isMounted = false;
    };
  }, [code]);

  if (loading) return <Preloader progress={loadProgress} />;

  if (!guest) return <GuestNotFound code={code} />;

  return (
    <main className="relative w-full min-h-dvh overflow-x-hidden">
      {/* Dynamic Background Image / Video */}
      {!isOpened ? (
        <div className="fixed inset-0 bg-[url('/images/bg.png')] bg-cover bg-center bg-no-repeat pointer-events-none -z-10" />
      ) : (
        <div className="fixed inset-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="/images/bg.png"
            src={videoBlobUrl || "/videos/footage.mp4"}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
      )}

      {/* Landing Cover Overlay */}
      <AnimatePresence mode="wait">
        {!isOpened && (
          <LandingHero
            guestName={guest.name}
            onOpen={() => setIsOpened(true)}
          />
        )}
      </AnimatePresence>

      {/* Main Wedding Scroll Content */}
      <AnimatePresence>
        {isOpened && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <WeddingContent guest={guest} />
            <AudioPlayer isOpened={isOpened} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
