// ? Components
import SwitchBoxPopover from "../components/headlessUI/SwitchBoxPopover";
import PriceRangePopover from "../components/headlessUI/PriceRangePopover";
import IconButton from "../components/IconButton";
import LazyImage from "../components/LazyImage";

import { FaFacebookF, FaInstagram, FaSpotify, FaMusic } from "react-icons/fa6";
import {
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";

import SampleStock from "../test/SampleStock";

import HQ_DayDreamersLogo from "../assets/images/HQ_DayDreamersLogo.jpg";
import LQ_DayDreamersLogo from "../assets/images/LQ_DayDreamersLogo.jpg";
import HQ_OfficialMerch from "../assets/images/HQ_OfficialMerchandiseStoreLogo.webp";
import LQ_OfficialMerch from "../assets/images/LQ_OfficialMerchandiseStoreLogo.webp";
import MissingImage from "../assets/images/MissingImage.png";

import { MerchReqParams, Merch } from "../interfaces/index";
import { useEffect, useState } from "react";

export default function Merch() {
  const [merchReqParams, setMerchReqParams] = useState<MerchReqParams>({
    stockPreferences: {
      inStockRequested: true,
      outOfStockRequested: false,
    },
    sortBy: "featured",
  });

  const [merch, setMerch] = useState<Merch>({
    inStockQuantity: "0",
    outOfStockQuantity: "0",
  });

  useEffect(() => {
    // console.log(merchReqParams);
  }, [merchReqParams]);

  return (
    <section id="merch">
      <header>
        <div id="left-icons">
          <IconButton
            onClick={() => console.log("oi")}
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
      </header>
      <div className="banner">
        <h1 className="heading left"> MERCHANDISE</h1>
      </div>
      <form action="GET" id="stock-params">
        <div id="large-screen">
          {/* // ? Greater than 900px  */}
          <aside className="options">
            <span>Filter:</span>
            <SwitchBoxPopover
              state={merchReqParams.stockPreferences}
              changeStockPreferenceState={(stockPreferences) =>
                setMerchReqParams({ ...merchReqParams, stockPreferences })
              }
            />
            <PriceRangePopover />
          </aside>
          <aside className="options">
            <span>Sort by:</span>
            <SwitchBoxPopover
              state={merchReqParams.stockPreferences}
              changeStockPreferenceState={(stockPreferences) =>
                setMerchReqParams({ ...merchReqParams, stockPreferences })
              }
            />
          </aside>
        </div>
        <div id="small-screen">
          {/* // ? Less than 900px  */}
          <aside className="options">
            <span>Filter:</span>
            <IconButton Icon={<AdjustmentsHorizontalIcon />} />
          </aside>
        </div>
      </form>
      {/* <pre>{JSON.stringify(merchReqParams, null, 2)}</pre>
      <pre>{JSON.stringify(merch, null, 2)}</pre> */}
      <main className="collection">
        {SampleStock.map((stock) => (
          <div key={stock.stockId} className="stock-card">
            <img
              src={stock.imgSrc}
              onError={(e) => (e.currentTarget.src = MissingImage)}
              alt={`an image of${stock.imgSrc}`}
            />
            <p>{stock.name}</p>
            <p>
              <strong>{stock.price}</strong>
            </p>
          </div>
        ))}
      </main>
      <footer>
        <nav id="info">
          <div id="quick-links">
            <span>Quick Links</span>
            <ul>
              <li>
                <a href="#">Refund Policy</a>
              </li>
              <li>
                <a href="#">Shipping Policy</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
            </ul>
          </div>
          <div id="contact">
            <span>Keep up to date</span>
            <hr />
            <div className="merch-social-links">
              {/* 
        // ! I am not happy about what class I used
        // TODO - FIX THIS CLASS, AND THE OTHER 'SOCIAL LINKS' CLASS
         */}
              <IconButton Icon={<FaFacebookF />} />
              <IconButton Icon={<FaInstagram />} />
              <IconButton Icon={<FaSpotify />} />
              <IconButton Icon={<FaMusic />} />
            </div>
            <hr />
            <span>daydreamers2015@gmail.com</span>
          </div>
          <div className="img-parent">
            <LazyImage
              lowQualitySrc={LQ_OfficialMerch}
              highQualitySrc={HQ_OfficialMerch}
              alt="This is the official merch page for Day Dreamers"
            />
          </div>
        </nav>
        <div className="footer__copyright caption">
          <small className="copyright__content">
            © 2023,{" "}
            <a href="/" title="">
              Space Mirror Merch
            </a>
          </small>
          <ul className="policies list-unstyled">
            <li>
              <small className="copyright__content">
                <a href="/policies/refund-policy">Refund policy</a>
              </small>
            </li>
          </ul>
        </div>
      </footer>
    </section>
  );
}

// ? Footer links
// socials
// "official merch" sticker
// quick links to policies:
// - refund
// - shipping
// - privacy
// country/region
// accepted methods

// ? what state do we need per item kind (in stock, out of stock etc.)?
// ? we use this for UX - they know what's in stock
// isRequested
// quantity

// ? and what we need to sort each item by...
// size
// featured
// alphabetical (A to Z)
// price (Hi to Lo)
// date (New to Old)

// ? We need to have everything on the parent (Merch page)
