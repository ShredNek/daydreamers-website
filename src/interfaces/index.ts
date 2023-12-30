// ? API

export type GetAllItemEdge = {
  node: {
    id: string;
    title: string;
  };
};

// ? Merch Types

export interface MerchItem {
  merchId: string;
  name: string;
  description: string;
  price: string;
  category: MerchType;
  dateAdded: string;
  imgSrc: string;
  extraImages: string[];
  isAvailable: boolean;
}

export interface WearableItem extends MerchItem {
  category: "clothing" | "accessories";
  availableSizes: Set<Size>;
  color: string;
}

export interface CartItem
  extends Omit<MerchItem, "availableSizes" | "dateAdded"> {
  isAvailable: true;
  quantity: number;
  chosenSize: Size;
}

export interface MerchReqParams {
  sortBy: SortType;
  stockPreferences: MerchPreferences;
  size?: Size[];
  priceFrom?: string;
  priceTo?: string;
}

export interface MerchPreferences {
  inStockRequested: boolean;
  outOfStockRequested: boolean;
}

export interface SearchPreference {
  name: string;
  camelCaseName: string;
}

export interface MerchAvailability {
  inStockQuantity: string;
  outOfStockQuantity: string;
}

export type Size = "xs" | "s" | "m" | "l" | "xl" | "xxl";

export type MerchType =
  | "music"
  | "music accessories"
  | "accessories"
  | "clothing"
  | "decoration"
  | "miscellaneous";

export type SortType =
  | "price range"
  | "size"
  | "featured"
  | "a to z"
  | "z to a"
  | "highest price"
  | "lowest price"
  | "newest"
  | "oldest";
