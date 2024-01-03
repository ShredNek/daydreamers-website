// ? Components
import SwitchBoxPopover from "../components/tailwind/headlessUI/SwitchBoxPopover";
import PriceRangePopover from "../components/tailwind/headlessUI/PriceRangePopover";
import Dropdown from "../components/tailwind/headlessUI/Dropdown";

// ? Images
import MissingImage from "../assets/images/misc/MissingImage.png";

// ? Interfaces/Types
import { MerchReqParams, GetAllItemEdge, MerchItem, SearchPreference, ExtraSearchPreference, MerchItemGQLSchema } from "../types/index";
import { useEffect, useState } from "react";
import FormalFooter from "../components/FormalFooter";
import FormalHeader from "../components/FormalHeader";
import { Link } from "react-router-dom";

// ? Others
import { getAllMerch, getMerchById } from "../api/shopifyCalls";
import { sortMerchByOptions } from "../helper/sortMerchByOption";
import Spinner from "../components/Spinner";
import { parseMerchEdges } from "../helper/parseMerchEdges";

// ? Constants
const sortByOptions: SearchPreference[] = [
  { name: "Featured", camelCaseName: "featured" },
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

let firstLoad = true

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

  // ?
  // ? Main functions
  // ?

  const callAndSetMerch: () => void = async () => {
    // ? Call all products
    const rawRes = await (await getAllMerch()).json();
    const allEdges: GetAllItemEdge[] = rawRes.data.products.edges.map((e: GetAllItemEdge) => e);

    const allRawData: PromiseSettledResult<MerchItemGQLSchema>[] = await Promise.allSettled(
      allEdges.map(async (e, index) => {
        const id = e.node.id.split("/").pop()!;

        // Introduce a delay between calls
        let delay = 1500
        await new Promise(resolve => setTimeout(resolve, delay * index));

        const itemDetails = await (await getMerchById(id)).json();
        const productDetails = itemDetails.data.product

        console.log(itemDetails)

        const final: MerchItemGQLSchema = {
          id: id,
          title: e.node.title,
          price: itemDetails.price,
          imageSrc: itemDetails.imageSrc,
          featured: productDetails.tags,
          dateAdded: productDetails.createdAt,
          category: productDetails.productType,
          extraImages: productDetails.images.edges.map((imgEdge: any) => imgEdge.node.image.src),
          sizesAvailable: parseMerchEdges(productDetails.data.product),
        };

        return final
      })
    );

    console.log(allRawData);

    const isFulfilledResult = (merch: PromiseSettledResult<MerchItemGQLSchema>): merch is PromiseFulfilledResult<MerchItemGQLSchema> => merch.status === "fulfilled";

    const successfulCalls: PromiseFulfilledResult<MerchItemGQLSchema>[] = allRawData.filter(isFulfilledResult)

    const formattedItems: MerchItem[] = successfulCalls.map(merch => ({
      name: merch.value.title,
      merchId: merch.value.id,
      description: merch.value.title,
      price: merch.value.price,
      imgSrc: merch.value.imageSrc,
      // TODO - Correctly add category
      // TODO - Correctly add date added
      // TODO - Correctly add extra images
      // TODO - Correctly add if featured
      // TODO - Correctly check all stock

    }))

    setAllMerch(formattedItems)

  }

  // ?
  // ? Effects
  // ?

  useEffect(() => {
    callAndSetMerch()
  }, []);

  useEffect(() => {
    console.log("merch req params change")
    if (allMerch.length > 0) {
      const sortRes = sortMerchByOptions(
        allMerch,
        merchReqParams.sortBy,
        merchReqParams.priceFrom,
        merchReqParams.priceTo
      )

      console.log(sortRes)
      setAllMerch(sortRes)
    } else if (!firstLoad) {
      callAndSetMerch()
      firstLoad = false
    }
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

