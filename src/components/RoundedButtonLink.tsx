import type { ReactNode } from "react";
import { renderLinkTypeImage } from "../helper/index.tsx";
import type { SocialMediaEntry } from "../types/index.ts";

interface RoundedButtonLink {
	social: SocialMediaEntry;
}

export default function RoundedButtonLink({ social }: RoundedButtonLink) {
	return (
		<a
			className="rounded-button-link"
			href={social.href}
			rel="noopener"
			target="_blank"
		>
			<div className="bg" /> {renderLinkTypeImage(social.linkType)}
		</a>
	);
}
