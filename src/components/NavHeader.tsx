import { useNavigate } from "react-router-dom";
import { type PAGE_LINK, PAGE_LINKS } from "../utils/globals.ts";
import "../styles/components/_nav-header.scss";
import { Twirl as Hamburger } from "hamburger-react";
import { useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";

const generateTitleWithShiftingLetters = (title: string): React.ReactNode[] => {
	const randomDistance = 5;
	const randomVal = () => Math.random() * randomDistance - 5;

	return title.split("").map((ltr, index) => {
		const style = {
			transform: `translate(${randomVal()}px, ${randomVal()}px)`,
		};

		return ltr !== " " ? (
			// biome-ignore lint/suspicious/noArrayIndexKey: I do not want to re-render letters each change
			<span key={index} style={style}>
				{ltr}
			</span>
		) : (
			<br key={uuid()} />
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
	const [isDropdownActive, setIsDropdownActive] = useState(false);
	const navRef = useRef<HTMLDivElement | null>(null);
	const title = "Day Dreamers";

	useEffect(() => {
		// Initial render
		setTitleNodes(generateTitleWithShiftingLetters(title));

		const titleNodeInterval = setInterval(() => {
			setTitleNodes(generateTitleWithShiftingLetters(title));
		}, 5000);

		const clickListener = (e: MouseEvent) => {
			if (navRef.current && !navRef.current.contains(e.target as Node)) {
				setIsDropdownActive(false);
			}
		};

		document.addEventListener("click", clickListener);

		return () => {
			// Cleanup
			clearInterval(titleNodeInterval);
			removeEventListener("click", clickListener);
		};
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
			className={`header-navigation ${hideBackground ? "no-background" : ""}`}
			id="header-navigation"
			ref={navRef}
		>
			<nav className="home-and-dropdown-toggle">
				<button
					className="header-logo-container"
					onClick={() => navigate("/")}
					type="button"
				>
					<h1 className={`letters ${className ?? ""}`}>{titleNodes}</h1>
				</button>
				<div className="dropdown-button">
					<Hamburger
						// I need this colour to be unset so I can apply my own
						color=""
						onToggle={() => setIsDropdownActive((prev) => !prev)}
						toggled={isDropdownActive}
					/>
				</div>
			</nav>
			<nav
				className={`page-routes dropdown-${isDropdownActive ? "active" : "inactive"}`}
				id="page-routes"
			>
				<ul>
					{PAGE_LINKS.map((link, index) => (
						<li
							className={index % 2 === 0 ? `hover v-1` : `hover v-2`}
							key={uuid()}
						>
							<button onClick={() => handleNavItemClick(link)} type="button">
								<img
									alt={`Link to ${link.to}`}
									draggable="false"
									src={link.tabImg}
								/>
							</button>
						</li>
					))}
				</ul>
			</nav>
		</div>
	);
}
