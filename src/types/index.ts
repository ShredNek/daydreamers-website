// ? API

export type GetAllItemEdge = {
  node: {
    id: string;
    title: string;
  };
};

// ? Merch Types

export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL";

export type SizesAvailable = { [K in Size]: number };

export type MerchItem = {
  merchId: string;
  name: string;
  description: string;
  price: string;
  imgSrc: string;
  category: MerchType;
  dateAdded: string;
  extraImages: string[];
  featured: boolean;
  totalStock: number;
  sizesAvailable?: SizesAvailable;
};

export type MerchItemGQLSchema = Omit<
  MerchItem,
  "merchId" | "name" | "description" | "imgSrc"
> & {
  id: string;
  title: string;
  // TODO FIX ANY TYPE
  images: any;
};

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

export type MerchReqParams = {
  sortBy: SortType | null;
  stockPreferences: StockPresencePreferences;
  priceFrom: string;
  priceTo: string;
};

export type StockPresencePreferences = {
  inStockRequested: boolean;
  outOfStockRequested: boolean;
};

export type SearchPreference = {
  name: string;
  camelCaseName: SortType;
};

export type ExtraSearchPreference = {
  name: string;
  componentType: "switch" | "price range";
  stockPresencePreference?: StockPresencePreferences;
};

export type MerchAvailability = {
  inStockQuantity: string;
  outOfStockQuantity: string;
};

export type MerchType =
  | "music"
  | "music accessories"
  | "accessories"
  | "clothing"
  | "decoration"
  | "miscellaneous";

export type SortType =
  | Size
  | MerchType
  | "featured"
  | "a to z"
  | "z to a"
  | "highest price"
  | "lowest price"
  | "newest"
  | "oldest"
  | "availability";
