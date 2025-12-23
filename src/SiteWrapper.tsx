import { v4 as uuid } from "uuid";
import highQualHero from "./assets/images/hero/DayDreamersCollage_HighQual.jpg";
import lowQualHero from "./assets/images/hero/DayDreamersCollage_LowQual.jpg";
import logo1 from "./assets/images/logos/logo_1.png";
import logo2 from "./assets/images/logos/logo_2.png";
import logo3 from "./assets/images/logos/logo_3.png";
import logo4 from "./assets/images/logos/logo_4.png";
import logo5 from "./assets/images/logos/logo_5.png";
import logo6 from "./assets/images/logos/logo_6.png";
import Footer from "./components/Footer";
import LazyImage from "./components/LazyImage";
import NavHeader from "./components/NavHeader";
import "./styles/views/_site-wrapper.scss";
import { Outlet } from "react-router-dom";

const imgArr = [logo1, logo2, logo3, logo4, logo5, logo6];

function LogoLayer() {
	return (
		<div className="logo-layer" id="logo-layer">
			{imgArr.map((src, i) => (
				<img
					alt={`Band logo number ${i + 1}`}
					className="day-dreamer-logo"
					key={uuid()}
					src={src}
				></img>
			))}
		</div>
	);
}

type SiteWrapperComponent = {
	hideBackground?: boolean;
};

export default function SiteWrapper({ hideBackground }: SiteWrapperComponent) {
	return (
		<div className="website-content">
			<NavHeader hideBackground={hideBackground} />
			<div className="background-visuals">
				<div className="site-backdrop" id="site-backdrop" />
				<LogoLayer />
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
