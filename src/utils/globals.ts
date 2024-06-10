import { SearchPreference, ExtraSearchPreference } from "../types";

export const PAGE_DIFFERENCE = 8;

export const FADE_SPEED = 500;

export const AUTO_HIDE_MODAL_DURATION = 5000;

export const PAGE_LINKS = [
  { to: "/music", innerText: "Music" },
  { to: "/gigs", innerText: "Gigs" },
  { to: "/about", innerText: "About" },
  { to: "/contact", innerText: "Contact" },
  { to: "/merch", innerText: "Merch" },
  { to: "/media", innerText: "Media" },
];

// ? Constants
export const SORT_BY_OPTIONS: SearchPreference[] = [
  { name: "Featured", camelCaseName: "featured" },
  { name: "Alphabetically (A-Z)", camelCaseName: "a to z" },
  { name: "Alphabetically (Z-A)", camelCaseName: "z to a" },
  { name: "Price (Hi-Lo)", camelCaseName: "highest price" },
  { name: "Price (Lo-Hi)", camelCaseName: "lowest price" },
  { name: "Date (Newest)", camelCaseName: "newest" },
  { name: "Date (Oldest)", camelCaseName: "oldest" },
  { name: "Availability", camelCaseName: "availability" },
];

export const EXTRA_SORT_BY_OPTIONS: ExtraSearchPreference[] = [
  { name: "Price range", componentType: "price range" },
  {
    name: "In Stock",
    componentType: "switch",
    stockPresencePreference: {
      inStockRequested: true,
      outOfStockRequested: false,
    },
  },
  {
    name: "Out Of Stock",
    componentType: "switch",
    stockPresencePreference: {
      inStockRequested: false,
      outOfStockRequested: true,
    },
  },
];
