import { useContext, useEffect, useState } from "react";
import {
  MusicData,
  SongCollection,
  ComponentLoadingStatus,
  Track,
} from "../types/index";
import { getAllMusic } from "../api/datoCmsCalls";
import NavHeader from "../components/NavHeader";
import { useParams } from "react-router-dom";
import { AppContext } from "../utils/AppContext";
import NotFoundError from "../components/NotFoundError";
import {
  toKebabCase,
  returnFormattedDate,
  convertNumberToThreeDigits,
  secondsToTimeString,
} from "../helper/index.tsx";
import Footer from "../components/Footer";
import sunSpacer from "../assets/images/misc/favicon.svg";
import { FaSpotify, FaMusic, FaEllipsis } from "react-icons/fa6";
import { FADE_SPEED } from "../utils/globals";
import { useNavigate } from "react-router-dom";

export default function MusicView() {
  const [musicCollection, setMusicCollection] = useState<SongCollection | null>(
    null,
  );
  const { songCollectionName } = useParams();
  const { musicData: songCollectionData, setMusicData: setSongCollectionData } =
    useContext(AppContext);
  const navigate = useNavigate();

  const handleTrackClick = (trackName: string) => {
    // setComponentLoadingState("transitioning static");
    setTimeout(
      () => navigate(`/music/${songCollectionName}/lyrics/${trackName}`),
      FADE_SPEED,
    );
  };

  // ? On page load

  const handleGigDataRender = () => {
    setMusicCollection(
      () =>
        songCollectionData?.data.allSongCollections.find(
          (songCollection) =>
            toKebabCase(songCollection.name) === songCollectionName,
        ) ?? null,
    );
  };

  // TODO - Make this call in the context instead
  const callAndSetGigData = async () => {
    let rawData: MusicData | null = null;
    try {
      rawData = await (await getAllMusic()).json();
    } catch (error) {
      throw Error(`getAllMusic API call failed - ${error}`);
    }

    if (rawData === null) {
      return;
    }
    setSongCollectionData(rawData);
  };

  // ? Effects

  useEffect(() => {
    if (!songCollectionData) callAndSetGigData();
    if (!musicCollection) handleGigDataRender();
  }, []);

  return (
    <>
      <NavHeader className="" />
      <section className={`music-collection view`}>
        <main>
          {musicCollection ? (
            <>
              <div className="image-and-collection">
                <div className="img-parent">
                  <div>
                    <img
                      src={musicCollection.coverArt.url}
                      alt={`An image of the music collection ${musicCollection.name} from Day Dreamers`}
                    />
                  </div>
                </div>
                <div className="music-collection-details">
                  <h2>{musicCollection.name}</h2>
                  <div className="date-and-collection-type">
                    <p>{musicCollection.collectionType}</p>
                    <img className="sun-spacer" src={sunSpacer} />
                    <p>
                      {returnFormattedDate(
                        new Date(musicCollection.releaseDate).toDateString(),
                        { includeDay: false, includeTime: false },
                      )}
                    </p>
                  </div>
                  <div className="links">
                    <a
                      className="spotify-link"
                      href={musicCollection.spotifyLink}
                      target="_blank"
                      rel="noopener noreferrer">
                      <FaSpotify />
                      <p>Spotify</p>
                    </a>
                    <a
                      className="apple-link"
                      href={musicCollection.appleMusicLink}
                      target="_blank"
                      rel="noopener noreferrer">
                      <FaMusic />
                      <p>Apple</p>
                    </a>
                    <a
                      className="other-music-link"
                      href={musicCollection.otherViewsLink}
                      target="_blank"
                      rel="noopener noreferrer">
                      <FaEllipsis />
                      <p>Other</p>
                    </a>
                  </div>
                </div>
              </div>
              <div className="track-list-items">
                <ol>
                  {musicCollection.trackList.map((track: Track, index) => (
                    <li key={track.id}>
                      <span className="track-number">
                        #{convertNumberToThreeDigits(index + 1)}
                      </span>
                      <span className="track-title">{track.title}</span>
                      {track.lyrics.length > 1 ? (
                        <a
                          className="track-lyrics-anchor"
                          onClick={() =>
                            handleTrackClick(toKebabCase(track.title))
                          }>
                          Lyrics
                        </a>
                      ) : (
                        <br />
                      )}
                      <span className="track-duration">
                        {secondsToTimeString(Number(track.duration))}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </>
          ) : (
            <NotFoundError />
          )}
        </main>
      </section>
      <Footer />
    </>
  );
}
