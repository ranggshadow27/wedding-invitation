// lib/preloadAssets.ts

export const ASSETS_TO_PRELOAD = {
  images: [
    "/images/bg.png",
    "/images/bride.png",
    "/images/groom.png",
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
  ],
  videos: ["/videos/footage.mp4"],
};

export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve();
    img.onerror = () => resolve(); // Tetap resolve agar tidak menghambat loading
  });
};

export const preloadVideo = async (src: string): Promise<string | null> => {
  try {
    const res = await fetch(src);
    const blob = await res.blob();
    return URL.createObjectURL(blob);
  } catch (e) {
    console.error("Video preload error:", e);
    return null;
  }
};
