import Hero from "@/components/sections/Hero";
import GigDates from "@/components/sections/GigDates";
import PhotoGallery from "@/components/sections/PhotoGallery";
import Members from "@/components/sections/Members";
import Videos from "@/components/sections/Videos";
import SocialFeed from "@/components/sections/SocialFeed";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <GigDates />
      <Members />
      <PhotoGallery />
      <Videos />
      <SocialFeed />
      <Contact />
    </>
  );
}
