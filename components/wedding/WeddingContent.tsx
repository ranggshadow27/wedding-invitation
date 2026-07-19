// components/wedding/WeddingContent.tsx
import { motion } from "framer-motion";
import WeddingDetails from "./WeddingDetails";
import PhotoGallery from "./PhotoGallery";
import RsvpSection from "./RsvpSection";
import WeddingGift from "./WeddingGift";
import WeddingFooter from "./WeddingFooter";
import AudioPlayer from "./AudioPlayer";
import FloatingNavbar from "./FloatingNavbar";

export default function WeddingContent({ guest }: { guest: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 120 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: "easeIn" }}
      // className="relative min-h-screen w-screen"
    >
      <div id="home">
        <WeddingDetails />
      </div>

      <div id="gallery">
        <PhotoGallery />
      </div>

      <div id="rsvp">
        <RsvpSection guest={guest} />
      </div>

      <div id="gift">
        <WeddingGift />
      </div>

      <WeddingFooter />
      <AudioPlayer />
      <FloatingNavbar />
    </motion.div>
  );
}
