import PageNumbers from "../components/PageNumbers";
import { PaginatorState } from "../types";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/20/solid";

interface Paginator {
  paginatorState: PaginatorState;
  setPaginatorState: React.Dispatch<React.SetStateAction<PaginatorState>>;
}

export default function Paginator({ paginatorState, setPaginatorState }: Paginator) {
  return (
    <div id="paginator-host">
      <div id="paginator">
        <a className="paginator-arrow" onClick={() => setPaginatorState({
          ...paginatorState,
          activePage: 1
        })}>
          <ChevronDoubleLeftIcon />
        </a>
        <a className="paginator-arrow" onClick={() => setPaginatorState({
          ...paginatorState,
          activePage: paginatorState.activePage - 1 >= 1 ? paginatorState.activePage - 1 : 1
        })}>
          <ChevronLeftIcon />
        </a>
        <PageNumbers
          paginatorState={paginatorState}
          setPaginatorState={setPaginatorState}
        />
        <a className="paginator-arrow" onClick={() => setPaginatorState({
          ...paginatorState,
          activePage: paginatorState.activePage + 1 <= paginatorState.totalPages ? paginatorState.activePage + 1 : paginatorState.totalPages
        })}>
          <ChevronRightIcon />
        </a>
        <a className="paginator-arrow" onClick={() => setPaginatorState({
          ...paginatorState,
          activePage: paginatorState.totalPages
        })}>
          <ChevronDoubleRightIcon />
        </a>
      </div>
    </div >
  );
}
