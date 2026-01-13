import type { ReactNode } from "react";
import { PiHeartFill } from "react-icons/pi";
import RoundedButtonLink from "../components/RoundedButtonLink.tsx";
import { renderLinkTypeImage } from "../helper/index.tsx";
import type { SocialMediaEntry } from "../types/index.ts";
import { SOCIAL_LINKS } from "../utils/globals.ts";

export default function Footer() {
	const groupedSocialLinks = SOCIAL_LINKS.filter(
		(social) =>
			social.linkType !== "album" &&
			social.linkType !== "song" &&
			social.linkType !== "website",
	).reduce<Record<number, Array<SocialMediaEntry>>>((acc, social, index) => {
		(acc[Math.floor(index / 4)] ??= []).push(social);
		return acc;
	}, {});

	const renderedSocialLinks = Object.entries(groupedSocialLinks).map(
		([groupIndex, socialMediaEntries]) => (
			<div className="social-media-group" key={groupIndex}>
				{socialMediaEntries.map((social, socialIndex) => (
					<RoundedButtonLink
						imageChild={renderLinkTypeImage(social.linkType)}
						key={`${socialIndex}::${social.title}`}
					/>
				))}
			</div>
		),
	);

	return (
		<footer>
			<div className="footer-content">
				<div className="social-links">{renderedSocialLinks}</div>
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
