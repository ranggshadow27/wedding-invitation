// app/invite/[code]/page.tsx
"use client";

import { useState, useEffect, use } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import {
  MAIN_ASSETS,
  GALLERY_ASSETS,
  TOTAL_ASSET_COUNT,
  STREAMING_VIDEO_URL,
  preloadImage,
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
  const resolvedParams = use(params);

  // Clean-up karakter '*' jika ada di URL param
  const rawCode = resolvedParams.code || "";
  const code = rawCode.replaceAll("*", "");

  const [guest, setGuest] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isOpened, setIsOpened] = useState(false);

  const [currentLog, setCurrentLog] = useState<string>("Initializing...");
  const [showSkipButton, setShowSkipButton] = useState(false);

  // Auto-clean URL di Address Bar browser jika ada '*'
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.href.includes("*")) {
      const cleanUrl = window.location.href.replaceAll("*", "");
      window.history.replaceState(null, "", cleanUrl);
    }
  }, []);

  const setLog = (msg: string) => {
    setCurrentLog(msg);
  };

  // Helper untuk cek kelompok yang diabaikan (TEST / EARLY-ACCESS)
  const shouldSkipAnalytics = (guestData: any) => {
    if (!guestData) return true;
    const groupName = guestData.group_name?.toUpperCase() || "";
    return ["TEST", "EARLY-ACCESS"].includes(groupName);
  };

  // Handler Logging Event (visit / swipe)
  const recordAnalytics = async (type: "visit" | "swipe", guestData: any) => {
    if (shouldSkipAnalytics(guestData)) return;

    const sessionKey = `viewed_${type}_${code}`;
    const hasRecorded = sessionStorage.getItem(sessionKey);

    if (!hasRecorded) {
      await supabase
        .from("guest_views")
        .insert([{ guest_id: guestData.id, type }]);

      sessionStorage.setItem(sessionKey, "true");
    }
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

        const { data: guestData } = await supabase
          .from("guests")
          .select("*")
          .eq("unique_code", code)
          .single();

        if (isMounted) setGuest(guestData);

        // --- RECORD ANALYTICS: VISIT ---
        if (guestData) {
          recordAnalytics("visit", guestData);
        }

        setLog("Loading core assets...");
        await Promise.all(
          MAIN_ASSETS.map(async (src) => {
            await preloadImage(src);
            incrementProgress();
          }),
        );
        if (!isMounted) return;
        setLog("✓ Main assets loaded");

        setLog("Loading video background...");

        const skipTimer = setTimeout(() => {
          if (isMounted) {
            setShowSkipButton(true);
            setLog("⚠️ Slow network detected. Option available.");
          }
        }, 5000);

        if (!isMounted) return;
        setShowSkipButton(false);
        setLog("✓ Video status checked");

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

  // Trigger saat user sukses Swipe Up
  const handleOpenInvitation = () => {
    setIsOpened(true);
    if (guest) {
      recordAnalytics("swipe", guest);
    }
  };

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
    <main className="relative w-full min-h-dvh overflow-x-hidden">
      {/* 1. BACKGROUND MEDIA */}
      {!isOpened ? (
        <div className="fixed inset-0 w-full h-dvh bg-[url('/images/bg.jpg')] bg-cover bg-center bg-no-repeat pointer-events-none -z-20" />
      ) : (
        <div className="fixed inset-0 w-full h-dvh -z-20 overflow-hidden pointer-events-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster="/images/bg.jpg"
            src={STREAMING_VIDEO_URL}
            className="w-full h-full object-cover object-center"
          />
        </div>
      )}

      {/* 2. OVERLAY GRADIENT */}
      <div className="fixed inset-0 w-full h-dvh pointer-events-none -z-10" />

      {/* 3. LANDING HERO */}
      <AnimatePresence mode="wait">
        {!isOpened && (
          <div className="w-full h-full">
            <LandingHero guestName={guest.name} onOpen={handleOpenInvitation} />
          </div>
        )}
      </AnimatePresence>

      {/* 4. WEDDING CONTENT */}
      <AnimatePresence>
        {isOpened && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]"
          >
            <WeddingContent guest={guest} />
            <AudioPlayer isOpened={isOpened} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
