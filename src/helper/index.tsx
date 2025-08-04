import type { ReactElement, ReactNode } from "react";
import type { VenueLocation } from "../types/index.ts";
import { PAGE_LINKS } from "../utils/globals.ts";
import { v4 as uuid } from "uuid";

export function toCamelCase(str: string) {
	const splitStr = str.split("");
	console.log(splitStr);
	const res = splitStr.filter((c) => c !== " " && c !== "-").join("");
	return res.charAt(0).toLowerCase().concat(res.slice(1));
}

export function toKebabCase(str: string) {
	const removedSpecialChars = str.replace(/[^\w\s]/gi, "");
	const splitStr = removedSpecialChars.split("");
	const res = splitStr.map((c) => (c === " " ? "-" : c)).join("");

	return res.charAt(res.length - 1) === "-"
		? res.toLowerCase().substring(0, res.length - 1)
		: res.toLowerCase();
}

export const convertToType = <T extends string>(value: string): T => {
	const typeLookup: Record<string, boolean> = {
		[value]: true,
	};

	const isSize = (value: string): value is T => {
		return !!typeLookup[value];
	};

	if (isSize(value)) {
		return value;
	} else {
		throw new Error(`${value} is not of the correct type`);
	}
};

export const inputIsValid = (input: string) =>
	/^(\d+(\.\d{0,2})?|0*\.?\d{0,2})?$/.test(input);

export const isWithinPageCount = (
	itemIndex: number,
	activePage: number,
	pageDifference: number,
): boolean => {
	const adjustedIndex = itemIndex + 1;
	const lowerPageRange = (activePage - 1) * pageDifference;
	const higherPageRange = lowerPageRange + pageDifference;
	return adjustedIndex > lowerPageRange && adjustedIndex <= higherPageRange;
};

export const returnFormattedArtistNames = (
	artists: Array<{ name: string; socialsLink: string }>,
): ReactElement | null => {
	if (!artists.length) return null;

	let message: ReactElement | null = null;
	switch (artists.length) {
		case 1:
			message = (
				<p>
					Featuring <a href={artists[0]?.socialsLink}>{artists[0]?.name}</a>
				</p>
			);
			break;
		case 2:
			message = (
				<p>
					Featuring <a href={artists[0]?.socialsLink}>{artists[0]?.name}</a> and{" "}
					<a href={artists[1]?.socialsLink}>{artists[1]?.name}</a>
				</p>
			);
			break;
		case 3:
			message = (
				<p>
					Featuring <a href={artists[0]?.socialsLink}>{artists[0]?.name}</a>,{" "}
					<a href={artists[1]?.socialsLink}>{artists[1]?.name}</a>, and{" "}
					<a href={artists[2]?.socialsLink}>{artists[2]?.name}</a>
				</p>
			);
			break;
		// ? This is to catch a length that is not 0, 1, 2 or 3
		default:
			message = (
				<p>
					Featuring <a href={artists[0]?.socialsLink}>{artists[0]?.name}</a>,{" "}
					<a href={artists[1]?.socialsLink}>{artists[1]?.name}</a>, and many
					more of our friends!
				</p>
			);
			break;
	}

	return message;
};

export const returnFormattedDate = (
	rawUtcString: string,
	extraConfig = {
		includeTime: true,
		includeDay: true,
	},
): string => {
	const date = new Date(rawUtcString);
	const options: Intl.DateTimeFormatOptions = {
		weekday: extraConfig.includeDay ? "long" : undefined,
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: extraConfig.includeTime ? "numeric" : undefined,
		minute: extraConfig.includeTime ? "numeric" : undefined,
		timeZone: "UTC",
	};
	return date.toLocaleDateString(undefined, options);
};

export const googleMapUrl = (venueLocation: VenueLocation) => {
	return `http://maps.google.com/maps?z=12&t=m&q=loc:${venueLocation.latitude}+${venueLocation.longitude}`;
};

export const convertNumberToThreeDigits = (number: number) => {
	return number.toString().padStart(3, "0");
};

export const secondsToTimeString = (totalSeconds: number) => {
	// Calculate hours, minutes, and seconds
	const hours = Math.floor(totalSeconds / 3600);
	const minutes = Math.floor((totalSeconds % 3600) / 60);
	const seconds = totalSeconds % 60;

	// Pad with zeros if necessary
	const pad = (num: number) => String(num).padStart(2, "0");

	// Format time string
	if (hours > 0) {
		return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
	} else {
		return `${pad(minutes)}:${pad(seconds)}`;
	}
};

export const downloadImage = async (imageUrl: string, filename: string) => {
	try {
		const response = await fetch(imageUrl, { mode: "cors" });
		const blob = await response.blob();
		const url = URL.createObjectURL(blob);

		const a = document.createElement("a");
		a.href = url;
		a.download = filename;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);

		URL.revokeObjectURL(url);
	} catch (error) {
		console.error("Error downloading image:", error);
	}
};

export const convertToPng = async (blob: Blob | MediaSource): Promise<Blob> => {
	return await new Promise<Blob>((resolve, reject) => {
		const img = document.createElement("img");
		const canvas = document.createElement("canvas");
		const ctx = canvas.getContext("2d");

		img.onload = () => {
			canvas.width = img.width;
			canvas.height = img.height;

			if (!ctx)
				throw Error("Couldn't convert image to PNG - 2d Context is null");

			ctx.drawImage(img, 0, 0);
			canvas.toBlob((pngBlob) => {
				if (!pngBlob)
					throw Error("Couldn't convert image to PNG - pngBlob is null");

				resolve(pngBlob);
			}, "image/png");
		};

		img.onerror = () => {
			reject(new Error("Failed to load image for conversion"));
		};

		img.src = URL.createObjectURL(blob);
	});
};

export const returnNavItems = (
	linkToDisable?: string,
	limitAndBreak?: { limit: number; break: "before" | "after" },
): ReactNode[] => {
	return PAGE_LINKS.map((link, index) => {
		if (
			!limitAndBreak ||
			(limitAndBreak.break === "before" && index < limitAndBreak.limit) ||
			(limitAndBreak.break === "after" && index >= limitAndBreak.limit)
		) {
			return (
				<li
					key={uuid()}
					className={`${index % 2 === 0 ? "hover v-1" : "hover v-2"} 
          ${link.innerText === linkToDisable ? "disabled" : ""}`}
				>
					<a href={`/${link.to}`}>{link.innerText}</a>
				</li>
			);
		}
		return null; // return null for cases where the link shouldn't be rendered
	});
};
