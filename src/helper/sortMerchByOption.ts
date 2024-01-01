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
) => {
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
) => {
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
  const sortedItems = [...unsortedItems];

  if (!sortedItems.length) return sortedItems;

  if (priceFrom && priceTo) {
    return [
      ...sortedItems.filter(
        (item) =>
          Number(item.price) >= Number(priceFrom) &&
          Number(item.price) <= Number(priceTo)
      ),
    ];
  }

  if (Object.keys(sortedItems[0].sizesAvailable).includes(sortOption)) {
    return [
      ...sortedItems.filter(
        (merch) => merch.sizesAvailable[sortOption as Size] > 0
      ),
    ];
  }

  if (Object.keys(sortedItems[0].category).includes(sortOption)) {
    return [
      ...sortedItems.filter(
        (merch) => merch.category[sortOption as keyof MerchType]
      ),
    ];
  }

  // ? Check the common SortType values
  let condition: MerchComparer;
  switch (sortOption) {
    case "a to z":
      condition = (mi1, mi2) => mi1.name < mi2.name;
      return quickSortByCondition(sortedItems, condition);
    case "z to a":
      condition = (mi1, mi2) => mi1.name > mi2.name;
      return quickSortByCondition(sortedItems, condition);
    case "lowest price":
      condition = (mi1, mi2) => mi1.price < mi2.price;
      return quickSortByCondition(sortedItems, condition);
    case "highest price":
      condition = (mi1, mi2) => mi1.price > mi2.price;
      return quickSortByCondition(sortedItems, condition);
    case "newest":
      condition = (mi1, mi2) =>
        mi1.dateAdded.getTime() < mi2.dateAdded.getTime();
      return quickSortByCondition(sortedItems, condition);
    case "oldest":
      condition = (mi1, mi2) =>
        mi1.dateAdded.getTime() > mi2.dateAdded.getTime();
      return quickSortByCondition(sortedItems, condition);
    case "featured":
      return sortedItems.filter((merch) => merch.featured);
    default:
      return sortedItems;
  }
};
