import { useState } from "react";
import {
	GiDrumKit,
	GiGuitarBassHead,
	GiGuitarHead,
	GiMicrophone,
} from "react-icons/gi";
import type { IconType } from "react-icons/lib";
import BenHead from "../assets/images/band-members/Ben_Head.png";
import DanielHead from "../assets/images/band-members/Daniel_HeadIcon.png";
import JordanHead from "../assets/images/band-members/Jordan_HeadIcon.png";
import ZakHead from "../assets/images/band-members/Zak_HeadIcon.png";
import Y2kWindowShell from "../components/Y2k/Y2kWindowShell.tsx";
import { toKebabCase } from "../helper/index.tsx";

type BandMember = "Zak" | "Daniel" | "Ben" | "Jordan";

type BandMemberDetails = {
	formattedName: string;
	type: string;
	icon: IconType;
	imgDesc: string;
	img: string;
	bio: string;
};

const bandMembers: Record<BandMember, BandMemberDetails> = {
	Zak: {
		formattedName: "Zak",
		type: "Lead Vocalist / Guitarist",
		icon: GiMicrophone,
		imgDesc: "You have chosen Zak",
		img: ZakHead,
		bio: "Yer favrit lead singur and geeist. Will fuck you up with Jin from Tekken.",
	},
	Daniel: {
		formattedName: "Daniel",
		type: "Lead Guitar / Backing Vocalist",
		icon: GiGuitarHead,
		imgDesc: "You have chosen Dan",
		img: DanielHead,
		bio: "Certified guitar lead. Lafs at any sloit humorous interchange.",
	},
	Ben: {
		formattedName: "Ben",
		type: "Drums / Backing Vocalist",
		icon: GiDrumKit,
		imgDesc: "You have chosen Ben",
		img: BenHead,
		bio: "Luvs a bit of food. Will sleep anywhere guaranteed.",
	},
	Jordan: {
		formattedName: "Jordan",
		icon: GiGuitarBassHead,
		type: "Bass / Costume Enthusiast",
		imgDesc: "You have chosen Jordan",
		img: JordanHead,
		bio: "... bass?",
	},
} as const;

const defaultVals = {
	name: "Day Dreamers",
	bio: "From playing backyard gigs in the suburbs during their teens to now playing at some of Naarm's iconic bars and band rooms, Day dreamers have not only grown up together but so has their alternative garage rock sound. Influenced by the nostalgic sounds of the 90s and early 2000s imagery, Day Dreamers will have you feeling like you're playing Pro Skater with your cool older cousin on a summer's day. ",
};

export default function About() {
	const bandMemberEntries = Object.entries(bandMembers) as [
		BandMember,
		BandMemberDetails,
	][];

	const [selected, setSelected] = useState<null | BandMember>(null);

	return (
		<section className="about" id="about">
			<Y2kWindowShell closeButtonRedirect="/" navText="About">
				<div className="input-background">
					<div className="band-member-display">
						<div className="dropdown">
							<div className="list-label">Band Members</div>
							<div className="results-list">
								{bandMemberEntries.map(([name, details]) => (
									<button
										className={`${toKebabCase(name)}-band-member${selected === name ? " selected" : ""}`}
										key={name}
										onKeyDown={() => {
											setSelected(name);
										}}
										onMouseDown={() => {
											setSelected(name);
										}}
										type="button"
									>
										<span>{details.formattedName}</span>
										<details.icon />
									</button>
								))}
							</div>
						</div>
						<div className="icon-container">
							{bandMemberEntries.map(([name, details]) => (
								<img
									alt={details.imgDesc}
									className={`${toKebabCase(name)}-band-member`}
									key={name}
									src={details.img}
								/>
							))}
						</div>
					</div>
					<div className="bio-content">
						{selected !== null && selected in bandMembers ? (
							<div className={`${toKebabCase(selected)}-band-member bio`}>
								<h2>{bandMembers[selected].formattedName}</h2>
								<sub>{bandMembers[selected].type}</sub>
								<p>{bandMembers[selected].bio}</p>
							</div>
						) : (
							<div className="day-dreamers bio">
								<h2>{defaultVals.name}</h2>
								<p>{defaultVals.bio}</p>
							</div>
						)}
					</div>
					<div className="action-bar">
						<button type="button">
							<span> Set as Default</span>
						</button>
						<button onClick={() => setSelected(null)} type="button">
							<span>Cancel</span>
						</button>
					</div>
				</div>
			</Y2kWindowShell>
		</section>
	);
}
