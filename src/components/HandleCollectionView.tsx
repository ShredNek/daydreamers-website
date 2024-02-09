import { ComponentStatus, MerchItem, PaginatorState } from "../types";
import Spinner from "../components/Spinner";
import { isWithinPageCount } from "../helper";
import GeneralError from "../components/GeneralError";
import MerchCard from "../components/MerchCard";
import { PAGE_DIFFERENCE } from "../globals";

type HandleCollectionView = {
  allSortedMerch: MerchItem[];
  componentStatus: ComponentStatus;
  paginatorState: PaginatorState
}

export default function HandleCollectionView({ allSortedMerch, componentStatus, paginatorState }: HandleCollectionView) {
  return (
    <main className="collection">
      {componentStatus === "ok" ? (
        allSortedMerch.map((merch, index) => {
          return isWithinPageCount(
            index,
            paginatorState.activePage,
            PAGE_DIFFERENCE
          ) ? (
            <MerchCard
              key={`${merch.merchId}-${index}`}
              merch={merch}
              index={index}
            />
          ) : null;
        })
      ) : componentStatus === "error" ? (
        <GeneralError />
      ) : componentStatus === "loading" ? (
        <Spinner />
      ) : componentStatus === "not found" ? (
        <div>
          <h3>Not found</h3>
        </div>
      ) : null}
    </main>
  )
}
