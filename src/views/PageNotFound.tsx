import { Link } from "react-router-dom";
import LazyImage from "../components/LazyImage";
import Motivation from "../assets/images/misc/HQ_SuppawtiveDaeDrummeh.jpg";
import LQ_Motivation from "../assets/images/misc/LQ_SuppawtiveDaeDrummeh.jpg";

export default function PageNotFound() {
  return (
    <section id="page-not-found">
      <div id="site-backdrop" />
      <h1>404 ERROR</h1>
      <LazyImage
        lowQualitySrc={LQ_Motivation}
        highQualitySrc={Motivation}
        alt="All four day dreamers cheering you on, to help motivate your search for the right page"
      />
      <p>
        Hey bub. Looks like this page is unaccessible right now.{" "}
        <Link to={"/"} className="link orange-reroute">
          Click me to come home.
        </Link>
      </p>
      <br />
      <p>
        <strong>This page may be under maintenance,</strong> or has been
        shutdown by mutant monkeys via a sophisticated cyber attack. Either way,
        we're sorry to inconvenience you!
      </p>
      <br />
      <p>
        If this issue is bothering you, please reach out to us at
        <strong className="email"> daydreamersmusic2015@gmail.com</strong>
      </p>
    </section>
  );
}
