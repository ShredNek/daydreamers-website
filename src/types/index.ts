import { Context, Dispatch, SetStateAction } from "react";

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

export interface AllGigsEntity {
  data: {
    allGigs?: Gig[] | null;
    _allGigsMeta: AllGigsMeta;
  };
}
export interface Gig {
  id: string;
  title: string;
  venue: string;
  venuelocation: VenueLocation;
  datetime: string;
  details: string;
  gigposter: GigPoster;
  ticketslink: string;
  ticketprice: string;
  artistnames: string;
  artistlinks: string;
  _status: string;
  _firstPublishedAt: string;
}
export interface VenueLocation {
  latitude: number;
  longitude: number;
}
export interface GigPoster {
  format: string;
  filename: string;
  url: string;
}
export interface AllGigsMeta {
  count: number;
}

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

export type PaginatorState = {
  activePage: number;
  totalPages: number;
};

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

export interface AppContextInterface {
  gigData: AllGigsEntity | null;
  merchItems: MerchItem[] | null;
  merchReqParams: MerchReqParams | null;
  updateGigData: (currGigData: AllGigsEntity) => void;
  updateMerchItems: (currMerchItems: MerchItem[]) => void;
  updateMerchReqParams: (currMerchReqParams: MerchReqParams) => void;
}

export type ComponentStatus = "error" | "loading" | "ok" | "not found";

export type ComponentLoadingStatus =
  | "transitioning static"
  | "transitioning"
  | "";
