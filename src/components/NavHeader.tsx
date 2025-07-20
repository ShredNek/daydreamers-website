import { Link } from "react-router-dom";
import LazyImage from "../components/LazyImage";
import { returnNavItems } from "../helper";

import HQ_DayDreamersLogo from "../assets/images/icons/HQ_DayDreamersLogo.jpg";
import LQ_DayDreamersLogo from "../assets/images/icons/LQ_DayDreamersLogo.jpg";
import Hamburger from "./Hamburger";

interface NavHeader {
  className?: string;
  linkToDisable?: string;
}

export default function NavHeader({ className, linkToDisable }: NavHeader) {
  return (
    <nav id="header-nav" className={`header-nav ${className}`}>
      <Hamburger linkToDisable={linkToDisable} />
      <div className="desktop-nav-links-parent">
        <menu >
          {returnNavItems(linkToDisable, { limit: 3, break: "before" })}
          <Link to="/" className="img-parent">
            <LazyImage lowQualitySrc={LQ_DayDreamersLogo} highQualitySrc={HQ_DayDreamersLogo} alt="Day Dreamers official logo" />
          </Link>
          {returnNavItems(linkToDisable, { limit: 3, break: "after" })}
        </menu>
      </div>
    </nav>
  );
}
