import { MerchItem, SortType, Size, MerchType } from "../types";

type MerchComparer = (
  merchItemOne: MerchItem,
  merchItemTwo: MerchItem
) => boolean;

const partition = (
  arr: MerchItem[],
  low: number,
  high: number,
  condition: MerchComparer
): number => {
  // Pivot point (last elem)
  const pivotElem = arr[high];

  // choose lowest point (first elem)
  let i = low - 1;

  for (let j = low; j < high; j++) {
    // If the current element is smaller than or equal to the pivot
    if (condition(arr[j], pivotElem)) {
      // Swap arr[i] and arr[j]
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  // Swap arr[i + 1] and arr[high] (put the pivot in its correct place)
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];

  return i + 1; // Return the index of the pivot element
};

const quickSortByCondition = (
  merchItems: MerchItem[],
  condition: MerchComparer
): MerchItem[] => {
  const toSort = [...merchItems];

  const sort = (arr: MerchItem[], low: number, high: number) => {
    if (low < high) {
      // Partition the array and get the pivot index
      const pivotIndex = partition(arr, low, high, condition);

      // Recursively sort the subarrays on the left and right of the pivot
      sort(arr, low, pivotIndex - 1);
      sort(arr, pivotIndex + 1, high);
    }
  };

  // Start the sorting process
  sort(toSort, 0, toSort.length - 1);

  return toSort;
};

export const sortMerchByOptions = (
  unsortedItems: MerchItem[],
  sortOption: SortType,
  priceFrom?: string,
  priceTo?: string
): MerchItem[] => {
  if (!unsortedItems.length)
    throw Error("unsortedItems array does not have any items");

  let sortedItems: MerchItem[] = [];

  if (priceFrom && priceTo) {
    sortedItems = [
      ...unsortedItems.filter(
        (item) =>
          Number(item.price) >= Number(priceFrom) &&
          Number(item.price) <= Number(priceTo)
      ),
    ];
  }

  if (Object.keys(unsortedItems[0].sizesAvailable).includes(sortOption)) {
    sortedItems = [
      ...unsortedItems.filter(
        (merch) => merch.sizesAvailable[sortOption as Size] > 0
      ),
    ];
  }

  if (Object.keys(unsortedItems[0].category).includes(sortOption)) {
    sortedItems = [
      ...unsortedItems.filter(
        (merch) => merch.category[sortOption as keyof MerchType]
      ),
    ];
  }

  // ? Check the common SortType values
  let condition: MerchComparer;
  switch (sortOption) {
    case "a to z":
      condition = (mi1, mi2) => mi1.name < mi2.name;
      sortedItems = quickSortByCondition(unsortedItems, condition);
      break;
    case "z to a":
      condition = (mi1, mi2) => mi1.name > mi2.name;
      sortedItems = quickSortByCondition(unsortedItems, condition);
      break;
    case "lowest price":
      condition = (mi1, mi2) => mi1.price < mi2.price;
      sortedItems = quickSortByCondition(unsortedItems, condition);
      break;
    case "highest price":
      condition = (mi1, mi2) => mi1.price > mi2.price;
      sortedItems = quickSortByCondition(unsortedItems, condition);
      break;
    case "newest":
      condition = (mi1, mi2) =>
        mi1.dateAdded.getTime() < mi2.dateAdded.getTime();
      sortedItems = quickSortByCondition(unsortedItems, condition);
      break;
    case "oldest":
      condition = (mi1, mi2) =>
        mi1.dateAdded.getTime() > mi2.dateAdded.getTime();
      sortedItems = quickSortByCondition(unsortedItems, condition);
      break;
    case "featured":
      sortedItems = unsortedItems.filter((merch) => merch.featured);
      break;
    case "best selling":
      sortedItems = unsortedItems.filter((merch) => merch.sellCount);
      break;
    default:
      throw Error(
        `Unidentified sortOption ${sortOption} provided as an argument - no sorting done`
      );
  }

  if (sortedItems.length) {
    return sortedItems;
  } else {
    console.warn(
      `Sorting returned no items. Skipping sort. Sorted by ${sortOption}`
    );
    return unsortedItems;
  }
};
