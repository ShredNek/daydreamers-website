// ? Icons
import { FaFacebookF, FaInstagram, FaSpotify, FaMusic } from "react-icons/fa6";

// ? Images
import HQ_OfficialMerch from "../assets/images/HQ_OfficialMerchandiseStoreLogo.webp";
import LQ_OfficialMerch from "../assets/images/LQ_OfficialMerchandiseStoreLogo.webp";

// ? Component
import IconButton from "../components/IconButton";
import LazyImage from "../components/LazyImage";

// ? Style
import '../styles/components/_formal-footer.scss'

const policies = [
  { name: "Refund Policy", link: "#" },
  { name: "Shipping Policy", link: "#" },
  { name: "Privacy Policy", link: "#" },
];

export default function FormalFooter() {
  return (
    <footer id="formal-footer">
      <nav id="info">
        <div id="quick-links">
          <span>Quick Links</span>
          <ul>
            {policies.map((policy, index) => (
              <li key={`${policy.name}${index}`}>
                <a href={policy.link}>{policy.name}</a>
              </li>
            ))}
          </ul>
        </div>
        <div id="contact">
          <span>Keep up to date</span>
          <hr />
          <div className="merch-social-links">
            {/* 
              // ! I am not happy about what class I used
              // TODO - FIX THIS CLASS, AND THE OTHER 'SOCIAL LINKS' CLASS
          */}
            <IconButton Icon={<FaFacebookF />} />
            <IconButton Icon={<FaInstagram />} />
            <IconButton Icon={<FaSpotify />} />
            <IconButton Icon={<FaMusic />} />
          </div>
          <hr />
          <span>daydreamersmusic2015@gmail.com</span>
        </div>
        <div className="img-parent">
          <LazyImage
            lowQualitySrc={LQ_OfficialMerch}
            highQualitySrc={HQ_OfficialMerch}
            alt="This is the official merch page for Day Dreamers"
          />
        </div>
      </nav>
      <div id="copyright">
        <small>© 2023, Day Dreamers</small>
        <ul>
          {policies.map((policy, index) => (
            <li key={`${policy.name}${index}`}>
              <a href={policy.link}>{policy.name}</a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
