import { ComponentStatus, MerchItem, PaginatorState } from "../types";
import { PAGE_DIFFERENCE } from "../utils/globals";
import { isWithinPageCount } from "../helper/index.tsx";
import Spinner from "../components/Spinner";
import GeneralError from "../components/GeneralError";
import MerchCard from "../components/MerchCard";
import NotFoundError from "../components/NotFoundError";

type HandleCollectionView = {
  allSortedMerch: MerchItem[];
  componentStatus: ComponentStatus;
  paginatorState: PaginatorState;
};

export default function HandleCollectionView({
  allSortedMerch,
  componentStatus,
  paginatorState,
}: HandleCollectionView) {
  return (
    <main className="collection">
      {componentStatus === "ok" ? (
        allSortedMerch.map((merch, index) => {
          return isWithinPageCount(
            index,
            paginatorState.activePage,
            PAGE_DIFFERENCE,
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
        <NotFoundError />
      ) : null}
    </main>
  );
}
