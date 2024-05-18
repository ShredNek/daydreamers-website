import { useContext, useEffect, useState, useRef } from "react";
import { getAllGigs } from "../api/datoCmsCalls";
import NavHeader from "../components/NavHeader";
import { useParams } from "react-router-dom";
import { AppContext } from "../utils/AppContext";
import NotFoundError from "../components/NotFoundError";
import { AllGigsEntity, Gig, ComponentLoadingStatus } from "../types";
import Pin from "../components/svg/Pin";
import Calendar from "../components/svg/Calendar";
import Ticket from "../components/svg/Ticket";
import {
  returnFormattedArtistNames,
  returnFormattedDate,
  toKebabCase,
  googleMapUrl
} from "../helper/index";

export default function GigView() {
  const [componentLoadingState, setComponentLoadingState] =
    useState<ComponentLoadingStatus>("transitioning static");
  const [currGig, setCurrGig] = useState<Gig | null>(null);
  const [scrollPosition, setScrollPosition] = useState(50);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const { id } = useParams();
  const { gigData, setGigData } = useContext(AppContext);

  // ? On page load

  const handleGigDataRender = () => {
    setCurrGig(
      () => gigData?.data.allGigs?.find((gig) => gig.slugname === id) ?? null
    );
    setComponentLoadingState("");
  };

  const callAndSetGigData = async () => {
    const rawData: AllGigsEntity = await (await getAllGigs()).json();
    const finalData: AllGigsEntity = {
      data: {
        ...rawData.data,
        allGigs:
          rawData.data.allGigs?.map((gig) => ({
            ...gig,
            slugname: toKebabCase(gig.title),
          })) ?? null,
      },
    };
    setGigData(finalData);
    setCurrGig(
      () => finalData.data.allGigs?.find((gig) => gig.slugname === id) ?? null
    );
    setComponentLoadingState("");
  };

  // ? Effects

  useEffect(() => {
    !gigData ? callAndSetGigData() : handleGigDataRender();

    const handleScroll = () => {
      if (!imgRef.current?.height) return;
      const windowHeight = window.innerHeight;
      const fullHeight = document.body.clientHeight;
      const scrolled = window.scrollY;

      const scrollPercentage =
        (scrolled / (fullHeight - windowHeight + imgRef.current?.height / 2)) *
        100 +
        40;
      setScrollPosition(() => scrollPercentage);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <NavHeader className={componentLoadingState} />
      {currGig?.gigposter.url ? (
        <div className={"poster-backdrop-parent"}>
          <img
            className={componentLoadingState}
            ref={imgRef}
            src={currGig.gigposter.url}
            alt={`A poster for the day dreamer gig titled ${currGig.title}`}
            style={{ objectPosition: `50% ${scrollPosition}%` }}
          />
        </div>
      ) : null}
      <section className={componentLoadingState} id="gig-view">
        <main>
          {currGig ? (
            <>
              <h1 className="large">{currGig.title}</h1>
              <h2>{returnFormattedArtistNames(currGig.artistnames)}</h2>
              <div id="sub-heading">
                <div>
                  <Calendar />
                  <p>{returnFormattedDate(currGig.datetime)}</p>
                </div>
                <div>
                  <Pin />
                  <p>{currGig.venue}</p>
                </div>
                <div>
                  <Ticket />
                  <p>{currGig.ticketprice}</p>
                </div>
              </div>
              <hr />
              <div>
                <a className="button" target="_blank" href={currGig.ticketslink}>Tickets</a>
                <a className="button" target="_blank" href={googleMapUrl(currGig.venuelocation)}>Location</a>
              </div>
              <hr />
              <div id="description-and-poster">
                <div className="details" dangerouslySetInnerHTML={{ __html: currGig.details }} />
                <div className="poster-parent">
                  <img
                    src={currGig.gigposter.url}
                    alt={`A poster for the day dreamer gig titled ${currGig.title}`}
                  />
                </div>
              </div>
            </>
          ) : (
            <NotFoundError />
          )}
        </main>
      </section>
    </>
  );
}
