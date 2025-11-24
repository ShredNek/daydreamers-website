import { PiHeartFill } from "react-icons/pi";
import RoundedButtonLink from "../components/RoundedButtonLink";
import { renderLinkTypeImage } from "../helper";
import { SOCIAL_LINKS } from "../utils/globals";

export default function Footer() {
	return (
		<footer>
			<div className="footer-content">
				<div className="social-links">
					{SOCIAL_LINKS.filter(
						(social) =>
							social.linkType !== "album" &&
							social.linkType !== "song" &&
							social.linkType !== "website",
					).map((social, index) => (
						<RoundedButtonLink
							imageChild={renderLinkTypeImage(social.linkType)}
							key={`${index}::${social.title}`}
						/>
					))}
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
