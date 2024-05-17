import { Link } from "react-router-dom";
import LazyImage from "../components/LazyImage";
import { PAGE_LINKS, FADE_SPEED } from "../utils/globals";
import { useNavigate } from "react-router-dom";
import { ComponentLoadingStatus } from "../types/index";

import HQ_DayDreamersLogo from "../assets/images/icons/HQ_DayDreamersLogo.jpg";
import LQ_DayDreamersLogo from "../assets/images/icons/LQ_DayDreamersLogo.jpg";
import { ReactNode } from "react";

interface NavHeader {
  transitionOnNavItemClick?: React.Dispatch<
    React.SetStateAction<ComponentLoadingStatus>
  >;
  className?: string;
  linkToDisable?: string;
}

export default function NavHeader({ transitionOnNavItemClick, className, linkToDisable }: NavHeader) {
  let navigate = useNavigate();

  // ? Helper

  const handleRedirect = (linkTo: string) => {
    if (transitionOnNavItemClick) {
      transitionOnNavItemClick("transitioning static");
    }
    setTimeout(() => navigate(linkTo), FADE_SPEED);
  };

  const returnNavItems = (
    links: typeof PAGE_LINKS,
    isAtLimit: (index: number) => boolean
  ): ReactNode[] => {
    return links.map((link, index) => {
      if (isAtLimit(index)) {
        return (
          <li
            key={index}
            className={`${index % 2 === 0 ? `hover v-1` : `hover v-2`} 
            ${link.innerText === linkToDisable ? "disabled" : ""}`}
          >
            <a href="#" onClick={() => handleRedirect(link.to)}>
              {link.innerText}
            </a>
          </li>
        );
      }
    });
  };

  return (
    <nav id="page-nav" className={className}>
      <ul>
        {returnNavItems(PAGE_LINKS, (index) => index < 3)}
        <Link to="/" className="img-parent">
          <LazyImage
            lowQualitySrc={LQ_DayDreamersLogo}
            highQualitySrc={HQ_DayDreamersLogo}
            alt="Day Dreamers official logo"
          />
        </Link>
        {returnNavItems(PAGE_LINKS, (index) => index >= 3)}
      </ul>
    </nav>
  );
}
