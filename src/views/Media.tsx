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
	FaPause,
	FaPlay,
	FaRecordVinyl,
	FaSpotify,
	FaSquare,
	FaTiktok,
	FaYoutube,
} from "react-icons/fa6";
import { IoTriangleSharp } from "react-icons/io5";
import TripleJ from "../components/svg/TripleJ";
import Y2kWindowShell from "../components/Y2k/Y2kWindowShell";
import type { LinkType } from "../types";
import { SOCIAL_LINKS } from "../utils/globals";

export default function Media() {
	const [media, setMedia] = useState<{
		trackState: "play" | "pause";
		currentSocial: LinkType;
	}>({ trackState: "pause", currentSocial: "instagram" });

	const isLinkType = (value: string): value is LinkType =>
		SOCIAL_LINKS.some((v) => v.linkType === value);

	return (
		<section className="media" id="media">
			<Y2kWindowShell closeButtonRedirect="/" navText="Media">
				<a
					className="social-image-container"
					href={
						SOCIAL_LINKS.find((v) => v.linkType === media.currentSocial)?.href
					}
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
					<div className="track-length-container">
						<div className="track-line" />
						<div className="track-scrubber" />
					</div>
					<div className="button-row">
						<button className="back-track" type="button">
							<FaBackwardFast />
						</button>
						<button
							className="play-pause"
							onClick={() =>
								setMedia((prev) => ({
									...prev,
									trackState: prev.trackState === "play" ? "pause" : "play",
								}))
							}
							type="button"
						>
							{media.trackState === "play" ? <FaPlay /> : <FaPause />}
						</button>
						<button className="fast-forward" type="button">
							<FaForwardFast />
						</button>
						<button className="stop" type="button">
							<FaSquare />
						</button>
						<button className="record" type="button">
							<FaCircle />
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
