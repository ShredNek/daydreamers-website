import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import heroShot from "../assets/images/hero/BandHeroShot_1.jpg"
import { PAGE_LINKS, FADE_SPEED } from "../utils/globals";
import { ComponentLoadingStatus } from "../types/index"
import Footer from "../components/Footer";

export default function Home() {
  const [time, setTime] = useState(0);
  const [componentState, setComponentState] = useState<ComponentLoadingStatus>("")
  let navigate = useNavigate()

  // ? Helpers
  const randomDistance = 12;
  const randomVal = () => Math.random() * randomDistance - 5;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  const titleWithShiftingLetters = (title: string): React.ReactNode[] => {
    return title.split("").map((ltr, index) => {
      const style = { transform: `translate(${randomVal()}px, ${randomVal()}px)` };

      return ltr !== " " ? (
        <span key={index} style={style}>
          {ltr}
        </span>
      ) : (
        <br key={index} />
      )
    })
  };

  const handleRedirect = (linkTo: string) => {
    setComponentState("transitioning")
    setTimeout(() => navigate(linkTo), FADE_SPEED)
  }

  return (
    <>
      <div id="site-backdrop" className={componentState} />
      <div id="photo-backdrop" className={componentState} >
        <img src={heroShot} alt="Hero shot of your local wacky band, Day Dreamers" />
      </div>
      <section id="home" className={componentState} >
        <div id="home-nav">
          <h1 className="outline-black heading massive white">
            {titleWithShiftingLetters("Day Dreamers")}
          </h1>
          <nav id="page-routes">
            <ul>
              {PAGE_LINKS.map((link, index) => (
                <li
                  key={index}
                  className={index % 2 === 0 ? `hover v-1` : `hover v-2`}
                >
                  <a href="#" onClick={() => handleRedirect(link.to)}>{link.innerText}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <Footer />
      </section >
    </>
  );
}
