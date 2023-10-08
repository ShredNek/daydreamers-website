export interface Stock {
  name: string;
  price: string;
  stockId: string;
  category: merchType;
  imgSrc: string;
  extraImages: string[];
  dateAdded: Date;
  availableSizes: Set<size>;
  description: string;
}

export interface MerchReqParams {
  stockPreferences: StockPreferences;
  sortBy: sortType;
  size?: size[];
  priceFrom?: string;
  priceTo?: string;
}

export interface StockPreferences {
  inStockRequested: boolean;
  outOfStockRequested: boolean;
}

export interface SearchPreference {
  name: string;
  camelCaseName: string;
}

export interface Merch {
  inStockQuantity: string;
  outOfStockQuantity: string;
}

export type size = "xs" | "s" | "m" | "l" | "xl" | "xxl";

export type merchType =
  | "music"
  | "music accessories"
  | "accessories"
  | "clothing"
  | "decoration"
  | "miscellaneous";

export type sortType =
  | "price range"
  | "size"
  | "featured"
  | "a to z"
  | "z to a"
  | "highest price"
  | "lowest price"
  | "newest"
  | "oldest";
