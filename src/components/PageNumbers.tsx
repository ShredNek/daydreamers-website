import { PaginatorState } from "../types";

interface PageNumbers {
  paginatorState: PaginatorState;
  setPaginatorState: React.Dispatch<React.SetStateAction<PaginatorState>>;
}

const PageNumbers = ({ paginatorState, setPaginatorState }: PageNumbers) => {
  // Create an array with the specified number of elements
  const itemsArray = Array.from(
    { length: paginatorState.totalPages },
    (_, index) => index,
  );

  return (
    <>
      {itemsArray.map((item, index) => (
        <a
          className={`${
            paginatorState.activePage === index + 1 ? "active" : ""
          }  paginator-number`}
          key={index}
          onClick={() =>
            setPaginatorState({ ...paginatorState, activePage: index + 1 })
          }>
          {item + 1}
        </a>
      ))}
    </>
  );
};

export default PageNumbers;
