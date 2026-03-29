import { useState } from "react";
import { PiHeartFill } from "react-icons/pi";
import duhBend from "../assets/images/hero/DeiDronkers.jpg";
import DayDreamerVideo from "../assets/videos/DayDreamersLogoVisualiser_1920-1080.mp4";
import { renderLinkTypeImage } from "../helper";
import { SOCIAL_LINKS } from "../utils/globals";

export default function Links() {
	const [videoHadLoaded, setVideoHasLoaded] = useState<boolean>(false);

	return (
		<>
			<div className="site-backdrop" id="site-backdrop" />
			<div className="photo-backdrop" id="photo-backdrop">
				<img
					alt="Hero shot of your local wacky band, Day Dreamers"
					className={videoHadLoaded ? "fadeout" : ""}
					src={duhBend}
				/>
			</div>
			<div className="video-backdrop">
				<video
					autoPlay
					className={videoHadLoaded ? "" : "fadeout"}
					loop
					muted
					onCanPlay={() => setVideoHasLoaded(true)}
					playsInline
					src={DayDreamerVideo}
				></video>
			</div>
			<section className="links-home" id="links-home">
				<h1>Day Dreamers</h1>
				<h2>Conglaturations, you've stumbled upon the band of your dreams</h2>
				<menu>
					{SOCIAL_LINKS.map((obj) => (
						<a
							className={`${obj.linkType}  link-box`}
							href={obj.href}
							key={obj.title}
							rel="noreferrer"
							target="_blank"
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
						href="https://github.com/shredNek/"
						rel="noreferrer"
						target="_blank"
					>
						Daniel Lee.
					</a>
				</footer>
			</section>
		</>
	);
}
