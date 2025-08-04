import { useState } from "react";
import { returnNavItems } from "../helper";

export default function Hamburger({
	linkToDisable,
}: {
	linkToDisable?: string;
}) {
	const [buttonOpen, setButtonOpen] = useState(false);

	return (
		<div className="hamburger-parent">
			<button
				type="button"
				onClick={() => setButtonOpen(!buttonOpen)}
				aria-controls="primary-navigation"
				aria-expanded={buttonOpen}
			>
				<svg fill="none" className="hamburger" viewBox="-10 -10 120 120">
					<title>hamburger</title>
					<path
						className="line"
						strokeWidth="10"
						strokeLinecap="round"
						strokeLinejoin="round"
						d="m 20 40 h 60 a 1 1 0 0 1 0 20 h -60 a 1 1 0 0 1 0 -40 h 30 v 70"
					></path>
				</svg>
			</button>
			<div className="hamburger-links">
				<ul>{returnNavItems(linkToDisable)}</ul>
			</div>
			<div className="hamburger-overlay" />
		</div>
	);
}
