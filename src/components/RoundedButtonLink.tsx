import type { ReactNode } from "react";

interface RoundedButtonLink {
	imageChild: ReactNode;
}

export default function RoundedButtonLink({ imageChild }: RoundedButtonLink) {
	return (
		<div className="rounded-button-link">
			<div className="bg" /> {imageChild}
		</div>
	);
}
