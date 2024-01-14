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
import { searchItems } from "../helper/searchItems";

// ? Constants
const sortByOptions: SearchPreference[] = [
  { name: "Featured", camelCaseName: "featured" },
  { name: "Alphabetically (A-Z)", camelCaseName: "a to z" },
  { name: "Alphabetically (Z-A)", camelCaseName: "z to a" },
  { name: "Price (Hi-Lo)", camelCaseName: "highest price" },
  { name: "Price (Lo-Hi)", camelCaseName: "lowest price" },
  { name: "Date (Newest)", camelCaseName: "newest" },
  { name: "Date (Oldest)", camelCaseName: "oldest" },
  { name: "Availability", camelCaseName: "availability" },
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
      outOfStockRequested: true,
    },
    sortBy: null,
    priceFrom: "",
    priceTo: ""
  });

  const [allMerch, setAllMerch] = useState<MerchItem[]>([]);
  const [allSortedMerch, setAllSortedMerch] = useState<MerchItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("")

  // ?
  // ? Main functions
  // ?

  const callAndSetDefaultMerch: () => void = async () => {
    // ? Call all products
    const rawRes = await (await getAllMerch()).json();
    const allEdges: GetAllItemEdge[] = rawRes.data.products.edges.map((e: GetAllItemEdge) => e);

    const allRawData: PromiseSettledResult<MerchItemGQLSchema>[] = await Promise.allSettled(
      allEdges.map(async (e, index) => {
        const id = e.node.id.split("/").pop()!;

        // Introduce a delay between calls
        let delay = 500
        await new Promise(resolve => setTimeout(resolve, delay * index));

        const callRes = await (await getMerchById(id)).json();
        const productDetails = callRes.data.product

        console.log(callRes.extensions.cost.throttleStatus.currentlyAvailable)

        const final: MerchItemGQLSchema = {
          id: id,
          title: e.node.title,
          price: productDetails.variants.edges[0].node.price,
          images: productDetails.images.edges.map((edge: any) => edge.node.src),
          featured: productDetails.tags,
          dateAdded: productDetails.createdAt,
          category: productDetails.productType,
          extraImages: productDetails.images.edges.map((imgEdge: any) => imgEdge.node.src),
          totalStock: productDetails.totalInventory,
          sizesAvailable: parseMerchEdges(productDetails),
        };

        return final
      })
    );

    const isFulfilledResult = (merch: PromiseSettledResult<MerchItemGQLSchema>): merch is PromiseFulfilledResult<MerchItemGQLSchema> => merch.status === "fulfilled";
    const successfulCalls: PromiseFulfilledResult<MerchItemGQLSchema>[] = allRawData.filter(isFulfilledResult)

    const formattedItems: MerchItem[] = successfulCalls.map(rawMerch => {
      const merch = rawMerch.value
      return {
        ...merch,
        merchId: merch.id,
        name: merch.title,
        description: merch.title,
        imgSrc: merch.images[0],
      } as const;
    });

    setAllMerch(formattedItems)
  }

  const handleSortMerch = () => {
    const sortedByOption = sortMerchByOptions(allMerch, merchReqParams);
    const sortedBySearch = searchItems(searchQuery, sortedByOption)
    console.clear()
    console.log(sortedBySearch)
    setAllSortedMerch(sortedBySearch)
  }

  // ?
  // ? Effects
  // ?

  useEffect(() => {
    callAndSetDefaultMerch()
  }, []);

  useEffect(() => {
    handleSortMerch()
  }, [allMerch, merchReqParams, searchQuery])

  return (
    <section id="merch">
      <FormalHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
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
            <PriceRangePopover
              merchReqState={merchReqParams}
              onMerchReqChange={setMerchReqParams} />
          </aside>
          <aside className="options">
            <span>Sort by:</span>
            <Dropdown
              mainOptions={[...sortByOptions]}
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
        {allSortedMerch.length
          ?
          allSortedMerch.map((merch, index) => (
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