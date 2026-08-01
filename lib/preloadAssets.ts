// lib/preloadAssets.ts

// 1. MAIN ASSETS (Paling vital untuk Landing/Cover)
export const MAIN_ASSETS = [
  "/images/bg.png",
  "/images/bride.png",
  "/images/groom.png",
  "/audio/wedding-song.mp3",
];

// 2. VIDEO ASSET (Untuk background utama saat dibuka)
export const VIDEO_ASSETS = ["/videos/footage.mp4"];

// 3. OTHER ASSETS (Foto-foto gallery)
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

// Total hitungan aset untuk kalkulasi persen
export const TOTAL_ASSET_COUNT =
  MAIN_ASSETS.length + VIDEO_ASSETS.length + GALLERY_ASSETS.length;

// Preload Image Universal
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve();
    img.onerror = () => resolve();
  });
};

// Preload Audio Universal
export const preloadAudio = (src: string): Promise<void> => {
  return new Promise((resolve) => {
    const audio = new Audio();
    audio.src = src;
    audio.oncanplaythrough = () => resolve();
    audio.onerror = () => resolve();
  });
};

// Preload Video (Fetch Blob URL agar playback lancar)
export const preloadVideo = async (src: string): Promise<string | null> => {
  try {
    const res = await fetch(src);
    if (!res.ok) throw new Error("Network response was not ok");
    const blob = await res.blob();
    return URL.createObjectURL(blob);
  } catch (e) {
    console.warn("Video preload skipped/failed:", e);
    return null;
  }
};
