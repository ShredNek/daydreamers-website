import { useEffect, useRef } from "react";
import {
	GiAlienStare,
	GiBaseballGlove,
	GiDogBowl,
	GiDrumKit,
	GiGuitarBassHead,
	GiGuitarHead,
	GiMicrophone,
} from "react-icons/gi";
import type { IconType } from "react-icons/lib";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import DanielHead from "../assets/images/band-members/DenHead.png";
import JordanHead from "../assets/images/band-members/JorgunHead.png";
import NickHead from "../assets/images/band-members/NikHead.png";
import ZakHead from "../assets/images/band-members/ZekHead.png";
import Y2kWindowShell from "../components/Y2k/Y2kWindowShell";
import { toKebabCase } from "../helper";
import SiteWrapper from "../SiteWrapper";

const bandMembers: Record<
	string,
	{
		name: string;
		type: string;
		icon: IconType;
		imgDesc: string;
		img: string;
		bio: string;
	}
> = {
	Zak: {
		name: "Zak",
		type: "Lead Vocalist / Guitarist",
		icon: GiMicrophone,
		imgDesc: "You have chosen Zak",
		img: ZakHead,
		bio: "Yer favrit lead singur and geeist. Will fuck you up with Jin from Tekken. Luvs his bob le'ponge.",
	},
	Nick: {
		name: "Nick",
		type: "Drums / Lead and Backing Vocalist",
		icon: GiDrumKit,
		imgDesc: "You have chosen Nick",
		img: NickHead,
		bio: "Funny baby man who happens to drum liek a beast. Finger-dipping drinks is a treasured past-time.",
	},
	Jordan: {
		name: "Jordan",
		icon: GiGuitarBassHead,
		type: "Bass / Costume Enthusiast",
		imgDesc: "You have chosen Jordan",
		img: JordanHead,
		bio: "... bass?",
	},
	Daniel: {
		name: "Daniel",
		type: "Lead Guitar / Backing Vocalist",
		icon: GiGuitarHead,
		imgDesc: "You have chosen Dan",
		img: DanielHead,
		bio: "Certified guitar lead. Lafs at any sloit humorous interchange. No want long hair.",
	},
	// Lucy: {
	// 	name: "Lucy",
	// 	icon: GiDogBowl,
	// },
	// Alien: {
	// 	name: "Alien",
	// 	icon: GiAlienStare,
	// },
	// BobsonDougnutt: {
	// 	name: "Bobson Dougnutt",
	// 	icon: GiBaseballGlove,
	// },
};

const defaultVals = {
	name: "Day Dreamers",
	bio: "Formed in late 2015, Day Dreamers are a Melbourne alt punk band influenced by 90's grunge, punk bands to the alternative Australian scene of today. Day Dreamers is made up of four members, Zak Rakitic, Nick Dordevic, Daniel Lee and Jordan Rakitic. The four have an energetic and fun presence on stage, involving the crowd and bringing in some (attempted) humour when they can.",
};

export default function About() {
	const selectedBandMember = useLocation().hash.replace(/^#/, "");
	const bandMemberDisplay = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const bandMemberElem =
			bandMemberDisplay.current?.querySelector<HTMLDivElement>(
				`.${toKebabCase(selectedBandMember)}-band-member`,
			);

		if (bandMemberElem) {
			bandMemberElem.focus();
		}
	}, [selectedBandMember]);

	return (
		<SiteWrapper sectionId="about" className="about">
			<Y2kWindowShell navText="About" closeButtonRedirect="/">
				<div className="input-background">
					<div className="band-member-display">
						<div className="dropdown">
							<div className="list-label">Band Members</div>
							<div className="results-list">
								{Object.entries(bandMembers).map(([k, v]) => (
									<button
										type="button"
										key={uuid()}
										// href={`#${k}`}
										tabIndex={-1}
										className={`${toKebabCase(k)}-band-member`}
									>
										{v.name} <v.icon />
									</button>
								))}
							</div>
						</div>
						<div className="icon-container">
							{Object.entries(bandMembers).map(([k, v]) => (
								<img
									key={uuid()}
									className={`${toKebabCase(k)}-band-member`}
									src={v.img}
									alt={v.imgDesc}
								/>
							))}
						</div>
					</div>
					<div className="bio-content">
						{Object.entries(bandMembers).map(([k, v]) => (
							<div key={k} className={`${toKebabCase(k)}-band-member bio`}>
								<h2>{v.name}</h2>
								<sub>{v.type}</sub>
								<p>{v.bio}</p>
							</div>
						))}
						<div className="day-dreamers bio">
							<h2>{defaultVals.name}</h2>
							<p>{defaultVals.bio}</p>
						</div>
					</div>
					<div className="action-bar">
						<button type="button">Set as Default</button>
						<button type="button">Cancel</button>
					</div>
				</div>
			</Y2kWindowShell>
		</SiteWrapper>
	);
}
