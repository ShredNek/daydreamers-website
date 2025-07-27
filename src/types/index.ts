import { Dispatch, SetStateAction } from "react";

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
    allGigs: Gig[] | null;
    _allGigsMeta: AllGigsMeta;
  };
}
export interface Gig {
  id: string;
  title: string;
  slugname: string;
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

export type Track = {
  title: string;
  id: string;
  duration: string;
  lyrics: string;
};

export type SongCollection = {
  appleMusicLink: string;
  collectionType: "album" | "ep" | "single" | "compilation";
  duration: string;
  id: string;
  name: string;
  otherViewsLink: string;
  releaseDate: Date;
  spotifyLink: string;
  trackList: Track[];
  _status: string;
  _firstPublishedAt: Date;
  coverArt: {
    url: string;
  };
};

export type MusicData = {
  data: {
    allSongCollections: SongCollection[];
  };
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
  musicData: MusicData | null;
  setGigData: Dispatch<SetStateAction<AllGigsEntity | null>>;
  setMusicData: Dispatch<SetStateAction<MusicData | null>>;
}

export type ComponentStatus =
  | "error"
  | "loading"
  | "ok"
  | "not found"
  | "neutral";

export type ComponentLoadingStatus =
  | "transitioning static"
  | "transitioning"
  | "";

type EnquiryType =
  | "General"
  | "Booking"
  | "Management"
  | "Scathing Review"
  | "Content or Merch Request"
  | "Divulge Covert Information";

type SecretEnquiryType =
  | "Top Secret"
  | "For Your Eyes Only"
  | "Confidential"
  | "Public Knowledge";

export type EnquiryFormSchema = {
  email: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  favouriteColour: string;
  enquiryType: EnquiryType;
  subject: string;
  message: string;
  angerLevel: string | null; // For Scathing Review
  suggestedPunishment: string | null; // For Scathing Review
  codeName: string | null; // For Divulge Covert Information
  levelOfSecrecy: SecretEnquiryType | null; // For Divulge Covert Information
};

export type MediaCollection = {
  data: {
    mediaCollection: {
      mediaData: MediaData[];
    };
  };
};

export type MediaData = {
  id: string;
  url: string;
  _createdAt: string;
  height: number;
  width: number;
  alt: string | null;
  filename: string | null;
  video: Video | null;
  blurUpThumb: string;
};

export type Video = {
  duration: number;
  mp4Url: string;
  streamingUrl: string;
  thumbnailUrl: string;
  height: number;
  width: number;
  alt: string | null;
};

export type LinkType =
  | "instagram"
  | "facebook"
  | "youtube"
  | "tiktok"
  | "spotify"
  | "triple j"
  | "bandcamp"
  | "song"
  | "album"
  | "website";
