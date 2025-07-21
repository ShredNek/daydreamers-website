import highQualHero from "./assets/images/hero/DayDreamersCollage_HighQual.jpg";
import lowQualHero from "./assets/images/hero/DayDreamersCollage_LowQual.jpg";

import Footer from "./components/Footer";
import LazyImage from "./components/LazyImage";
import NavHeader from "./components/NavHeader";

import logo1 from "./assets/images/logos/logo_1.png";
import logo2 from "./assets/images/logos/logo_2.png";
import logo3 from "./assets/images/logos/logo_3.png";
import logo4 from "./assets/images/logos/logo_4.png";
import logo5 from "./assets/images/logos/logo_5.png";
import logo6 from "./assets/images/logos/logo_6.png";

const imgArr = [logo1, logo2, logo3, logo4, logo5, logo6];

function LogoLayer() {
  return (
    <div id="logo-layer" className="logo-layer">
      {imgArr.map((src, i) => (
        <img
          src={src}
          alt={`Band logo number ${i + 1}`}
          className="day-dreamer-logo"></img>
      ))}
    </div>
  );
}

type SiteWrapperComponent = {
  children?: React.ReactNode;
  hideBackground?: boolean;
  sectionId: string;
  className?: string;
};

export default function SiteWrapper({
  children,
  hideBackground,
  sectionId,
  className,
}: SiteWrapperComponent) {
  return (
    <>
      <div id="site-backdrop" />
      <LogoLayer />
      <div id="photo-backdrop">
        <LazyImage
          lowQualitySrc={lowQualHero}
          highQualitySrc={highQualHero}
          alt="Hero shot of your local wacky band, Day Dreamers"
        />
      </div>
      <NavHeader hideBackground={hideBackground} />
      <section id={sectionId} className={className}>
        {children}
      </section>
      <Footer />
    </>
  );
}
