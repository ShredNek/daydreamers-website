import { PiHeartFill } from "react-icons/pi";
import duhBend from "../assets/images/hero/DeiDronkers.jpg";
import { renderLinkTypeImage } from "../helper/index.tsx";
import { SOCIAL_LINKS } from "../utils/globals.ts";

export default function Links() {
	return (
		<>
			<div className="site-backdrop" id="site-backdrop" />
			<div className="photo-backdrop" id="photo-backdrop">
				<img
					alt="Hero shot of your local wacky band, Day Dreamers"
					src={duhBend}
				/>
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
