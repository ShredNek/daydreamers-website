import { FaFacebookF, FaInstagram, FaSpotify, FaMusic } from "react-icons/fa6";
import { Link } from "react-router-dom";
import RoundedButtonLink from "../components/RoundedButtonLink";
import { useState, useEffect } from "react";

const pageLinks = [
  { to: "/music", innerText: "Music" },
  { to: "/gigs", innerText: "Gigs" },
  { to: "/about", innerText: "About" },
  { to: "/merch", innerText: "Merch" },
  { to: "/media", innerText: "Media" },
];

export default function Home() {
  const [time, setTime] = useState(0);

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

  return (
    <section id="home">
      <div id="site-backdrop" />
      <div id="home-nav">
        <h1 className="outline-black heading white">
          {titleWithShiftingLetters("Day Dreamers")}
        </h1>
        <nav id="page-routes">
          <ul>
            {pageLinks.map((link, index) => (
              <li
                key={index}
                className={index % 2 === 0 ? `hover v-1` : `hover v-2`}
              >
                <Link to={link.to}>{link.innerText}</Link>
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
        <ul>
          <li className="link ">Press Kit</li>
          <li className="link ">Contact Us</li>
        </ul>
        <p>
          <strong>© 2015-{new Date().getFullYear()} Day Dreamers</strong>
        </p>
      </footer>
    </section>
  );
}
