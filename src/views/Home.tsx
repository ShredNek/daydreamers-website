import { FaFacebookF, FaInstagram, FaSpotify, FaMusic } from "react-icons/fa6";
import RoundedButtonLink from "../components/RoundedButtonLink";

export default function Home() {
  return (
    <section>
      <div id="site-backdrop" />
      <div id="home-nav">
        <h1 className="outline black heading">Day Dreamers</h1>
        <nav id="page-routes">
          <ul>
            <li>Music</li>
            <li>Gigs</li>
            <li>About</li>
            <li>Merch</li>
            <li>Media</li>
          </ul>
        </nav>
      </div>
      <div id="footer">
        <div className="social-links">
          <RoundedButtonLink imageChild={<FaFacebookF />} />
          <RoundedButtonLink imageChild={<FaInstagram />} />
          <RoundedButtonLink imageChild={<FaSpotify />} />
          <RoundedButtonLink imageChild={<FaMusic />} />
        </div>
        <div>
          <a>Press Kit</a>
          <a>Contact Us</a>
        </div>
        <p>
          <strong>© 2015-2023 Day Dreamers</strong>
        </p>
      </div>
    </section>
  );
}
