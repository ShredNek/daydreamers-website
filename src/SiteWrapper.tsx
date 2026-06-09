import highQualHero from "./assets/images/hero/new-dreamers_hq.jpg";
import lowQualHero from "./assets/images/hero/new-dreamers_lq.jpeg";
import Footer from "./components/Footer.tsx";
import LazyImage from "./components/LazyImage.tsx";
import NavHeader from "./components/NavHeader.tsx";
import "./styles/views/_site-wrapper.scss";
import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { AppContext } from "./utils/AppContext.tsx";

type SiteWrapperComponent = {
	hideBackground?: boolean;
};

export default function SiteWrapper({ hideBackground }: SiteWrapperComponent) {
	const { dialogContent } = useContext(AppContext);

	return (
		<>
			<div className="website-content">
				<NavHeader hideBackground={hideBackground} />
				<div className="background-visuals">
					<div className="site-backdrop" id="site-backdrop" />
					{/* <LogoLayer /> */}
					<div className="photo-backdrop" id="photo-backdrop">
						<LazyImage
							alt="Hero shot of your local wacky band, Day Dreamers"
							highQualitySrc={highQualHero}
							lowQualitySrc={lowQualHero}
						/>
					</div>
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
