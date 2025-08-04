import { useState } from "react";
import {
	LiaBandcamp,
	LiaLaptopCodeSolid,
	LiaRecordVinylSolid,
} from "react-icons/lia";
import {
	PiFacebookLogoThin,
	PiHeartFill,
	PiInstagramLogoThin,
	PiSpotifyLogoThin,
	PiTiktokLogoThin,
	PiYoutubeLogoThin,
} from "react-icons/pi";
import duhBend from "../assets/images/hero/DeiDronkers.jpg";
import DayDreamerVideo from "../assets/videos/DayDreamersLogoVisualiser_1920-1080.mp4";
import TripleJ from "../components/svg/TripleJ";
import type { LinkType } from "../types/index";
import { SOCIAL_LINKS } from "../utils/globals";

export default function Links() {
	const [videoHadLoaded, setVideoHasLoaded] = useState<boolean>(false);

	const renderLinkTypeImage = (linkType: LinkType) => {
		switch (linkType) {
			case "instagram":
				return <PiInstagramLogoThin />;
			case "facebook":
				return <PiFacebookLogoThin />;
			case "youtube":
				return <PiYoutubeLogoThin />;
			case "tiktok":
				return <PiTiktokLogoThin />;
			case "spotify":
				return <PiSpotifyLogoThin />;
			case "triple j":
				return <TripleJ />;
			case "bandcamp":
				return <LiaBandcamp />;
			case "website":
				return <LiaLaptopCodeSolid />;
			case "song":
				break;
			case "album":
				break;
			default:
				return <LiaRecordVinylSolid />;
		}
	};

	return (
		<>
			<div id="site-backdrop" className="site-backdrop" />
			<div id="photo-backdrop" className="photo-backdrop">
				<img
					src={duhBend}
					alt="Hero shot of your local wacky band, Day Dreamers"
					className={videoHadLoaded ? "fadeout" : ""}
				/>
			</div>
			<div className="video-backdrop">
				<video
					className={videoHadLoaded ? "" : "fadeout"}
					onCanPlay={() => setVideoHasLoaded(true)}
					src={DayDreamerVideo}
					playsInline
					autoPlay
					muted
					loop
				></video>
			</div>
			<section id="links-home" className="links-home">
				<h1>Day Dreamers</h1>
				<h2>Conglaturations, you've stumbled upon the band of your dreams</h2>
				<menu>
					{SOCIAL_LINKS.map((obj) => (
						<a
							className={`${obj.linkType}  link-box`}
							key={obj.title}
							href={obj.href}
							target="_blank"
							rel="noreferrer"
						>
							<div className="icon-container">
								{renderLinkTypeImage(obj.linkType)}
							</div>
							<h3 data-banner={obj.bannerData}>{obj.title}</h3>
						</a>
					))}
				</menu>
				<footer className="developer-message">
					<p>Home-made with</p>
					<PiHeartFill />
					<p>by</p>
					<a
						target="_blank"
						href="https://github.com/shredNek/"
						rel="noreferrer"
					>
						Daniel Lee.
					</a>
				</footer>
			</section>
		</>
	);
}
