import aboutTabImg from "../assets/images/tabs/tabs_about.png";
import contactTabImg from "../assets/images/tabs/tabs_contact.png";
import mediaTabImg from "../assets/images/tabs/tabs_media.png";
import merchTabImg from "../assets/images/tabs/tabs_merch.png";
import musicTabImg from "../assets/images/tabs/tabs_music.png";
import showsTabImg from "../assets/images/tabs/tabs_shows.png";
import type { LinkType } from "../types";

export const PAGE_DIFFERENCE = 8;

export const FADE_SPEED = 500;

export const AUTO_HIDE_MODAL_DURATION = 5000;

export type PAGE_LINK = {
	to: string;
	innerText: string;
	tabImg: string;
	urlIsExternal: boolean;
};

export const PAGE_LINKS: PAGE_LINK[] = [
	{
		urlIsExternal: false,
		to: "/music",
		innerText: "Music",
		tabImg: musicTabImg,
	},
	{
		urlIsExternal: false,
		to: "/shows",
		innerText: "Shows",
		tabImg: showsTabImg,
	},
	{
		urlIsExternal: false,
		to: "/about",
		innerText: "About",
		tabImg: aboutTabImg,
	},
	{
		urlIsExternal: false,
		to: "/contact",
		innerText: "Contact",
		tabImg: contactTabImg,
	},
	{
		urlIsExternal: false,
		to: "/media",
		innerText: "Media",
		tabImg: mediaTabImg,
	},
	{
		urlIsExternal: true,
		to: "https://daydreamers.bandcamp.com/merch",
		innerText: "Merch",
		tabImg: merchTabImg,
	},
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
