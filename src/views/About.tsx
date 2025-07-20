import { useEffect, useState } from "react";
import { ComponentLoadingStatus } from "../types/index";
import NavHeader from "../components/NavHeader";
import Footer from "../components/Footer";
import SelectedBase from "../assets/images/hero/ChooseYourFighter_Base.png";
import SelectedZak from "../assets/images/hero/ChooseYourFighter_Zak.png";
import SelectedNick from "../assets/images/hero/ChooseYourFighter_Nick.png";
import SelectedDan from "../assets/images/hero/ChooseYourFighter_Dan.png";
import SelectedJordan from "../assets/images/hero/ChooseYourFighter_Jordan.png";
import {
  GiMicrophone,
  GiGuitarHead,
  GiGuitarBassHead,
  GiDrumKit,
} from "react-icons/gi";

type HandleIconHoverProps = { child: React.ReactNode }
const HandleIconHover = ({ child }: HandleIconHoverProps) => {
  return (
    <>
      <div className="vfx-underlay" />
      {child}
    </>
  )
}

type ImgDescriptions = { img: string, desc: string, person: string }[]

const imgDescriptions: ImgDescriptions = [
  {
    img: SelectedBase, desc: "A snap of those day dreaming boys playing N64", person: ""
  },
  {
    img: SelectedZak, desc: "You have chosen Zak", person: "zak"
  },
  {
    img: SelectedNick, desc: "You have chosen Nick", person: "nick"
  },
  {
    img: SelectedDan, desc: "You have chosen Dan", person: "dan"
  },
  {
    img: SelectedJordan, desc: "You have chosen Jordan", person: "jordan"
  },
]

export default function About() {
  return (
    <>
      <NavHeader
        linkToDisable="About"
      />
      <section className={`about`} id="about">
        <h1 className="large">Day Dreamers</h1>
        <div className="hero">
          {
            imgDescriptions.map(obj =>
              <img
                key={obj.person}
                className={obj.person}
                src={obj.img}
                alt={obj.desc}
              />
            )
          }

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
          Formed in late 2015, Day Dreamers
          are a Melbourne alt punk band influenced by 90's grunge, punk bands to
          the alternative Australian scene of today. Day Dreamers is made up of
          four members, Zak Rakitic, Nick Dordevic, Daniel Lee and Jordan Rakitic. The
          four have an energetic and fun presence on stage, involving the crowd
          and bringing in some (attempted) humour when they can.
        </p>
      </section>
      <Footer />
    </>
  );
}
