// ? Hooks
import { useState } from "react";

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
      <div id="left-icons">
        <IconButton
          onClick={() => setSearchModalOpen(true)}
          Icon={<MagnifyingGlassIcon />}
        />
      </div>
      <a href="/" className="img-parent">
        <LazyImage
          lowQualitySrc={LQ_DayDreamersLogo}
          highQualitySrc={HQ_DayDreamersLogo}
          alt="Day Dreamers official logo"
        />
      </a>
      <div id="right-icons">
        <IconButton
          onClick={() => console.log("oi")}
          Icon={<ShoppingBagIcon />}
        />
      </div>
      <CustomDialog
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
      />
    </header>
  );
}
