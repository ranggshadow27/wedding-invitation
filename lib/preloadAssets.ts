// lib/preloadAssets.ts

export const MAIN_ASSETS = [
  "/images/bg.jpg",
  "/images/bride.png",
  "/images/groom.png",
  "/images/music_96.png",
  "/images/music_256.png",
  "/audio/wedding-song-compressed.mp3",
];

export const STREAMING_VIDEO_URL =
  "https://kqjfktikmpxzgowjbmut.supabase.co/storage/v1/object/public/assets/footage_1.mp4";

export const GALLERY_ASSETS = [
  "/images/gallery/img_date.jpg",
  "/images/gallery/img_1_v2.jpg",
  "/images/gallery/img_2.jpg",
  // "/images/gallery/img_3.jpg",
  // "/images/gallery/img_4_wide.jpg",
  // "/images/gallery/img_5_wide.jpg",
  // "/images/gallery/img_6.jpg",
  // "/images/gallery/img_7.jpg",
  // "/images/gallery/img_8.jpg",
  // "/images/gallery/img_9.jpg",
];

// Total aset jadi lebih sedikit & ringan karena video di-stream terpisah
export const TOTAL_ASSET_COUNT = MAIN_ASSETS.length + GALLERY_ASSETS.length;

export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve();
    img.onerror = () => resolve();
  });
};

export const preloadAudio = (src: string): Promise<void> => {
  return new Promise((resolve) => {
    let resolved = false;
    const safeResolve = () => {
      if (!resolved) {
        resolved = true;
        resolve();
      }
    };

    const timer = setTimeout(safeResolve, 1500);
    const audio = new Audio();
    audio.preload = "metadata";
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
