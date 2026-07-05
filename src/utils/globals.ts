import type { SocialMediaEntry } from "../types/index.ts";

export const FADE_SPEED = 500;
export const SHOW_POPUP_INTERVAL = 60_000;
export const SUPER_SECRET_CODE = "/DAY_DREAMERS";
export const SUPER_SECRET_REDIRECT =
	"https://www.youtube.com/watch?v=ciuLPDirfAI";

export type PAGE_LINK = {
	to: string;
	innerText: string;
	urlIsExternal: boolean;
};

export const PAGE_LINKS: PAGE_LINK[] = [
	{
		urlIsExternal: false,
		to: "/music",
		innerText: "Music",
	},
	{
		urlIsExternal: false,
		to: "/shows",
		innerText: "Shows",
	},
	{
		urlIsExternal: false,
		to: "/about",
		innerText: "About",
	},
	{
		urlIsExternal: false,
		to: "/contact",
		innerText: "Contact",
	},
	{
		urlIsExternal: false,
		to: "/media",
		innerText: "Media",
	},
	{
		urlIsExternal: true,
		to: "https://daydreamers.bandcamp.com/merch",
		innerText: "Merch",
	},
];

export const SOCIAL_LINKS: Array<SocialMediaEntry> = [
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
	{
		linkType: "linktree",
		title: "Linktree",
		href: "https://linktr.ee/daydreamerssband",
	},
];
