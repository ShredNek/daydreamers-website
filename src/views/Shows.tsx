import { useEffect, useContext, useState } from "react";
import { getAllShows } from "../api/datoCmsCalls";
import { AllShowsEntity } from "../types/index";
import { returnFormattedArtistNames, toKebabCase } from "../helper/index.tsx";
import { useNavigate, useParams } from "react-router-dom";
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
import magnifyingGlass from "../assets/images/y2k-resources/magnifying_glass.png";
import { IoTriangleOutline } from "react-icons/io5";

export default function Shows() {
  const { showsData, setShowsData } = useContext(AppContext);
  let navigate = useNavigate();
  const params = useParams();

  const getTime = () =>
    new Date().toLocaleTimeString(undefined, {
      minute: "2-digit",
      hour: "numeric",
      hourCycle: "h12",
    });

  const [time, setTime] = useState(getTime());

  const callAndSetShowsData = async () => {
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

  const selectedShow =
    showsData?.data.allShows?.find(
      (show) => show.slugname === params.showSlug,
    ) ?? null;

  const desktopIcons: Array<{
    img: string;
    name: string;
    slugName: string;
    isShow: boolean;
  }> = [
    {
      img: myComputer,
      name: "My Computer",
      slugName: "my-computer",
      isShow: false,
    },
    {
      img: networkNeighborhood,
      name: "Network Neighborhood",
      slugName: "network-neighborhood",
      isShow: false,
    },
    {
      img: recycleBin,
      name: "Recycle Bin",
      slugName: "recycle-bin",
      isShow: false,
    },
    ...(showsData?.data.allShows?.map((show) => ({
      img: show.poster.url,
      name: show.title,
      slugName: show.slugname,
      isShow: true,
    })) ?? []),
  ];

  useEffect(() => {
    showsData === null && callAndSetShowsData();

    const interval = setInterval(() => {
      if (time !== getTime()) {
        setTime(() => getTime());
      }
    }, 5000);

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  return (
    <SiteWrapper sectionId="shows" className="shows">
      <Y2kWindowShell
        closeButtonRedirect="/shows"
        navText="Shows"
        className="shows-container">
        <div className="menu-icons-parent">
          {desktopIcons.map((icon, index) => (
            <a
              key={index}
              className="desktop-icon"
              onClick={() => {
                icon.isShow && navigate(`/shows/${toKebabCase(icon.name)}`);
              }}>
              <img src={icon.img} alt={icon.name} />
              <p>{icon.name}</p>
            </a>
          ))}
        </div>
        <div className="search-bar">
          <div className="start-and-search-icons">
            <button className="windows-start">
              <img src={windowsStart} alt="windows start logo" />
              <p>Start</p>
            </button>
            <div className="vertical-line" />
            <a className="search-icon" href="#">
              <img src={internetExplorer} alt="internet explorer" />
            </a>
            <a className="search-icon" href="#">
              <img src={desktop} alt="desktop" />
            </a>
            <a className="search-icon" href="#">
              <img src={channels} alt="channels" />
            </a>
            <div className="vertical-line" />
          </div>
          <div className="time-and-date">
            <a className="settings" href="#">
              <img src={timeAndDate} alt="time and date" />
            </a>
            <p className="time">{time}</p>
          </div>
        </div>
      </Y2kWindowShell>
      <Y2kWindowShell
        isModal
        closeButtonRedirect="/shows"
        className={`show-collection-window ${selectedShow ? "open" : ""}`}
        navText={selectedShow?.title ?? "nothing here :/"}>
        <div className="url-search-row">
          <div className="search-label">
            <p>Search URL</p>
            <span>
              <img src={magnifyingGlass} alt="Magnifying glass" />
            </span>
          </div>
          <div className="url">
            <p>{window.location.href}</p>
          </div>
        </div>
        <div className="info-grid">
          <div className="artwork">
            <img
              src={selectedShow?.poster.url}
              alt={selectedShow?.poster.filename}
            />
          </div>
          <div className="title-card">
            <h2>{selectedShow?.title}</h2>
            <hr />
            <ul>
              <li>
                <h4>performance date: </h4>
                <p>
                  {selectedShow?.datetime
                    ? new Date(selectedShow?.datetime).toLocaleDateString(
                        undefined,
                        {
                          minute: "2-digit",
                          hour: "numeric",
                          hourCycle: "h12",
                          hour12: true,
                        },
                      )
                    : "unknown"}
                </p>
              </li>
              <li>
                <h4>venue: </h4>
                <p>{selectedShow?.venue}</p>
              </li>
              <li>
                <h4>ticket price: </h4>
                <p>{selectedShow?.ticketprice}</p>
              </li>
            </ul>
            <a
              className="listen"
              href={selectedShow?.ticketslink}
              target="_blank">
              JOIN
            </a>
          </div>
          <div className="likes-dislikes">
            <span className="likes">
              <h4>:(</h4>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum,
                non.
              </p>
            </span>
            <span className="asterisks">* * * * *</span>
            <span className="dislikes">
              <h4>:D</h4>
              <p>
                {returnFormattedArtistNames(selectedShow?.artistnames ?? "") ??
                  "it's just us goofballs!"}
              </p>
            </span>
          </div>
          <div className="now-playing">
            <p className="title">Details released to the public...</p>
            <IoTriangleOutline />
            <div
              dangerouslySetInnerHTML={{
                __html: !!selectedShow?.details.trim()?.length
                  ? selectedShow?.details
                  : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque mollitia sunt amet animi, non praesentium.",
              }}
            />
          </div>
        </div>
      </Y2kWindowShell>
    </SiteWrapper>
  );
}
