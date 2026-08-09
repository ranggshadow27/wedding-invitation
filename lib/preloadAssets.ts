// lib/preloadAssets.ts

export const MAIN_ASSETS = [
  "/images/bg.jpg",
  "/images/bride.png",
  "/images/groom.png",
  "/images/music_96.png",
  "/images/music_256.png",
];

export const STREAMING_VIDEO_URL =
  "https://kqjfktikmpxzgowjbmut.supabase.co/storage/v1/object/public/assets/footage_1.mp4";

export const STREAMING_AUDIO_URL =
  "https://<project-id>.supabase.co/storage/v1/object/public/assets/wedding-song.mp3";

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

export const TOTAL_ASSET_COUNT = MAIN_ASSETS.length + GALLERY_ASSETS.length;

// Helper Preload Gambar
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve();
    img.onerror = () => resolve();
  });
};
