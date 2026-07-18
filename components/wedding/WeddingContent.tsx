// components/wedding/WeddingContent.tsx
import { motion } from "framer-motion";
import WeddingDetails from "./WeddingDetails";
import PhotoGallery from "./PhotoGallery";
import RsvpSection from "./RsvpSection";
import WeddingGift from "./WeddingGift";
import WeddingFooter from "./WeddingFooter";

export default function WeddingContent({ guest }: { guest: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 120 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: "easeIn" }}
    >
      <WeddingDetails />
      <PhotoGallery />
      <RsvpSection guest={guest} />
      <WeddingGift />
      <WeddingFooter />
    </motion.div>
  );
}
