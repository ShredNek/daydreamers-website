import { Link } from "react-router-dom";
import LazyImage from "../components/LazyImage";
import { pageLinks } from "../globals";
import { useNavigate } from "react-router-dom";
import { ComponentLoadingStatus } from "../types/index"

import HQ_DayDreamersLogo from "../assets/images/icons/HQ_DayDreamersLogo.jpg";
import LQ_DayDreamersLogo from "../assets/images/icons/LQ_DayDreamersLogo.jpg";
import { ReactNode } from "react";

interface NavHeader {
  transitionOnNavItemClick: React.Dispatch<React.SetStateAction<ComponentLoadingStatus>>;
}

export default function NavHeader({ transitionOnNavItemClick }: NavHeader) {
  let navigate = useNavigate()

  // ? Helper

  const handleRedirect = (linkTo: string) => {
    transitionOnNavItemClick("transitioning")
    setTimeout(() => navigate(linkTo), 1500)
  }

  const returnNavItems = (links: typeof pageLinks, isAtLimit: (index: number) => boolean): ReactNode[] => {
    return links.map((link, index) => {
      if (isAtLimit(index)) {
        return (
          <li key={index} className={index % 2 === 0 ? `hover v-1` : `hover v-2`}>
            <a href="#" onClick={() => handleRedirect(link.to)}>{link.innerText}</a>
          </li>
        )
      }
    })
  }

  return (
    <nav>
      <ul>
        {returnNavItems(pageLinks, (index) => index < 3)}
        <Link to="/" className="img-parent">
          <LazyImage
            lowQualitySrc={LQ_DayDreamersLogo}
            highQualitySrc={HQ_DayDreamersLogo}
            alt="Day Dreamers official logo"
          />
        </Link>
        {returnNavItems(pageLinks, (index) => index >= 3)}
      </ul>
    </nav>
  )
}
