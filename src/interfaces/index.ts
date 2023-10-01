export interface Stock {
  name: string;
  price: string;
  stockId: string;
  imgSrc: string;
  extraImages: string[];
  dateAdded: Date;
  availableSizes: Set<size>;
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
