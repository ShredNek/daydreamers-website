import { useEffect, useState, useContext } from "react";
import { getAllMusic } from "../api/datoCmsCalls";
import { toKebabCase } from "../helper/index.tsx";
import { ComponentLoadingStatus, SongCollectionData } from "../types/index";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../utils/AppContext";
import SiteWrapper from "../SiteWrapper.tsx";

export default function Music() {
  const [componentLoadingState, setComponentLoadingState] =
    useState<ComponentLoadingStatus>("transitioning static");
  const { songCollectionData, setSongCollectionData } = useContext(AppContext);
  let navigate = useNavigate();

  const handleCardClick = (songSlug: string) => navigate(`/music/${songSlug}`);

  // ? On page load

  const callAndSetGigData = async () => {
    let rawData: SongCollectionData | null = null;
    try {
      rawData = await (await getAllMusic()).json();
    } catch (error) {
      throw Error(`getAllMusic API call failed - ${error}`);
    }

    if (rawData === null)
      throw Error("getAllMusic API call failed - rawData is null");
    setSongCollectionData(rawData);
  };

  useEffect(() => {
    songCollectionData === null
      ? callAndSetGigData()
      : setComponentLoadingState("");
  }, []);

  useEffect(() => {
    if (songCollectionData && Object.entries(songCollectionData).length) {
      setComponentLoadingState("");
    }
  }, [songCollectionData]);

  return (
    <SiteWrapper
      sectionId="music"
      className={`music-collection ${componentLoadingState}`}>
      {/* <div className="cards" id="cards">
        {songCollectionData?.data.allSongCollections ? (
          songCollectionData.data.allSongCollections.map((collection) => (
            <div
              className="collection-card"
              key={collection.id}
              onClick={() => handleCardClick(toKebabCase(collection.name))}>
              <div className="artwork">
                <img src={collection.coverArt?.url} alt="" />
              </div>
              <h2>{collection.name}</h2>
            </div>
          ))
        ) : (
          <div style={{ textAlign: "center" }}>
            <h2 style={{ paddingBottom: "1em" }}>
              No music to show at this time.
            </h2>
            <p>
              Some cheeky geezah has probably taken all this down... if you see
              this error, reach out to us at daydreamersmusic2015@gmail.com!
            </p>
          </div>
        )}
      </div> */}

      <div className="window-viewer-container">
        <div className="window-nav-header">
          <p>Open</p>
          <div className="window-action-buttons">
            <button>?</button>
            <button>X</button>
          </div>
        </div>
        <div className="search-parent">
          <div className="search-filters">
            <label htmlFor="search-results-input">Look in:</label>
            <input
              type="text"
              name="search-results-input"
              disabled
              placeholder="My Document"
            />
            <button>"Folder Up Icon"</button>
            <button>"New Folder Icon"</button>
            <button>"Change View Icon"</button>
            <button>"Change Sort Icon"</button>
          </div>
          <div className="search-results-window">
            <div className="search-results-actions">
              <label htmlFor="file-name"></label>
              <input type="text" name="file-name" />
              <button>
                <span className="file-shortcut-underline">O</span>pen
              </button>
              <button>
                <span className="file-shortcut-underline">C</span>ancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </SiteWrapper>
  );
}
