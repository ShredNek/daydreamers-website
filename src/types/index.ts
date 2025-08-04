import type { Dispatch, SetStateAction } from "react";

// ? API

export type GetAllItemEdge = {
	node: {
		id: string;
		title: string;
	};
};

interface DatoCmsCall {
	errors?: Array<{ message: string; [key: string]: unknown }>;
}

export interface AllShowsEntity extends DatoCmsCall {
	data: {
		allShows: Show[] | null;
		_allShowsMeta: AllShowsMeta;
	};
}

export interface MusicData extends DatoCmsCall {
	data: {
		allSongCollections: SongCollection[];
	};
}

export interface MediaCollection extends DatoCmsCall {
	data: {
		mediaCollection: {
			mediaData: MediaData[];
		};
	};
}

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

export interface Show {
	id: string;
	title: string;
	slugname: string;
	venue: string;
	venuelocation: VenueLocation;
	datetime: string;
	details: string;
	poster: ShowPoster;
	ticketslink: string;
	ticketprice: string;
	artists?: Array<{
		name: string;
		socialsLink: string;
	}>;
	_status: string;
	_firstPublishedAt: string;
}
export interface VenueLocation {
	latitude: number;
	longitude: number;
}
export interface ShowPoster {
	format: string;
	filename: string;
	url: string;
}
export interface AllShowsMeta {
	count: number;
}

export type Track = {
	title: string;
	id: string;
	duration: string;
	lyrics: string;
};

export interface SongCollection {
	appleMusicLink: string;
	collectionType: "album" | "ep" | "single" | "compilation";
	duration: string;
	id: string;
	name: string;
	otherViewsLink: string;
	releaseDate: string;
	spotifyLink: string;
	summary: string;
	likes: string[];
	dislikes: string[];
	description: string;
	trackList: Track[];
	_status: string;
	_firstPublishedAt: Date;
	coverArt: {
		url: string;
	};
}

export interface AppContextInterface {
	showsData: AllShowsEntity | null;
	musicData: MusicData | null;
	setShowsData: Dispatch<SetStateAction<AllShowsEntity | null>>;
	setMusicData: Dispatch<SetStateAction<MusicData | null>>;
}

// TODO - REMOVE THIS!!!
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
