import SwitchBoxPopover from "../components/headlessUI/SwitchBoxPopover";
import PriceRangePopover from "../components/headlessUI/PriceRangePopover";
import Hamburger from "../components/misc/Hamburger";
import IconButton from "../components/IconButton";
import LazyImage from "../components/LazyImage";
import MagnifyingGlass from "../components/icons/MagnifyingGlass";
import ShoppingBag from "../components/icons/ShoppingBag";
import SampleStock from "../test/SampleStock";
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
        <Hamburger />
        <a href="/" className="img-parent">
          <LazyImage
            lowQualitySrc="src/assets/images/SmallDayDreamersLogo.jpg"
            highQualitySrc="src/assets/images/DayDreamersLogo.jpg"
            alt="Day Dreamers official logo"
          />
        </a>
        <div id="search-and-cart">
          <IconButton
            icon={<MagnifyingGlass />}
            onClick={() => console.log("oi")}
          />
          <IconButton
            icon={<ShoppingBag />}
            onClick={() => console.log("oi")}
          />
        </div>
      </header>
      <div className="banner">
        <h1 className="heading left"> MERCHANDISE</h1>
      </div>
      <form action="GET" id="stock-params">
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
      </form>
      {/* <pre>{JSON.stringify(merchReqParams, null, 2)}</pre>
      <pre>{JSON.stringify(merch, null, 2)}</pre> */}
      <div className="collection">
        {SampleStock.map((stock) => (
          <div key={stock.stockId}>
            <img
              src={stock.imgSrc}
              onError={(e) => (e.currentTarget.src = MissingImage)}
              alt={`an image of${stock.imgSrc}`}
            />
            <p>{stock.name}</p>
            <p>
              <strong> {stock.price}</strong>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

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
