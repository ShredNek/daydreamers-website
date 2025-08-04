import { randomUUID } from "node:crypto";
import { useNavigate } from "react-router-dom";
import SpinTail from "../assets/vectors/day-dreamers-logo/Day-Dreamer-SpinTail.svg";
import Star1 from "../assets/vectors/day-dreamers-logo/Day-Dreamer-Star_1.svg";
import Star2 from "../assets/vectors/day-dreamers-logo/Day-Dreamer-Star_2.svg";
import { type PAGE_LINK, PAGE_LINKS } from "../utils/globals";
import Hamburger from "./Hamburger";
import "../styles/components/_nav-header.scss";
import { useEffect, useState } from "react";

const generateTitleWithShiftingLetters = (title: string): React.ReactNode[] => {
	const randomDistance = 8;
	const randomVal = () => Math.random() * randomDistance - 5;

	return title.split("").map((ltr) => {
		const style = {
			transform: `translate(${randomVal()}px, ${randomVal()}px)`,
		};

		return ltr !== " " ? (
			<span key={randomUUID()} style={style}>
				{ltr}
			</span>
		) : (
			<br key={randomUUID()} />
		);
	});
};

interface NavHeader {
	className?: string;
	hideBackground?: boolean | undefined;
}

export default function NavHeader({ className, hideBackground }: NavHeader) {
	const navigate = useNavigate();
	const [titleNodes, setTitleNodes] = useState<React.ReactNode[]>([]);
	const title = "Day Dreamers";

	useEffect(() => {
		// Initial render
		setTitleNodes(generateTitleWithShiftingLetters(title));

		// Update every 5 seconds
		const interval = setInterval(() => {
			setTitleNodes(generateTitleWithShiftingLetters(title));
		}, 2500);

		return () => clearInterval(interval); // Cleanup
	}, []);

	const handleNavItemClick = (link: PAGE_LINK) => {
		if (!link.urlIsExternal) {
			navigate(link.to);
		} else {
			window.open(link.to);
		}
	};

	return (
		<div
			id="header-navigation"
			className={`header-navigation${hideBackground ? " no-background" : ""}`}
		>
			<a className="header-logo-container" href="/">
				<h1 className={`letters${className ?? ""}`}>{titleNodes}</h1>
				<img alt="spin-tail" className="vector spin-tail" src={SpinTail} />
				<img alt="star-1" className="vector star-1" src={Star1} />
				<img alt="star-2" className="vector star-2" src={Star2} />
			</a>
			<nav id="page-routes" className="page-routes">
				<Hamburger />
				<ul>
					{PAGE_LINKS.map((link, index) => (
						<li
							key={randomUUID()}
							className={index % 2 === 0 ? `hover v-1` : `hover v-2`}
						>
							<button type="button" onClick={() => handleNavItemClick(link)}>
								<img src={link.tabImg} alt={`Link to ${link.to}`} />
							</button>
						</li>
					))}
				</ul>
			</nav>
		</div>
	);
}
