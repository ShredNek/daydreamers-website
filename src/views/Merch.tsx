// ? Components
import SwitchBoxPopover from "../components/tailwind/headlessUI/SwitchBoxPopover";
import PriceRangePopover from "../components/tailwind/headlessUI/PriceRangePopover";
import Dropdown from "../components/tailwind/headlessUI/Dropdown";

// ? Images
import MissingImage from "../assets/images/misc/MissingImage.png";

// ? Interfaces/Types
import { MerchReqParams, MerchAvailability, GetAllItemEdge, MerchItem, SearchPreference, ExtraSearchPreference } from "../types/index";
import { useEffect, useState } from "react";
import FormalFooter from "../components/FormalFooter";
import FormalHeader from "../components/FormalHeader";
import { Link } from "react-router-dom";

// ? Others
import { getAllMerch, getMerchById } from "../api/shopify";
import Spinner from "../components/Spinner";
import { sortMerchByOptions } from "../helper/sortMerchByOption";

// ? Constants
const sortByOptions: SearchPreference[] = [
  { name: "Featured", camelCaseName: "featured" },
  { name: "Best Selling", camelCaseName: "best selling" },
  { name: "Alphabetically (A-Z)", camelCaseName: "a to z" },
  { name: "Alphabetically (Z-A)", camelCaseName: "z to a" },
  { name: "Price (Hi-Lo)", camelCaseName: "highest price" },
  { name: "Price (Lo-Hi)", camelCaseName: "lowest price" },
  { name: "Date (Newest)", camelCaseName: "newest" },
  { name: "Date (Oldest)", camelCaseName: "oldest" },
];

const extraSortByOptions: ExtraSearchPreference[] = [
  { name: "Price range", componentType: 'price range' },
  { name: "In Stock", componentType: 'switch', stockPresencePreference: { inStockRequested: true, outOfStockRequested: false } },
  { name: "Out Of Stock", componentType: 'switch', stockPresencePreference: { inStockRequested: false, outOfStockRequested: true } },
];

export default function Merch() {
  const [merchReqParams, setMerchReqParams] = useState<MerchReqParams>({
    stockPreferences: {
      inStockRequested: true,
      outOfStockRequested: false,
    },
    sortBy: "featured",
    priceFrom: "",
    priceTo: ""
  });

  const [allMerch, setAllMerch] = useState<MerchItem[]>([]);

  const callAllMerch = async () => {
    // ? Call all products
    const rawRes = await (await getAllMerch()).json();
    const allEdges: GetAllItemEdge[] = rawRes.data.products.edges.map((e: GetAllItemEdge) => e);

    console.log(allEdges)

    return Promise.allSettled(
      allEdges.map(async (e, index) => {
        const id = e.node.id.split("/").pop()!;

        // Introduce a delay between calls
        let delay = 500
        await new Promise(resolve => setTimeout(resolve, delay * index));

        const itemDetails = await getFirstVariantDetails(id);
        return {
          id: id,
          title: e.node.title,
          price: itemDetails.price,
          imageSrc: itemDetails.imageSrc
        };
      })
    );
  }

  const getFirstVariantDetails = async (id: string) => {
    const res = await (await getMerchById(id)).json()
    const selectedItem = res.data.product.variants.edges[0]
    return { price: selectedItem.node.price, imageSrc: selectedItem.node.image.src }
  }

  useEffect(() => {
    callAllMerch()
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
              dateAdded: new Date(),
              imgSrc: merch.value.imageSrc,
              extraImages: [merch.value.imageSrc, 'unknown.jpg'],
              featured: false,
              sizesAvailable: {
                "XS": 0,
                "S": 1,
                "M": 1,
                "L": 0,
                "XL": 2,
                "XXL": 3
              },
            })
          }
        })
        setAllMerch(formattedItems)
      })
  }, []);

  useEffect(() => {
    console.log("merch req params change")
    if (allMerch.length < 1)
      setAllMerch(
        sortMerchByOptions(
          allMerch,
          merchReqParams.sortBy,
          merchReqParams.priceFrom,
          merchReqParams.priceTo
        ))
    // console.log(allMerch)
  }, [merchReqParams])

  return (
    <section id="merch">
      <FormalHeader />
      <div className="banner">
        <h1 className="heading left"> MERCHANDISE</h1>
      </div>
      <form id="merch-params">
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
            <Dropdown
              mainOptions={sortByOptions}
              merchReqState={merchReqParams}
              onMerchReqChange={setMerchReqParams}
            />
          </aside>
        </div>
        <div id="small-screen">
          {/* // ? Less than 900px  */}
          <aside className="options column">
            <span>Sort by:</span>
            <Dropdown
              mainOptions={[...sortByOptions]}
              extraOptions={[...extraSortByOptions]}
              openToRight={true}
              merchReqState={merchReqParams}
              onMerchReqChange={setMerchReqParams}
            />
          </aside>
        </div>
      </form>
      <main className="collection">
        {allMerch.length
          ?
          allMerch.map((merch, index) => (
            <Link key={merch.merchId} to={merch.merchId} className="merch-card">
              <img
                key={`${merch.name}-${index}`}
                src={merch.imgSrc}
                onError={(e) => (e.currentTarget.src = MissingImage)}
                alt={`an image of${merch.imgSrc}`}
              />
              <p>{merch.name}</p>
              <p>
                <strong>${merch.price}</strong>
              </p>
            </Link>
          ))
          :
          <Spinner />
        }
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

