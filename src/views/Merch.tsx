// ? Components
import SwitchBoxPopover from "../components/tailwind/headlessUI/SwitchBoxPopover";
import PriceRangePopover from "../components/tailwind/headlessUI/PriceRangePopover";
import Dropdown from "../components/tailwind/headlessUI/Dropdown";

// ? Interfaces/Types
import {
  GetAllItemEdge,
  MerchItem,
  MerchItemGQLSchema,
  PaginatorState,
  ComponentStatus,
} from "../types/index";
import { useEffect, useState, useContext } from "react";
import FormalFooter from "../components/FormalFooter";
import FormalHeader from "../components/FormalHeader";
import HandleCollectionView from "../components/HandleCollectionView";

// ? Others
import { getAllMerch, getMerchById } from "../api/shopifyCalls";
import { sortMerchByOptions } from "../helper/sortMerchByOption";
import { parseMerchEdges } from "../helper/parseMerchEdges";
import { searchItems } from "../helper/searchItems";
import Paginator from "../components/Paginator";
import { PAGE_DIFFERENCE, SORT_BY_OPTIONS, EXTRA_SORT_BY_OPTIONS } from "../utils/globals";
import DynamicHeightDiv from "../components/DynamicHeightDiv";
import "../styles/components/_index.scss"
import { AppContext } from "../utils/AppContext";

export default function Merch() {

  // ? Context
  const { merchItems, setMerchItems, merchReqParams, setMerchReqParams } = useContext(AppContext)

  // ? Local state
  const [allSortedMerch, setAllSortedMerch] = useState<MerchItem[]>([]);
  const [paginatorState, setPaginatorState] = useState<PaginatorState>({
    activePage: 1,
    totalPages: 1,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [componentStatus, setComponentStatus] = useState<ComponentStatus>("loading")
  const [visible, setVisible] = useState(false)

  // ? Main functions

  const callAndSetDefaultMerch: () => void = async () => {


    let rawRes: any;
    try {
      console.log("calling")
      rawRes = await (await getAllMerch()).json();
    } catch (error) {
      console.error("getAllItems() returned an error. Network has either disconnected, or it is a bad connection.");
      console.error(error);
      setComponentStatus("error");
    }

    const allEdges: GetAllItemEdge[] = rawRes?.data?.products?.edges?.map((e: GetAllItemEdge) => e);

    if (!allEdges?.length) {
      setComponentStatus("error");
      throw Error("allEdges is empty after trying to get store items")
    }

    const allRawData: PromiseSettledResult<MerchItemGQLSchema>[] =
      await Promise.allSettled(
        allEdges.map(async (e, index) => {
          const id = e.node.id.split("/").pop()!;

          // Introduce a delay between calls
          let delay = 500;
          await new Promise((resolve) => setTimeout(resolve, delay * index));

          const callRes = await (await getMerchById(id)).json();
          const productDetails = callRes.data.product;

          // console.log(
          //   callRes.extensions.cost.throttleStatus.currentlyAvailable
          // );

          const final: MerchItemGQLSchema = {
            id: id,
            title: e.node.title,
            price: productDetails.variants.edges[0].node.price,
            images: productDetails.images.edges.map(
              (edge: any) => edge.node.src
            ),
            featured: productDetails.tags,
            dateAdded: productDetails.createdAt,
            category: productDetails.productType,
            extraImages: productDetails.images.edges.map(
              (imgEdge: any) => imgEdge.node.src
            ),
            totalStock: productDetails.totalInventory,
            sizesAvailable: parseMerchEdges(productDetails),
          };

          return final;
        })
      );

    const isFulfilledResult = (
      merch: PromiseSettledResult<MerchItemGQLSchema>
    ): merch is PromiseFulfilledResult<MerchItemGQLSchema> =>
      merch.status === "fulfilled";

    const successfulCalls: PromiseFulfilledResult<MerchItemGQLSchema>[] =
      allRawData.filter(isFulfilledResult);

    const formattedItems: MerchItem[] = successfulCalls.map((rawMerch) => {
      const merch = rawMerch.value;
      return {
        ...merch,
        merchId: merch.id,
        name: merch.title,
        description: merch.title,
        imgSrc: merch.images[0],
      } as const;
    });

    setVisible(false)
    await new Promise<void>(resolve => {
      setTimeout(() => {
        resolve();
      }, 1000)
    })
    setMerchItems(formattedItems);
    setComponentStatus("ok");
  };

  const handleSortMerch = () => {
    console.log()
    if (!merchItems) return
    const sortedByOption = sortMerchByOptions(merchItems, merchReqParams ?? undefined);
    const sortedBySearch = searchQuery.length > 0
      ? searchItems(searchQuery, sortedByOption)
      : sortedByOption;
    setAllSortedMerch(sortedBySearch);
  };

  const setPageLength = (sortedMerch: MerchItem[]) => {
    setPaginatorState({
      ...paginatorState,
      totalPages: Math.ceil(sortedMerch.length / PAGE_DIFFERENCE),
    });
  };

  // ?
  // ? Effects
  // ?

  useEffect(() => {
    if (merchItems === null) {
      setComponentStatus("loading");
      setVisible(true)
      callAndSetDefaultMerch()
    } else {
      setComponentStatus("ok");
      setVisible(true)
      setPageLength(merchItems)
      handleSortMerch();
    }
  }, []);

  useEffect(() => {
    if (merchItems === null) return;
    setPageLength(merchItems)
    handleSortMerch();
  }, [merchItems]);

  useEffect(() => {
    if (componentStatus === "loading" || componentStatus === "error") return;
    allSortedMerch.length > 0 ? setComponentStatus("ok") : setComponentStatus("not found")
    setPageLength(allSortedMerch);
    setVisible(true)
  }, [allSortedMerch])

  useEffect(() => {
    handleSortMerch();
    setPageLength(allSortedMerch);
  }, [merchReqParams, searchQuery]);

  return (
    <section id="merch">
      <FormalHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="banner">
        <h1 className="heading left"> MERCHANDISE</h1>
      </div>
      <DynamicHeightDiv visible={visible}>
        {merchItems && merchItems.length > 0 ? (
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
                  onMerchReqChange={setMerchReqParams}
                />
              </aside>
              <aside className="options">
                <span>Sort by:</span>
                <Dropdown
                  mainOptions={[...SORT_BY_OPTIONS]}
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
                  mainOptions={[...SORT_BY_OPTIONS]}
                  extraOptions={[...EXTRA_SORT_BY_OPTIONS]}
                  openToRight={true}
                  merchReqState={merchReqParams}
                  onMerchReqChange={setMerchReqParams}
                />
              </aside>
            </div>
          </form>
        ) : null}
        <HandleCollectionView
          allSortedMerch={allSortedMerch}
          componentStatus={componentStatus}
          paginatorState={paginatorState}
        />
        {allSortedMerch.length > 0 ? (
          <Paginator
            paginatorState={paginatorState}
            setPaginatorState={setPaginatorState}
          />
        ) : null}
      </DynamicHeightDiv>
      <FormalFooter />
    </section>
  );
}
