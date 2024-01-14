import { MerchItem, Size, MerchType, MerchReqParams } from "../types";
import { convertToType } from ".";

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
  merchReqParams: MerchReqParams
): MerchItem[] => {
  if (!unsortedItems.length) return [];

  let sortedItems = [...unsortedItems];

  if (merchReqParams.sortBy) {
    // ? Check and mutate sort by Size
    if (
      sortedItems.length &&
      sortedItems[0].sizesAvailable &&
      Object.keys(sortedItems[0].sizesAvailable).includes(merchReqParams.sortBy)
    ) {
      sortedItems = [
        ...sortedItems.filter((merch) =>
          merch.sizesAvailable
            ? merch.sizesAvailable[
                convertToType<Size>(merchReqParams.sortBy as string)
              ] > 0
            : []
        ),
      ];
    }

    // ? Check and mutate sort by Category
    if (
      sortedItems.length &&
      Object.keys(sortedItems[0].category).includes(merchReqParams.sortBy)
    ) {
      sortedItems = [
        ...sortedItems.filter(
          (merch) =>
            merch.category[
              convertToType<MerchType>(
                merchReqParams.sortBy as string
              ) as keyof MerchType
            ]
        ),
      ];
    }
  }

  // ? Check by stock presence
  if (
    merchReqParams.stockPreferences.inStockRequested &&
    merchReqParams.stockPreferences.outOfStockRequested
  ) {
  } else if (merchReqParams.stockPreferences.inStockRequested) {
    sortedItems = [...sortedItems.filter((item) => item.totalStock > 0)];
  } else if (merchReqParams.stockPreferences.outOfStockRequested) {
    sortedItems = [...sortedItems.filter((item) => item.totalStock < 1)];
  }

  // ? Check and mutate sort by Price Range
  if (
    (sortedItems.length && merchReqParams.priceFrom) ||
    merchReqParams.priceTo
  ) {
    sortedItems = [
      ...sortedItems.filter(
        (item) =>
          Number(item.price) >=
            Number(merchReqParams.priceFrom ? merchReqParams.priceFrom : 0) &&
          Number(item.price) <=
            Number(
              merchReqParams.priceTo ? merchReqParams.priceTo : Number.MAX_VALUE
            )
      ),
    ];
  }

  // ? Check the rest of the SortType values
  sortedItems = (() => {
    switch (merchReqParams.sortBy) {
      case "a to z":
        return quickSortByCondition(
          sortedItems,
          (mi1, mi2) => mi1.name < mi2.name
        );
      case "z to a":
        return quickSortByCondition(
          sortedItems,
          (mi1, mi2) => mi1.name > mi2.name
        );
      case "lowest price":
        return quickSortByCondition(
          sortedItems,
          (mi1, mi2) => mi1.price < mi2.price
        );
      case "highest price":
        return quickSortByCondition(
          sortedItems,
          (mi1, mi2) => mi1.price > mi2.price
        );
      case "newest":
        return quickSortByCondition(
          sortedItems,
          (mi1, mi2) =>
            new Date(mi1.dateAdded).getTime() <
            new Date(mi2.dateAdded).getTime()
        );
      case "oldest":
        return quickSortByCondition(
          sortedItems,
          (mi1, mi2) =>
            new Date(mi1.dateAdded).getTime() >
            new Date(mi2.dateAdded).getTime()
        );
      case "availability":
        return quickSortByCondition(
          sortedItems,
          (mi1, mi2) => mi1.totalStock > mi2.totalStock
        );
      case "featured":
        return sortedItems.filter((merch) => merch.featured);
      default:
        if (merchReqParams.sortBy !== null) console.warn("unknown sortOption");
        return sortedItems;
    }
  })();

  if (!sortedItems.length) console.log("skipping sort, nothing returned");

  return sortedItems;
};
