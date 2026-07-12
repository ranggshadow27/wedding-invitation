// components/PhotoGallery.tsx
import Image from "next/image";

const galleryImages = [
  { id: 1, url: "https://picsum.photos/id/1015/600/800", alt: "Prewedding 1" },
  { id: 2, url: "https://picsum.photos/id/1027/600/400", alt: "Prewedding 2" },
  { id: 3, url: "https://picsum.photos/id/106/600/750", alt: "Prewedding 3" },
  { id: 4, url: "https://picsum.photos/id/133/600/900", alt: "Prewedding 4" },
  { id: 5, url: "https://picsum.photos/id/201/600/500", alt: "Prewedding 5" },
  { id: 6, url: "https://picsum.photos/id/211/600/850", alt: "Prewedding 6" },
  { id: 7, url: "https://picsum.photos/id/251/600/700", alt: "Prewedding 7" },
  { id: 8, url: "https://picsum.photos/id/274/600/650", alt: "Prewedding 8" },
  { id: 9, url: "https://picsum.photos/id/1016/600/800", alt: "Prewedding 9" },
];

export default function PhotoGallery() {
  return (
    <div className="py-20 px-6 bg-white">
      <div className="text-center mb-12">
        <h2 className="text-5xl md:text-6xl font-['Allura'] text-rose-700 tracking-wide">
          Our Gallery
        </h2>
        <div className="w-24 h-px bg-rose-400 mx-auto mt-6"></div>
      </div>

      {/* Masonry Gallery */}
      <div className="max-w-6xl mx-auto">
        <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
          {galleryImages.map((photo) => (
            <div
              key={photo.id}
              className="break-inside-avoid rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
            >
              <img
                src={photo.url}
                alt={photo.alt}
                className="w-full h-auto object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
