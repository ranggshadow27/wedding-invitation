// lib/preloadAssets.ts

export const MAIN_ASSETS = [
  "/images/bg.png",
  "/images/bride.png",
  "/images/groom.png",
  "/audio/wedding-song.mp3",
];

export const VIDEO_ASSETS = ["/videos/footage.mp4"];

export const GALLERY_ASSETS = [
  "/images/gallery/img_date.png",
  "/images/gallery/img_1_v2.png",
  "/images/gallery/img_2.png",
  "/images/gallery/img_3.png",
  "/images/gallery/img_4_wide.png",
  "/images/gallery/img_5_wide.png",
  "/images/gallery/img_6.png",
  "/images/gallery/img_7.png",
  "/images/gallery/img_8.png",
  "/images/gallery/img_9.png",
];

export const TOTAL_ASSET_COUNT =
  MAIN_ASSETS.length + VIDEO_ASSETS.length + GALLERY_ASSETS.length;

// Preload Gambar (Aman di semua browser)
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve();
    img.onerror = () => resolve(); // Tetap resolve agar tidak bikin stuck
  });
};

// 🍎 Preload Audio khusus Safari iOS (Menggunakan Timeout Fail-safe 1.5s)
export const preloadAudio = (src: string): Promise<void> => {
  return new Promise((resolve) => {
    let resolved = false;

    const safeResolve = () => {
      if (!resolved) {
        resolved = true;
        resolve();
      }
    };

    // Timeout 1.5 detik jika Safari memblokir/menahan preload audio
    const timer = setTimeout(safeResolve, 1500);

    const audio = new Audio();
    audio.preload = "metadata"; // Lebih ramah Safari daripada full download
    audio.src = src;

    audio.oncanplaythrough = () => {
      clearTimeout(timer);
      safeResolve();
    };

    audio.onerror = () => {
      clearTimeout(timer);
      safeResolve();
    };
  });
};

// 🍎 Preload Video (Fetch Blob dengan Fallback Timeout 3s untuk iOS)
export const preloadVideo = async (src: string): Promise<string | null> => {
  // Cek apakah browser adalah iOS Safari
  const isIOS =
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

  // Di iOS, biarkan video di-load oleh tag <video> secara native agar GPU Safari tidak bug
  if (isIOS) {
    return null;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000); // 4s timeout

    const res = await fetch(src, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!res.ok) throw new Error("Video fetch failed");
    const blob = await res.blob();
    return URL.createObjectURL(blob);
  } catch (e) {
    console.warn("Video preload skipped (Fallback to direct stream):", e);
    return null; // Fallback ke URL mp4 biasa di tag <video>
  }
};
