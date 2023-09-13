import { FaFacebookF, FaInstagram, FaSpotify, FaMusic } from "react-icons/fa6";
import { Link } from "react-router-dom";
import RoundedButtonLink from "../components/RoundedButtonLink";

export default function Home() {

  return (
    <section>
      <div id="site-backdrop" />
      <div id="home-nav">
        <h1 className="outline-black heading white">Day Dreamers</h1>
        <nav id="page-routes">
          <ul>
            <li><Link to="/music">Music</Link></li>
            <li><Link to="/gigs">Gigs</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/merch">Merch</Link></li>
            <li><Link to="/media">Media</Link></li>
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
        <ul>
          <li className="link-offsite ">Press Kit</li>
          <li className="link-offsite ">Contact Us</li>
        </ul>
        <p>
          <strong>© 2015-2023 Day Dreamers</strong>
        </p>
      </div>
    </section>
  );
}
