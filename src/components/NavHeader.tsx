import { PAGE_LINK, PAGE_LINKS } from "../utils/globals";
import { useNavigate } from "react-router-dom";
import Hamburger from "./Hamburger";
import SpinTail from "../assets/vectors/day-dreamers-logo/Day-Dreamer-SpinTail.svg";
import Star1 from "../assets/vectors/day-dreamers-logo/Day-Dreamer-Star_1.svg";
import Star2 from "../assets/vectors/day-dreamers-logo/Day-Dreamer-Star_2.svg";

import "../styles/components/_nav-header.scss";
import { useEffect, useState } from "react";

const generateTitleWithShiftingLetters = (title: string): React.ReactNode[] => {
  const randomDistance = 8;
  const randomVal = () => Math.random() * randomDistance - 5;

  return title.split("").map((ltr, index) => {
    const style = {
      transform: `translate(${randomVal()}px, ${randomVal()}px)`,
    };

    return ltr !== " " ? (
      <span key={index} style={style}>
        {ltr}
      </span>
    ) : (
      <br key={index} />
    );
  });
};

interface NavHeader {
  className?: string;
  linkToDisable?: string;
  hideBackground?: boolean;
}

export default function NavHeader({
  className,
  linkToDisable,
  hideBackground,
}: NavHeader) {
  let navigate = useNavigate();
  const [titleNodes, setTitleNodes] = useState<React.ReactNode[]>([]);
  const title = "Day Dreamers";

  useEffect(() => {
    // Initial render
    setTitleNodes(generateTitleWithShiftingLetters(title));

    // Update every 5 seconds
    const interval = setInterval(() => {
      setTitleNodes(generateTitleWithShiftingLetters(title));
    }, 2500);

    return () => clearInterval(interval); // Cleanup
  }, []);

  const handleNavItemClick = (link: PAGE_LINK) => {
    if (!link.urlIsExternal) {
      navigate(link.to);
    } else {
      window.open(link.to);
    }
  };

  return (
    <>
      <div
        id="header-navigation"
        className={`header-navigation${hideBackground ? "no-background" : ""}`}>
        <a className="header-logo-container" onClick={() => navigate("/")}>
          <h1 className={`letters${className ?? ""}`}>{titleNodes}</h1>
          <img className="vector spin-tail" src={SpinTail} />
          <img className="vector star-1" src={Star1} />
          <img className="vector star-2" src={Star2} />
        </a>
        <nav id="page-routes" className="page-routes">
          <Hamburger linkToDisable={linkToDisable} />
          <ul>
            {PAGE_LINKS.map((link, index) => (
              <li
                key={index}
                className={index % 2 === 0 ? `hover v-1` : `hover v-2`}>
                <a onClick={() => handleNavItemClick(link)}>
                  <img src={link.tabImg} alt={`Link to ${link.to}`} />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
