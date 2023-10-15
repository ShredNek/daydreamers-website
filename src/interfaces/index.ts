export interface Stock {
  name: string;
  price: string;
  stockId: string;
  category: MerchType;
  imgSrc: string;
  extraImages: string[];
  dateAdded: Date;
  availableSizes: Set<Size>;
  description: string;
}

export interface CartItem extends Omit<Stock, "availableSizes" | "dateAdded"> {
  quantity: number;
  chosenSize: Size;
}

export interface MerchReqParams {
  stockPreferences: StockPreferences;
  sortBy: SortType;
  size?: Size[];
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
