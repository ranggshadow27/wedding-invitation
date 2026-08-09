// app/invite/[code]/page.tsx
"use client";

import { useState, useEffect, use } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import {
  MAIN_ASSETS,
  VIDEO_ASSETS,
  GALLERY_ASSETS,
  TOTAL_ASSET_COUNT,
  preloadImage,
  preloadAudio,
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
  // Safe Unwrap Async Params
  const resolvedParams = use(params);
  const code = resolvedParams.code;

  const [guest, setGuest] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [videoBlobUrl, setVideoBlobUrl] = useState<string>("");
  const [isOpened, setIsOpened] = useState(false);

  // States untuk Logger & Skip Option
  const [currentLog, setCurrentLog] = useState<string>("Initializing...");
  const [showSkipButton, setShowSkipButton] = useState(false);

  const setLog = (msg: string) => {
    setCurrentLog(msg);
  };

  useEffect(() => {
    if (!code) return;
    let isMounted = true;
    let loadedCount = 0;

    const incrementProgress = () => {
      loadedCount++;
      if (isMounted) {
        setLoadProgress(
          Math.min(Math.round((loadedCount / TOTAL_ASSET_COUNT) * 100), 100),
        );
      }
    };

    const prepareInvitation = async () => {
      try {
        setLog("Connecting to server...");

        // 1. Fetch Guest Data Supabase
        const { data: guestData } = await supabase
          .from("guests")
          .select("*")
          .eq("unique_code", code)
          .single();

        if (isMounted) setGuest(guestData);

        // ================= PHASE 1: MAIN ASSETS =================
        setLog("Loading core assets...");
        await Promise.all(
          MAIN_ASSETS.map(async (src) => {
            if (src.endsWith(".mp3")) await preloadAudio(src);
            else await preloadImage(src);
            incrementProgress();
          }),
        );
        if (!isMounted) return;
        setLog("✓ Main assets loaded");

        // ================= PHASE 2: VIDEO ASSET (WITH 5s TIMEOUT) =================
        setLog("Loading video background...");

        // Timer 5 Detik jika jaringan lambat
        const skipTimer = setTimeout(() => {
          if (isMounted) {
            setShowSkipButton(true);
            setLog("⚠️ Slow network detected. Option available.");
          }
        }, 5000);

        // Preload Video dengan Race Timeout 5 Detik
        const videoPromise = preloadVideo(VIDEO_ASSETS[0]).then((blobUrl) => {
          if (blobUrl && isMounted) setVideoBlobUrl(blobUrl);
          incrementProgress();
        });

        const timeoutPromise = new Promise((resolve) =>
          setTimeout(resolve, 5000),
        );

        await Promise.race([videoPromise, timeoutPromise]);
        clearTimeout(skipTimer);

        if (!isMounted) return;
        setShowSkipButton(false);
        setLog("✓ Video status checked");

        // ================= PHASE 3: GALLERY ASSETS =================
        setLog("Loading gallery images...");
        await Promise.all(
          GALLERY_ASSETS.map(async (src) => {
            await preloadImage(src);
            incrementProgress();
          }),
        );

        if (!isMounted) return;
        setLog("✓ All assets loaded successfully!");
        setLoadProgress(100);

        // Delay kecil agar animasi 100% terlihat
        setTimeout(() => {
          if (isMounted) setLoading(false);
        }, 500);
      } catch (error) {
        console.error("Initialization error:", error);
        setLog("⏳ Loading complete with fallbacks");
        if (isMounted) setLoading(false);
      }
    };

    prepareInvitation();

    return () => {
      isMounted = false;
    };
  }, [code]);

  // Handler untuk tombol Skip Best Experience
  const handleSkip = () => {
    setLog("⏩ Skipping best experience...");
    setTimeout(() => {
      setLoading(false);
    }, 400);
  };

  if (loading) {
    return (
      <Preloader
        progress={loadProgress}
        currentLog={currentLog}
        showSkipButton={showSkipButton}
        onSkip={handleSkip}
      />
    );
  }

  if (!guest) return <GuestNotFound code={code} />;

  return (
    <main className="relative w-full min-h-dvh overflow-x-hidden pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)]">
      {/* Background Image / Video dipaksa FULL inset-0 tanpa terpengaruh safe area */}
      {!isOpened ? (
        <div className="fixed inset-0 w-full h-full bg-[url('/images/bg.jpg')] bg-cover bg-center bg-no-repeat pointer-events-none -z-20" />
      ) : (
        <div className="fixed inset-0 w-full h-full -z-20 overflow-hidden pointer-events-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="/images/bg.jpg"
            src={videoBlobUrl || "/videos/footage_1.mp4"}
            className="w-full h-full object-cover object-center"
          />
        </div>
      )}

      <div className="fixed inset-0 w-full h-dvh pointer-events-none -z-10 bg-linear-to-b from-black/5 via-black/20 to-stone-950/45" />

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
