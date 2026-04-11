import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import {
	FaBackwardFast,
	FaBandcamp,
	FaCircle,
	FaCode,
	FaFacebookF,
	FaForwardFast,
	FaInstagram,
	FaMusic,
	FaPlay,
	FaRecordVinyl,
	FaSpotify,
	FaSquare,
	FaTiktok,
	FaYoutube,
} from "react-icons/fa6";
import { IoTriangleSharp } from "react-icons/io5";
import TripleJ from "../components/svg/TripleJ.tsx";
import Y2kWindowShell from "../components/Y2k/Y2kWindowShell.tsx";
import type { LinkType } from "../types/index.ts";
import { SOCIAL_LINKS } from "../utils/globals.ts";

export default function Media() {
	const [media, setMedia] = useState<{
		currentSocial: LinkType;
	}>({ currentSocial: "album" });

	const isLinkType = (value: string): value is LinkType =>
		SOCIAL_LINKS.some((v) => v.linkType === value);

	const handleSkipButtonClick = (newIndex: number) => {
		const newSocial =
			SOCIAL_LINKS[
				SOCIAL_LINKS.findIndex(
					(social) => social.linkType === media.currentSocial,
				) + newIndex
			]?.linkType;

		setMedia((prev) => ({
			...prev,
			currentSocial: newSocial ?? prev.currentSocial,
		}));
	};

	const handleRedirect = () => {
		const urlToNavigateTo = SOCIAL_LINKS.find(
			(v) => v.linkType === media.currentSocial,
		)?.href;

		if (!urlToNavigateTo) {
			throw new Error(`Url for social media ${media.currentSocial} is falsy.`);
		}

		window.open(urlToNavigateTo, "_blank");
	};

	return (
		<section className="media" id="media">
			<Y2kWindowShell closeButtonRedirect="/" windowHeader="Media">
				<a
					className="social-image-container"
					href={
						SOCIAL_LINKS.find((v) => v.linkType === media.currentSocial)?.href
					}
					rel="noreferrer"
					target="_blank"
				>
					<CurrentSocialImage linkType={media.currentSocial} />
				</a>

				<div className="social-information">
					<div className="social-media-select">
						<label htmlFor="search-results-input">Social Media:</label>
						<div className="search-input-combo">
							<select
								id="search-results-input"
								name="search-results-input"
								onChange={(e) => {
									const currentSocial = e.currentTarget.value;
									if (!isLinkType(currentSocial)) {
										return console.warn(`${currentSocial} not of link type`);
									}
									setMedia((prev) => ({ ...prev, currentSocial }));
								}}
								value={media.currentSocial}
							>
								{SOCIAL_LINKS.map((v) => (
									<option key={v.linkType} value={v.linkType}>
										{v.title}
									</option>
								))}
							</select>
							<button className="dropdown-arrow" type="button">
								<IoTriangleSharp />
							</button>
						</div>
					</div>
					<div className="button-row">
						<button className="record" onClick={handleRedirect} type="button">
							<FaCircle />
						</button>
						<button
							className="back-track"
							onClick={() => handleSkipButtonClick(-1)}
							type="button"
						>
							<FaBackwardFast />
						</button>
						<button
							className="play-pause"
							onClick={handleRedirect}
							type="button"
						>
							<FaPlay />
						</button>
						<button
							className="fast-forward"
							onClick={() => handleSkipButtonClick(1)}
							type="button"
						>
							<FaForwardFast />
						</button>
						<button
							className="stop"
							onClick={() => {
								setMedia((prev) => ({
									...prev,
									currentSocial: "album",
								}));
							}}
							type="button"
						>
							<FaSquare />
						</button>
					</div>
				</div>
			</Y2kWindowShell>
		</section>
	);
}

const CurrentSocialImage = ({ linkType }: { linkType: LinkType }) => {
	switch (linkType) {
		case "instagram":
			return <FaInstagram />;
		case "facebook":
			return <FaFacebookF />;
		case "youtube":
			return <FaYoutube />;
		case "tiktok":
			return <FaTiktok />;
		case "spotify":
			return <FaSpotify />;
		case "triple j":
			return <TripleJ />;
		case "bandcamp":
			return <FaBandcamp />;
		case "song":
			return <FaMusic />;
		case "album":
			return <FaRecordVinyl />;
		case "website":
			return <FaCode />;
	}
};
