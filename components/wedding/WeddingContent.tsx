// components/wedding/WeddingContent.tsx
import WeddingDetails from "./WeddingDetails";
import PhotoGallery from "./PhotoGallery";
// import Countdown from './Countdown';
import RsvpSection from "./RsvpSection";
import WeddingGift from "./WeddingGift";
import WeddingFooter from "./WeddingFooter";
// dst...

export default function WeddingContent({ guest }: { guest: any }) {
  return (
    <>
      <WeddingDetails />
      <PhotoGallery />
      <RsvpSection guest={guest} />
      <WeddingGift />
      <WeddingFooter />
    </>
  );
}
