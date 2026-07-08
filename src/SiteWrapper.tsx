import highQualHero from "./assets/images/hero/new-dreamers_hq.jpg";
import lowQualHero from "./assets/images/hero/new-dreamers_lq.jpeg";
import Footer from "./components/Footer.tsx";
import LazyImage from "./components/LazyImage.tsx";
import NavHeader from "./components/NavHeader.tsx";
import "./styles/views/_site-wrapper.scss";
import { useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import bagOfSand_Desktop from "./assets/videos/bag-of-sand_LQ.mov";
import bagOfSand_Mobile from "./assets/videos/bag-of-sand_mobile_LQ.mov";
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
						{/* DESKTOP VIDEO */}
						<video
							autoPlay
							className="desktop-ratio"
							loop
							muted
							onPlaying={() => {
								setVideoLoaded(true);
							}}
							src={bagOfSand_Desktop}
						/>
						{/* MOBILE VIDEO */}
						<video
							autoPlay
							className="mobile-ratio"
							loop
							muted
							onPlaying={() => {
								setVideoLoaded(true);
							}}
							src={bagOfSand_Mobile}
						/>
					</div>
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
