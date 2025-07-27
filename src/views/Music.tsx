import { useEffect, useState, useContext } from "react";
import { getAllMusic } from "../api/datoCmsCalls";
import { toKebabCase } from "../helper/index.tsx";
import { MusicData } from "../types/index";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../utils/AppContext";
import SiteWrapper from "../SiteWrapper.tsx";
import newFolder from "../assets/images/y2k-resources/new-folder_active.png";
import changeSort from "../assets/images/y2k-resources/window-filter-sort.png";
import changeDisplay from "../assets/images/y2k-resources/window-filter-display.png";
import { IoTriangleSharp } from "react-icons/io5";

export default function Music() {
  const { musicData, setMusicData } = useContext(AppContext);
  let navigate = useNavigate();

  const handleCardClick = (songSlug: string) => navigate(`/music/${songSlug}`);

  // ? On page load

  const callAndSetMusicData = async () => {
    let rawData: MusicData | null = null;
    try {
      rawData = await (await getAllMusic()).json();
    } catch (error) {
      throw Error(`getAllMusic API call failed - ${JSON.stringify(error)}`);
    }

    if (rawData === null) {
      return;
    }

    setMusicData(rawData);
  };

  useEffect(() => {
    callAndSetMusicData();
  }, []);

  return (
    <SiteWrapper sectionId="music" className={"music-collection"}>
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
            <label htmlFor="search-results-input">
              Look <span className="file-shortcut-underline">i</span>n:
            </label>
            <div className="search-input-combo">
              <input
                type="text"
                name="search-results-input"
                id="search-results-input"
                disabled
                placeholder="My Music"
              />
              <button className="dropdown-arrow">
                <IoTriangleSharp />
              </button>
            </div>
            <button>
              <img src={newFolder} alt="New folder icon" />
            </button>
            <button>
              <img src={changeDisplay} alt="Change display" />
            </button>
            <button>
              <img src={changeSort} alt="Change sort" />
            </button>
          </div>
          <main className="search-results-window">
            {musicData?.data.allSongCollections ? (
              musicData.data.allSongCollections.map((collection) => (
                <div
                  className="result"
                  key={collection.id}
                  onClick={() => handleCardClick(toKebabCase(collection.name))}>
                  <div className="artwork">
                    <img src={collection.coverArt?.url} alt="" />
                  </div>
                  <p className="result-name">{collection.name}</p>
                </div>
              ))
            ) : (
              <div className="no-results">
                <p className="header-text">This folder is empty.</p>
                <div className="sub-content">
                  <p>Some cheeky geezah has probably taken all this down...</p>
                  <p>
                    if you see this error, reach out to us at
                    daydreamersmusic2015@gmail.com!
                  </p>
                </div>
              </div>
            )}
          </main>
          <div className="search-results-actions">
            <label htmlFor="file-name">
              File <span className="file-shortcut-underline">n</span>ame:
            </label>
            <input disabled type="text" name="file-name" id="file-name" />
            <div className="action-buttons">
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
