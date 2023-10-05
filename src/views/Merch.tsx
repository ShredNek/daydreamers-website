// ? Components
import SwitchBoxPopover from "../components/tailwind/headlessUI/SwitchBoxPopover";
import PriceRangePopover from "../components/tailwind/headlessUI/PriceRangePopover";
import Dropdown from "../components/tailwind/headlessUI/Dropdown";

// ? Testing
import SampleStock from "../test/SampleStock";

// ? Images
import MissingImage from "../assets/images/misc/MissingImage.png";

// ? Interfaces/Types
import { MerchReqParams, Merch } from "../interfaces/index";
import { useEffect, useState } from "react";
import { SearchPreference } from "../interfaces/index";
import FormalFooter from "../components/FormalFooter";
import { Link } from "react-router-dom";
import FormalHeader from "../components/FormalHeader";

// ? Constants
const sortByOptions: SearchPreference[] = [
  { name: "Featured", camelCaseName: "featured" },
  { name: "Best Selling", camelCaseName: "bestSelling" },
  { name: "Alphabetically (A-Z)", camelCaseName: "alphabeticallyAZ" },
  { name: "Alphabetically (Z-A)", camelCaseName: "alphabeticallyZA" },
  { name: "Price (Hi-Lo)", camelCaseName: "priceHiLo" },
  { name: "Price (Lo-Hi)", camelCaseName: "priceLoHi" },
  { name: "Date (Newest)", camelCaseName: "dateNewest" },
  { name: "Date (Oldest)", camelCaseName: "dateOldest" },
];

const extraSortByOptions: SearchPreference[] = [
  { name: "Price range", camelCaseName: "priceRange" },
  { name: "In Stock", camelCaseName: "availability" },
  { name: "Out Of Stock", camelCaseName: "availability" },
];

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
      <FormalHeader />
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
              openDirection="right"
            />
            <PriceRangePopover />
          </aside>
          <aside className="options">
            <span>Sort by:</span>
            <Dropdown sortBy={sortByOptions} />
          </aside>
        </div>
        <div id="small-screen">
          {/* // ? Less than 900px  */}
          <aside className="options column">
            <span>Sort by:</span>
            <Dropdown
              sortBy={[...sortByOptions, ...extraSortByOptions]}
              openToRight={true}
            />
          </aside>
        </div>
      </form>
      <main className="collection">
        {SampleStock.map((stock, index) => (
          <Link key={stock.stockId} to={stock.stockId}>
            <a className="stock-card">
              <img
                key={`${stock.name}-${index}`}
                src={stock.imgSrc}
                onError={(e) => (e.currentTarget.src = MissingImage)}
                alt={`an image of${stock.imgSrc}`}
              />
              <p>{stock.name}</p>
              <p>
                <strong>{stock.price}</strong>
              </p>
            </a>
          </Link>
        ))}
      </main>
      <FormalFooter />
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
