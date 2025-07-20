
import highQualHero from "../assets/images/hero/DayDreamersCollage_HighQual.jpg"
import lowQualHero from "../assets/images/hero/DayDreamersCollage_LowQual.jpg"

import Footer from "../components/Footer";
import LazyImage from "../components/LazyImage";
import NavHeader from "../components/NavHeader";

export default function Home() {
  return (
    <>
      <div id="site-backdrop" />
      <div id="photo-backdrop" >
        <LazyImage lowQualitySrc={lowQualHero} highQualitySrc={highQualHero} alt="Hero shot of your local wacky band, Day Dreamers" />
      </div>
      <section id="home">
        <NavHeader hideBackground={true} />
        <Footer />
      </section >
    </>
  );
}
