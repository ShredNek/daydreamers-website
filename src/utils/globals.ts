import { SearchPreference, ExtraSearchPreference, LinkType } from "../types";
import aboutTabImg from "../assets/images/tabs/tabs_about.png"
import contactTabImg from "../assets/images/tabs/tabs_contact.png"
import mediaTabImg from "../assets/images/tabs/tabs_media.png"
import merchTabImg from "../assets/images/tabs/tabs_merch.png"
import musicTabImg from "../assets/images/tabs/tabs_music.png"
import showsTabImg from "../assets/images/tabs/tabs_shows.png"


export const PAGE_DIFFERENCE = 8;

export const FADE_SPEED = 500;

export const AUTO_HIDE_MODAL_DURATION = 5000;

export const PAGE_LINKS: { to: string, innerText: string, tabImg: string }[] = [
  { to: "/music", innerText: "Music", tabImg: musicTabImg },
  { to: "/gigs", innerText: "Gigs", tabImg: showsTabImg },
  { to: "/about", innerText: "About", tabImg: aboutTabImg },
  { to: "/contact", innerText: "Contact", tabImg: contactTabImg },
  { to: "/media", innerText: "Media", tabImg: mediaTabImg },
  // { to: "/merch", innerText: "Merch" }, // ? This needs to get fixed before we feature this on our site
];

export const SOCIAL_LINKS: Array<{
  linkType: LinkType;
  href: string;
  title: string;
  bannerData?: string;
}> = [
    {
      linkType: "album",
      title: "Stream 'BLUE ROOM'!",
      bannerData: "NEW!",
      href: "https://open.spotify.com/album/30l3wTIlynn32Kh1Y6Geeg?si=0o-C9WM8RqemFlWnbpIuSQ",
    },
    {
      linkType: "tiktok",
      title: "Tiktok",
      href: "https://tiktok.com/@daydreamersband",
    },
    {
      linkType: "spotify",
      title: "Spotify",
      href: "https://open.spotify.com/artist/1jGia2OegGP0F1ZlEbgcwZ?si=B4kttw_vQ9eK3z1-ta9NrQ",
    },
    {
      linkType: "instagram",
      title: "Instagram",
      href: "https://instagram.com/daydreamerssband",
    },
    {
      linkType: "youtube",
      title: "Youtube",
      href: "https://www.youtube.com/@daydreamersband",
    },
    {
      linkType: "triple j",
      title: "Triple J",
      href: "https://www.triplejunearthed.com/artist/day-dreamers",
    },
    {
      linkType: "facebook",
      title: "facebook",
      href: "https://www.facebook.com/daydreamers2015/",
    },
    {
      linkType: "bandcamp",
      title: "Bandcamp",
      href: "https://daydreamers.bandcamp.com/",
    },
    {
      linkType: "website",
      title: "Website",
      href: "https://daydreamers-website.web.app/",
      bannerData: "FUN!",
    },
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
