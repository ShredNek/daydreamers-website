import highQualHero from "./assets/images/hero/new-dreamers_hq.jpg";
import lowQualHero from "./assets/images/hero/new-dreamers_lq.jpeg";
import Footer from "./components/Footer.tsx";
import LazyImage from "./components/LazyImage.tsx";
import NavHeader from "./components/NavHeader.tsx";
import "./styles/views/_site-wrapper.scss";
import { useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import { useGlobalStartupProcedures } from "./hooks/useGlobalFunctions.tsx";
import { AppContext } from "./utils/AppContext.tsx";

type SiteWrapperComponent = {
	hideBackground?: boolean;
};

export default function SiteWrapper({ hideBackground }: SiteWrapperComponent) {
	const [videoLoaded, setVideoLoaded] = useState(false);
	const { dialogContent } = useContext(AppContext);
	const globalStartupProcedures = useGlobalStartupProcedures();

	void globalStartupProcedures();

	return (
		<>
			<div className="website-content">
				<NavHeader hideBackground={hideBackground} />
				<div className="background-visuals">
					<div className="video-backdrop">
						<iframe
							allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
							onLoad={() => {
								setVideoLoaded(true);
							}}
							referrerPolicy="strict-origin-when-cross-origin"
							src="https://player.vimeo.com/video/1200922975?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&amp;autoplay=1&amp;muted=1&amp;loop=1"
							title="DayDreamers_y2k-OMV"
						/>
					</div>
					<script defer src="https://player.vimeo.com/api/player.js" />
					<div
						className={`photo-backdrop${videoLoaded ? " fade-out" : " "}`}
						id="photo-backdrop"
					>
						<LazyImage
							alt="Hero shot of your local wacky band, Day Dreamers"
							highQualitySrc={highQualHero}
							lowQualitySrc={lowQualHero}
						/>
					</div>
				</div>
				<div className="site-backdrop" id="site-backdrop" />
				<div className="content-container">
					<Outlet />
				</div>
				<Footer />
			</div>
			{dialogContent ? (
				<div className="dialog-layer">
					<dialog open={!!dialogContent}>{dialogContent}</dialog>
				</div>
			) : null}
		</>
	);
}
