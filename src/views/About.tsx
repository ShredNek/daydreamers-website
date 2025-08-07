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
		icon: IconType;
		imgDesc: string;
		img: string;
		bio: string;
	}
> = {
	Zak: {
		name: "Zak",
		icon: GiMicrophone,
		imgDesc: "You have chosen Zak",
		img: ZakHead,
		bio: "Yer favrit lead singur and geeist. Will fuck you up with Jin from Tekken.",
	},
	Nick: {
		name: "Nick",
		icon: GiDrumKit,
		imgDesc: "You have chosen Nick",
		img: NickHead,
		bio: "Funny baby man who happens to drum liek a beast. Finger-dipping drinks is a treasured past-time.",
	},
	Jordan: {
		name: "Jordan",
		icon: GiGuitarBassHead,
		imgDesc: "You have chosen Jordan",
		img: JordanHead,
		bio: "... bass?",
	},
	Daniel: {
		name: "Daniel",
		icon: GiGuitarHead,
		imgDesc: "You have chosen Dan",
		img: DanielHead,
		bio: "Certified guitar lead. Lafs at any sloit humorous interchange.",
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

export default function About() {
	return (
		<SiteWrapper sectionId="about" className="about">
			{/* <h1 className="large">Day Dreamers</h1>
			<div className="hero">
				{imgDescriptions.map((obj) => (
					<img
						key={obj.person}
						className={obj.person}
						src={obj.img}
						alt={obj.desc}
					/>
				))}
			</div>
			<ul className="band-members">
				<li className="zak">
					<span>Zak Rakitic</span>
					<HandleIconHover child={<GiMicrophone />} />
					<span>Lead Vocal / Rhythm Guitar</span>
				</li>
				<li className="nick">
					<span>Nick Dordevic</span>
					<HandleIconHover child={<GiDrumKit />} />
					<span>Lead Vocal / Drums</span>
				</li>
				<li className="dan">
					<span>Daniel Lee</span>
					<HandleIconHover child={<GiGuitarHead />} />
					<span>Lead Guitar / Backing Vocals</span>
				</li>
				<li className="jordan">
					<span>Jordan Rakitic</span>
					<HandleIconHover child={<GiGuitarBassHead />} />
					<span>Bass Guitar</span>
				</li>
			</ul>
			<hr />
			<p>
				Formed in late 2015, Day Dreamers are a Melbourne alt punk band
				influenced by 90's grunge, punk bands to the alternative Australian
				scene of today. Day Dreamers is made up of four members, Zak Rakitic,
				Nick Dordevic, Daniel Lee and Jordan Rakitic. The four have an energetic
				and fun presence on stage, involving the crowd and bringing in some
				(attempted) humour when they can.
			</p> */}

			<Y2kWindowShell navText="About" closeButtonRedirect="/">
				<div className="input-background">
					<div className="band-member-display">
						<div className="dropdown">
							<div className="list-label">Band Members</div>
							<div className="results-list">
								{Object.entries(bandMembers).map(([k, v]) => (
									<a
										key={uuid()}
										href={`#${k}`}
										className={`${toKebabCase(k)}-band-member`}
									>
										{v.name} <v.icon />
									</a>
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
					<div className="action-bar">
						<button type="button">Set as Default</button>
						<button type="button">Cancel</button>
					</div>
				</div>
			</Y2kWindowShell>
			<div className="bio">
				<h2>Bio</h2>
				<p>
					Formed in late 2015, Day Dreamers are a Melbourne alt punk band
					influenced by 90's grunge, punk bands to the alternative Australian
					scene of today. Day Dreamers is made up of four members, Zak Rakitic,
					Nick Dordevic, Daniel Lee and Jordan Rakitic. The four have an
					energetic and fun presence on stage, involving the crowd and bringing
					in some (attempted) humour when they can.
				</p>
			</div>
		</SiteWrapper>
	);
}
