import { FaFacebookF, FaInstagram, FaMusic, FaSpotify } from "react-icons/fa6";
import { PiHeartFill } from "react-icons/pi";
import RoundedButtonLink from "../components/RoundedButtonLink";

export default function Footer() {
	return (
		<footer>
			<div className="footer-content">
				<div className="social-links">
					<RoundedButtonLink imageChild={<FaFacebookF />} />
					<RoundedButtonLink imageChild={<FaInstagram />} />
					<RoundedButtonLink imageChild={<FaSpotify />} />
					<RoundedButtonLink imageChild={<FaMusic />} />
				</div>
				<ul className="extra-links">
					<li className="link">Press Kit</li>
				</ul>
				<p className="extra-links">
					<strong>© 2015-{new Date().getFullYear()} Day Dreamers</strong>
				</p>
				<div className="developer-message">
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
				</div>
			</div>
		</footer>
	);
}
