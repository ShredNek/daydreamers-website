import { PiHeartFill } from "react-icons/pi";
import RoundedButtonLink from "../components/RoundedButtonLink.tsx";
import { renderLinkTypeImage } from "../helper/index.tsx";
import { SOCIAL_LINKS } from "../utils/globals.ts";

export default function Footer() {
	const socialLinks = SOCIAL_LINKS.filter(
		(social) =>
			social.linkType !== "album" &&
			social.linkType !== "song" &&
			social.linkType !== "website",
	).map((social) => (
		<RoundedButtonLink
			imageChild={renderLinkTypeImage(social.linkType)}
			key={social.title}
		/>
	));

	return (
		<footer>
			<div className="footer-content">
				<div className="social-links">{socialLinks}</div>
				<ul className="extra-links">
					<li className="link">
						<a href="/">Press Kit</a>
					</li>
				</ul>
				<p className="extra-links">
					<strong>© 2015-{new Date().getFullYear()} Day Dreamers</strong>
				</p>
				<div className="developer-message">
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
				</div>
			</div>
		</footer>
	);
}
