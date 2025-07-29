import { useEffect, useContext } from "react";
import { getAllShows } from "../api/datoCmsCalls";
import { AllShowsEntity } from "../types/index";
import { toKebabCase } from "../helper/index.tsx";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../utils/AppContext";
import SiteWrapper from "../SiteWrapper.tsx";
import Y2kWindowShell from "../components/Y2k/Y2kWindowShell.tsx";

import myComputer from "../assets/images/y2k-resources/computer-explorer.png";
import networkNeighborhood from "../assets/images/y2k-resources/network.png";
import recycleBin from "../assets/images/y2k-resources/recycle-bin.png";
import windowsStart from "../assets/images/y2k-resources/windows.png";
import internetExplorer from "../assets/images/y2k-resources/internet-explorer.png";
import desktop from "../assets/images/y2k-resources/desktop.png";
import channels from "../assets/images/y2k-resources/channels.png";
import timeAndDate from "../assets/images/y2k-resources/time_and_date.png";

export default function Shows() {
  const { showsData, setShowsData } = useContext(AppContext);
  let navigate = useNavigate();

  // ? On page load

  const callAndSetGigData = async () => {
    let rawData: AllShowsEntity | null = null;
    try {
      rawData = await (await getAllShows()).json();

      if (rawData !== null && rawData.errors !== undefined) {
        throw Error(rawData.errors.map((e) => e.message).join(", "));
      }
    } catch (error) {
      throw Error(`getAllPosts API call failed - ${error}`);
    }

    if (rawData === null) {
      throw Error("getAllPosts API call failed - rawData is null");
    }

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
    setShowsData(finalData);
  };

  const desktopIcons: Array<{ img: string; name: string }> = [
    {
      img: myComputer,
      name: "My Computer",
    },
    {
      img: networkNeighborhood,
      name: "Network Neighborhood",
    },
    {
      img: recycleBin,
      name: "Recycle Bin",
    },
    ...(showsData?.data.allShows?.map((show) => ({
      img: show.poster.url,
      name: show.title,
    })) ?? []),
  ];

  useEffect(() => {
    showsData === null && callAndSetGigData();
  }, []);

  return (
    <SiteWrapper sectionId="gigs">
      {/* <div id="cards">
        {gigData?.data.allGigs ? (
          gigData.data.allGigs.map((gig) => (
            <div className="gig-card" key={gig.id}>
              <div
                className="body"
                onClick={() => navigate(`/gig/${gig.slugname}`)}>
                <div className="gig-details">
                  <h2>{gig.title}</h2>
                  <h3>{returnFormattedArtistNames(gig.artistnames)}</h3>
                  <div>
                    <Calendar />
                    <p>{returnFormattedDate(gig.datetime)}</p>
                  </div>
                  <div>
                    <Pin />
                    <p>{gig.venue}</p>
                  </div>
                  <div>
                    <Ticket />
                    <p>{gig.ticketprice}</p>
                  </div>
                  <div>
                    <a
                      className="button"
                      target="_blank"
                      href={gig.ticketslink}>
                      Tickets
                    </a>
                  </div>
                </div>
                <div className="poster-parent">
                  <img src={gig.gigposter.url} />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div style={{ textAlign: "center" }}>
            <h2 style={{ paddingBottom: "1em" }}>No gigs at this time.</h2>
            <p>
              check back in later, or reach out if you want a band for your
              cousin's 10th birthday party!
            </p>
          </div>
        )}
      </div> */}

      <Y2kWindowShell navText="Shows" className="shows-container">
        <div className="menu-icons-parent">
          {desktopIcons.map((icon, index) => (
            <a key={index} className="desktop-icon">
              <img src={icon.img} alt={icon.name} />
              <p>{icon.name}</p>
            </a>
          ))}
        </div>
        <div className="search-bar">
          <button>Start</button>
        </div>
      </Y2kWindowShell>
    </SiteWrapper>
  );
}
