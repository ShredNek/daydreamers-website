import { FaFacebookF, FaInstagram, FaSpotify, FaMusic } from "react-icons/fa6";
import { Link } from "react-router-dom";
import RoundedButtonLink from "../components/RoundedButtonLink";

const pageLinks = [
  { to: "/music", innerText: "Music" },
  { to: "/gigs", innerText: "Gigs" },
  { to: "/about", innerText: "About" },
  { to: "/merch", innerText: "Merch" },
  { to: "/media", innerText: "Media" },
];

export default function Home() {
  return (
    <section id="home">
      <div id="site-backdrop" />
      <div id="home-nav">
        <h1 className="outline-black heading white">Day Dreamers</h1>
        <nav id="page-routes">
          <ul>
            {pageLinks.map((link, index) => (
              <li key={index} className={index % 2 === 0 ? `hover v-1` : `hover v-2`}>
                <Link to={link.to}>{link.innerText}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <footer>
        <div className="social-links">
          <RoundedButtonLink imageChild={<FaFacebookF />} />
          <RoundedButtonLink imageChild={<FaInstagram />} />
          <RoundedButtonLink imageChild={<FaSpotify />} />
          <RoundedButtonLink imageChild={<FaMusic />} />
        </div>
        <ul>
          <li className="link-offsite ">Press Kit</li>
          <li className="link-offsite ">Contact Us</li>
        </ul>
        <p>
          <strong>© 2015-2023 Day Dreamers</strong>
        </p>
      </footer>
    </section>
  );
}
