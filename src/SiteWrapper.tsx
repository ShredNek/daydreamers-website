import highQualHero from "./assets/images/hero/new-dreamers_hq.jpg";
import lowQualHero from "./assets/images/hero/new-dreamers_lq.jpeg";
import Footer from "./components/Footer.tsx";
import LazyImage from "./components/LazyImage.tsx";
import NavHeader from "./components/NavHeader.tsx";
import "./styles/views/_site-wrapper.scss";
import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { useGlobalStartupProcedures } from "./hooks/useGlobalFunctions.tsx";
import { AppContext } from "./utils/AppContext.tsx";

type SiteWrapperComponent = {
	hideBackground?: boolean;
};

export default function SiteWrapper({ hideBackground }: SiteWrapperComponent) {
	const { dialogContent } = useContext(AppContext);
	const globalStartupProcedures = useGlobalStartupProcedures();

	void globalStartupProcedures();

	return (
		<>
			<div className="website-content">
				<NavHeader hideBackground={hideBackground} />
				<div className="background-visuals">
					<div className="site-backdrop" id="site-backdrop" />
					<div className="photo-backdrop" id="photo-backdrop">
						<LazyImage
							alt="Hero shot of your local wacky band, Day Dreamers"
							highQualitySrc={highQualHero}
							lowQualitySrc={lowQualHero}
						/>
					</div>
					<iframe
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						className="video-backdrop"
						referrerPolicy="strict-origin-when-cross-origin"
						src="https://www.youtube.com/embed/BXBw2Dvl2fQ?si=y2lXcPFlcs_w2K3G&amp;controls=0&amp;start=3&amp;autoplay=1&amp;mute=1&amp;loop=1&amp;showinfo=0"
						title="YouTube video player"
					/>
				</div>
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
