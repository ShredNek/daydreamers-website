import { useContext, useEffect, useState, useRef } from "react";
import { getAllShows } from "../api/datoCmsCalls";
import NavHeader from "../components/NavHeader";
import { useParams } from "react-router-dom";
import { AppContext } from "../utils/AppContext";
import NotFoundError from "../components/NotFoundError";
import { AllShowsEntity, Show, ComponentLoadingStatus } from "../types";
import Pin from "../components/svg/Pin";
import Calendar from "../components/svg/Calendar";
import Ticket from "../components/svg/Ticket";
import {
  returnFormattedArtistNames,
  returnFormattedDate,
  toKebabCase,
  googleMapUrl,
} from "../helper/index.tsx";

export default function GigView() {
  const [componentLoadingState, setComponentLoadingState] =
    useState<ComponentLoadingStatus>("transitioning static");
  const [currGig, setCurrGig] = useState<Show | null>(null);
  const [scrollPosition, setScrollPosition] = useState(50);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const { id } = useParams();
  const { showsData: gigData, setShowsData: setGigData } =
    useContext(AppContext);

  // ? On page load

  const handleGigDataRender = () => {
    setCurrGig(
      () => gigData?.data.allShows?.find((gig) => gig.slugname === id) ?? null,
    );
    setComponentLoadingState("");
  };

  const callAndSetGigData = async () => {
    const rawData: AllShowsEntity = await (await getAllShows()).json();
    const finalData: AllShowsEntity = {
      data: {
        ...rawData.data,
        allShows:
          rawData.data.allShows?.map((gig) => ({
            ...gig,
            slugname: toKebabCase(gig.title),
          })) ?? null,
      },
    };
    setGigData(finalData);
    setCurrGig(
      () => finalData.data.allShows?.find((gig) => gig.slugname === id) ?? null,
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
      {currGig?.poster.url ? (
        <div className={"poster-backdrop-parent"}>
          <img
            className={componentLoadingState}
            ref={imgRef}
            src={currGig.poster.url}
            alt={`A poster for the day dreamer gig titled ${currGig.title}`}
            style={{ objectPosition: `50% ${scrollPosition}%` }}
          />
        </div>
      ) : null}
      <section className={componentLoadingState} id="gig-view">
        <main>
          {currGig ? (
            <>
              <h1>{currGig.title}</h1>
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
                <a
                  className="button"
                  target="_blank"
                  href={currGig.ticketslink}>
                  Tickets
                </a>
                <a
                  className="button"
                  target="_blank"
                  href={googleMapUrl(currGig.venuelocation)}>
                  Location
                </a>
              </div>
              <hr />
              <div id="description-and-poster">
                <div
                  className="details"
                  dangerouslySetInnerHTML={{ __html: currGig.details }}
                />
                <div className="poster-parent">
                  <img
                    src={currGig.poster.url}
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
