// ? Components
import SwitchBoxPopover from "../components/tailwind/headlessUI/SwitchBoxPopover";
import PriceRangePopover from "../components/tailwind/headlessUI/PriceRangePopover";
import Dropdown from "../components/tailwind/headlessUI/Dropdown";

// ? Images
import MissingImage from "../assets/images/misc/MissingImage.png";

// ? Interfaces/Types
import { MerchReqParams, MerchAvailability, GetAllItemEdge, MerchItem } from "../interfaces/index";
import { useEffect, useState } from "react";
import { SearchPreference } from "../interfaces/index";
import FormalFooter from "../components/FormalFooter";
import { Link } from "react-router-dom";
import FormalHeader from "../components/FormalHeader";

// ? Others
import { getAllMerch, getMerchById } from "../api/shopify";
import Spinner from "../components/Spinner";

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

  const [merch, setMerch] = useState<MerchItem[] | null>(null);

  const [merchAvailability, setMerchAvailability] = useState<MerchAvailability>({
    inStockQuantity: "0",
    outOfStockQuantity: "0",
  });

  const callAllMerch = async () => {
    const rawRes = await (await getAllMerch()).json();
    const allEdges: GetAllItemEdge[] = rawRes.data.products.edges.map((e: GetAllItemEdge) => e);
    console.log(await getItemVariants(allEdges[0].node.id.split("/").pop()!));

    return Promise.allSettled(
      allEdges.map(async e => {
        const id = e.node.id.split("/").pop()!;
        const itemDetails = await getMediumSizeDetails(id);
        return {
          id: id,
          title: e.node.title,
          price: itemDetails.price,
          imageSrc: itemDetails.imageSrc
        }
      }))
  }

  const getItemVariants = async (id: string) => {
    // Use Promise.all to wait for all promises to resolve concurrently
    const response = await getMerchById(id);
    return response.json(); // Assuming getMerchById returns a Promise
  }

  const getMediumSizeDetails = async (id: string) => {
    const res = await (await getMerchById(id)).json()
    const allEdges = res.data.product.variants.edges
    const selectedItem = allEdges.find((i: any) => i.node.selectedOptions[0].value === "M" ? i.node.selectedOptions[0] : null)
    console.log(selectedItem)
    return { price: selectedItem.node.price, imageSrc: selectedItem.node.image.src }
  }

  useEffect(() => {
    // console.log(merchReqParams);
    callAllMerch()
      // .then(allMerch => console.log(allMerch))
      .then(allMerch => {
        let formattedItems: MerchItem[] = [];
        allMerch.forEach(merch => {
          if (merch.status === "fulfilled") {
            formattedItems.push({
              name: merch.value.title,
              merchId: merch.value.id,
              description: merch.value.title,
              price: merch.value.price,
              category: "clothing",
              dateAdded: new Date().toLocaleDateString(),
              imgSrc: merch.value.imageSrc,
              extraImages: [merch.value.imageSrc, 'unknown.jpg'],
              isAvailable: true,
            })
          }
        })
        setMerch(formattedItems)
      })
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
        {merch !== null ? merch.map((stock, index) => (
          <Link key={stock.merchId} to={stock.merchId}>
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
        )) : <Spinner />}
      </main>
      <FormalFooter />
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
