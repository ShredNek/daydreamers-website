import { PiHeartFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import pressKit from "../assets/files/day-dreamers-press-kit.pdf";
import RoundedButtonLink from "../components/RoundedButtonLink.tsx";
import { SOCIAL_LINKS } from "../utils/globals.ts";

export default function Footer() {
	const navigate = useNavigate();

	const socialLinks = SOCIAL_LINKS.filter(
		(social) =>
			social.linkType !== "album" &&
			social.linkType !== "song" &&
			social.linkType !== "website",
	).map((social) => <RoundedButtonLink key={social.title} social={social} />);

	return (
		<footer>
			<div className="footer-content">
				<div className="social-links">{socialLinks}</div>
				<ul className="extra-links">
					<li className="link">
						<a
							download="Day Dreamers Press Kit - EP and Wreckage"
							href={pressKit}
						>
							Press Kit
						</a>
					</li>
					<li className="link">
						<button
							onClick={() => navigate("/email-subscribe")}
							onKeyDown={() => navigate("/email-subscribe")}
							type="button"
						>
							Mailing List
						</button>
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
