import { useEffect, useContext, useState } from "react";
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

  const getTime = () =>
    new Date().toLocaleTimeString(undefined, {
      minute: "2-digit",
      hour: "numeric",
      hourCycle: "h12",
    });

  const [time, setTime] = useState(getTime());

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

    const interval = setInterval(() => {
      if (time !== getTime()) {
        setTime(() => getTime());
      }
    }, 5000);

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  return (
    <SiteWrapper sectionId="gigs">
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
    </SiteWrapper>
  );
}
