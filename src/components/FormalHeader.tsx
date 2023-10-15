// ? Hooks
import { useState } from "react";
import { Link } from "react-router-dom";

// ? Components
import IconButton from "../components/IconButton";
import LazyImage from "../components/LazyImage";
import CustomDialog from "./tailwind/headlessUI/CustomDialog";

// ? Icons
import {
  MagnifyingGlassIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";

// ? Images
import HQ_DayDreamersLogo from "../assets/images/icons/HQ_DayDreamersLogo.jpg";
import LQ_DayDreamersLogo from "../assets/images/icons/LQ_DayDreamersLogo.jpg";

// ? Styles
import "../styles/components/_formal-header.scss";

export default function FormalHeader() {
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  return (
    <header>
      <nav>
        <li id="left-icons">
          <IconButton
            onClick={() => setSearchModalOpen(true)}
            Icon={<MagnifyingGlassIcon />}
          />
        </li>
        <Link to="/" className="img-parent">
          <LazyImage
            lowQualitySrc={LQ_DayDreamersLogo}
            highQualitySrc={HQ_DayDreamersLogo}
            alt="Day Dreamers official logo"
          />
        </Link>
        <Link typeof="li" id="right-icons" to='/merch/cart'>
          <IconButton
            Icon={<ShoppingBagIcon />}
          />
        </Link>
      </nav>
      <CustomDialog
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
      />
    </header>
  );
}
