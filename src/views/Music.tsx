import { useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllMusic } from "../api/datoCmsCalls";
import { toKebabCase } from "../helper/index.tsx";
import { MusicData, Track } from "../types/index";
import { AppContext } from "../utils/AppContext";
import SiteWrapper from "../SiteWrapper.tsx";
import Y2kWindowShell from "../components/Y2k/Y2kWindowShell.tsx";
import Y2kWindowSearch from "../components/Y2k/Y2kWindowSearch.tsx";
import { IoTriangleOutline } from "react-icons/io5";
import magnifyingGlass from "../assets/images/y2k-resources/magnifying_glass.png";

import "../styles/views/_music.scss";

export default function Music() {
  const { musicData, setMusicData } = useContext(AppContext);
  const navigate = useNavigate();
  const urlParams = useParams();

  const currentSongCollection =
    musicData?.data.allSongCollections.find(
      (songCollection) =>
        toKebabCase(songCollection.name) === urlParams.songSlug,
    ) ?? null;

  type RandTracks = {
    randTrackOne: null | Track;
    randTrackTwo: null | Track;
  };

  const getRandTracks = (): RandTracks => {
    const selectedRandTracks: RandTracks = {
      randTrackOne: null,
      randTrackTwo: null,
    };

    if (
      !currentSongCollection?.trackList ||
      currentSongCollection.trackList.length < 2
    ) {
      return selectedRandTracks;
    }

    const tempTrackList = [
      ...currentSongCollection.trackList.filter(
        (t) => t.lyrics.trim().length > 0,
      ),
    ];

    const randInt = () => Math.floor(Math.random() * tempTrackList.length);
    selectedRandTracks.randTrackOne = tempTrackList.splice(randInt(), 1)[0];
    selectedRandTracks.randTrackTwo = tempTrackList.splice(randInt(), 1)[0];

    return selectedRandTracks;
  };

  const randTracks = getRandTracks();

  const handleCardClick = (songSlug: string) => navigate(`/music/${songSlug}`);

  function formatDuration(secondsInput: number): string {
    const hours = Math.floor(secondsInput / 3600);
    const minutes = Math.floor((secondsInput % 3600) / 60);
    const seconds = Math.floor(secondsInput % 60);

    const pad = (num: number) => num.toString().padStart(2, "0");

    if (hours > 0) {
      return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    } else {
      return `${pad(minutes)}:${pad(seconds)}`;
    }
  }

  // ? On page load

  const callAndSetMusicData = async () => {
    let rawData: MusicData | null = null;
    try {
      rawData = (await (await getAllMusic()).json()) as MusicData | null;
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
    <>
      <SiteWrapper sectionId="music" className={"music-collection"}>
        <Y2kWindowShell navText="Open">
          <Y2kWindowSearch>
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
          </Y2kWindowSearch>
        </Y2kWindowShell>
      </SiteWrapper>
      <Y2kWindowShell
        isModal
        className={`song-collection-window ${currentSongCollection ? "open" : ""}`}
        navText={currentSongCollection?.name ?? "nothing here :/"}>
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
              src={currentSongCollection?.coverArt.url}
              alt={`Artwork for ${currentSongCollection?.name}`}
            />
          </div>
          <div className="title-card">
            <h2>{currentSongCollection?.name}</h2>
            <hr />
            <ul>
              <li>
                <h4>release date:</h4>{" "}
                <p>{currentSongCollection?.releaseDate}</p>
              </li>
              <li>
                <h4>{currentSongCollection?.collectionType} length:</h4>{" "}
                <p>
                  {formatDuration(Number(currentSongCollection?.duration) ?? 0)}
                </p>
              </li>
              <li>
                <h4>summary:</h4>
                <p>
                  {!!currentSongCollection?.summary?.trim()?.length
                    ? currentSongCollection?.summary
                    : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque mollitia sunt amet animi, non praesentium."}
                </p>
              </li>
            </ul>
            <a
              className="listen"
              href={currentSongCollection?.spotifyLink}
              target="_blank">
              LISTEN
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
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum,
                non.
              </p>
            </span>
          </div>
          <div className="lyric-showcase-one">
            <h3 className="song-name">{randTracks.randTrackOne?.title}</h3>
            <hr />
            <p>
              {!!randTracks.randTrackOne?.lyrics.trim().length
                ? randTracks.randTrackOne?.lyrics
                    .replaceAll("\n\n", " - ")
                    .replaceAll("\n", " - ")
                : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, enim. In velit itaque ex quas accusantium dolore eum ea voluptatum?"}
            </p>
          </div>
          <div className="lyric-showcase-two">
            <h3 className="song-name">{randTracks.randTrackTwo?.title}</h3>
            <hr />
            <p>
              {!!randTracks.randTrackTwo?.lyrics.trim().length
                ? randTracks.randTrackTwo?.lyrics
                    .replaceAll("\n\n", " - ")
                    .replaceAll("\n", " - ")
                : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, enim. In velit itaque ex quas accusantium dolore eum ea voluptatum?"}
            </p>
          </div>
          <div className="now-playing">
            <p className="title">Featuring your favourite tracks...</p>
            <IoTriangleOutline />
            <p>
              {currentSongCollection?.trackList.map((t) => t.title).join(", ")}
            </p>
          </div>
        </div>
      </Y2kWindowShell>
    </>
  );
}
