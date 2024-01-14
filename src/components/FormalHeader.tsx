// ? Hooks
import { SetStateAction, useState } from "react";
import { Link } from "react-router-dom";

// ? Components
import IconButton from "../components/IconButton";
import LazyImage from "../components/LazyImage";
import SearchModal from "./tailwind/headlessUI/SearchModal";

// ? Icons
import {
  MagnifyingGlassIcon,
  ChevronLeftIcon
} from "@heroicons/react/24/outline";

// ? Images
import HQ_DayDreamersLogo from "../assets/images/icons/HQ_DayDreamersLogo.jpg";
import LQ_DayDreamersLogo from "../assets/images/icons/LQ_DayDreamersLogo.jpg";

// ? Styles
import "../styles/components/_formal-header.scss";

type SearchModal = {
  searchHidden?: boolean;
  searchQuery?: string;
  setSearchQuery?: React.Dispatch<SetStateAction<string>>;
}

export default function FormalHeader({ searchHidden = false, searchQuery, setSearchQuery }: SearchModal) {
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  const handleClose = (e?: React.MouseEvent<HTMLButtonElement>) => {
    setSearchModalOpen(false);
    e?.preventDefault()
  }

  return (
    <header>
      <nav>
        <Link is="li" id="left-icons" to={"/merch"}>
          {
            window.location.href.split("/").pop() !== "merch" ?
              (<IconButton
                Icon={<ChevronLeftIcon />}
              />) : <></>
          }
        </Link>
        <Link to="/" className="img-parent">
          <LazyImage
            lowQualitySrc={LQ_DayDreamersLogo}
            highQualitySrc={HQ_DayDreamersLogo}
            alt="Day Dreamers official logo"
          />
        </Link>
        <li id="right-icons">
          {searchHidden === false ?
            <IconButton
              onClick={() => setSearchModalOpen(true)}
              Icon={<MagnifyingGlassIcon />}
            />
            : null}
        </li>
      </nav>
      {searchHidden === false && searchQuery !== undefined && setSearchQuery ?
        <SearchModal
          isOpen={searchModalOpen}
          onClose={handleClose}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        : null}

    </header>
  );
}
