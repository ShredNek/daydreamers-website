import highQualHero from "./assets/images/hero/DayDreamersCollage_HighQual.jpg";
import lowQualHero from "./assets/images/hero/DayDreamersCollage_LowQual.jpg";
import Footer from "./components/Footer.tsx";
import LazyImage from "./components/LazyImage.tsx";
import NavHeader from "./components/NavHeader.tsx";
import "./styles/views/_site-wrapper.scss";
import { Outlet } from "react-router-dom";

type SiteWrapperComponent = {
	hideBackground?: boolean;
};

export default function SiteWrapper({ hideBackground }: SiteWrapperComponent) {
	return (
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
	);
}
