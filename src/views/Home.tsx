import { FaFacebookF, FaInstagram, FaSpotify, FaMusic } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import RoundedButtonLink from "../components/RoundedButtonLink";
import { useState, useEffect } from "react";
import heroShot from "../assets/images/hero/BandHeroShot_1.jpg"

const pageLinks = [
  { to: "/music", innerText: "Music" },
  { to: "/gigs", innerText: "Gigs" },
  { to: "/about", innerText: "About" },
  { to: "/merch", innerText: "Merch" },
  { to: "/media", innerText: "Media" },
];

export default function Home() {
  const [time, setTime] = useState(0);
  const [componentState, setComponentState] = useState<"transitioning" | "">("")
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
    setTimeout(() => navigate(linkTo), 1500)
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
              {pageLinks.map((link, index) => (
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
        <footer>
          <div className="social-links">
            <RoundedButtonLink imageChild={<FaFacebookF />} />
            <RoundedButtonLink imageChild={<FaInstagram />} />
            <RoundedButtonLink imageChild={<FaSpotify />} />
            <RoundedButtonLink imageChild={<FaMusic />} />
          </div>
          <ul className="extra-links">
            <li className="link ">Press Kit</li>
            <li className="link ">Contact Us</li>
          </ul>
          <p className="extra-links">
            <strong>© 2015-{new Date().getFullYear()} Day Dreamers</strong>
          </p>
        </footer>
      </section >
    </>
  );
}
