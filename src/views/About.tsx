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
import { v4 as uuid } from "uuid";
import AlienHead from "../assets/images/band-members/Alien_Head.png";
import BobsonDougnuttHead from "../assets/images/band-members/BobsonDougnutt_Head.png";
import DanielHead from "../assets/images/band-members/Daniel_HeadIcon.png";
import JordanHead from "../assets/images/band-members/Jordan_HeadIcon.png";
import LucyHead from "../assets/images/band-members/Lucy_HeadIcon.png";
import NickHead from "../assets/images/band-members/Nick_HeadIcon.png";
import ZakHead from "../assets/images/band-members/Zak_HeadIcon.png";

import Y2kWindowShell from "../components/Y2k/Y2kWindowShell.tsx";
import { toKebabCase } from "../helper/index.tsx";

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
	Lucy: {
		name: "Lucy",
		icon: GiDogBowl,
		type: "Bark inspector",
		imgDesc: "You have chosen Lucy",
		img: LucyHead,
		bio: "The goodest girl in the whole dang world. Faithful furry companion of Zak and Jordan.",
	},
	Alien: {
		name: "Alien",
		type: "Pizza time initiator",
		icon: GiAlienStare,
		imgDesc: "You have chosen Brock",
		img: AlienHead,
		bio: "Friendly neighborhood alien man thing. Loves sharing free pizza on cliff sides with men in suits.",
	},
	BobsonDougnutt: {
		name: "Bobson Dougnutt",
		type: "Baseball specialist",
		icon: GiBaseballGlove,
		imgDesc: "You have chosen Bobson Dougnutt",
		img: BobsonDougnuttHead,
		bio: "When the world said no he also said no back. When his feet touch the plate the earths heart attacks.",
	},
};

const defaultVals = {
	name: "Day Dreamers",
	bio: "From playing backyard gigs in the suburbs during their teens to now playing at some of Naarm's iconic bars and band rooms, Day dreamers have not only grown up together but so has their alternative garage rock sound. Influenced by the nostalgic sounds of the 90s and early 2000s imagery, Day Dreamers will have you feeling like you're playing Pro Skater with your cool older cousin on a summer's day. ",
};

export default function About() {
	const bandMemberEntries = Object.entries(bandMembers);

	return (
		<section className="about" id="about">
			<Y2kWindowShell closeButtonRedirect="/" navText="About">
				<div className="input-background">
					<div className="band-member-display">
						<div className="dropdown">
							<div className="list-label">Band Members</div>
							<div className="results-list">
								{bandMemberEntries.map(([k, v]) => (
									<button
										className={`${toKebabCase(k)}-band-member`}
										key={uuid()}
										type="button"
									>
										<span>{v.name}</span>
										<v.icon />
									</button>
								))}
							</div>
						</div>
						<div className="icon-container">
							{bandMemberEntries.map(([k, v]) => (
								<img
									alt={v.imgDesc}
									className={`${toKebabCase(k)}-band-member`}
									key={uuid()}
									src={v.img}
								/>
							))}
						</div>
					</div>
					<div className="bio-content">
						{bandMemberEntries.map(([k, v]) => (
							<div className={`${toKebabCase(k)}-band-member bio`} key={k}>
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
						<button type="button">
							<span> Set as Default</span>
						</button>
						<button type="button">
							<span>Cancel</span>
						</button>
					</div>
				</div>
			</Y2kWindowShell>
		</section>
	);
}
