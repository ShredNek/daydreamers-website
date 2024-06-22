import { useContext, useEffect, useState } from "react";
import {
  SongCollectionData,
  Track,
  ComponentLoadingStatus,
} from "../types/index";
import { getAllMusic } from "../api/datoCmsCalls";
import NavHeader from "../components/NavHeader";
import { useParams } from "react-router-dom";
import { AppContext } from "../utils/AppContext";
import NotFoundError from "../components/NotFoundError";
import { toKebabCase, } from "../helper/index.tsx";
import { useNavigate } from "react-router-dom";
import { FADE_SPEED } from "../utils/globals";
import Footer from "../components/Footer";

export default function MusicView() {
  const [componentLoadingState, setComponentLoadingState] =
    useState<ComponentLoadingStatus>("transitioning static");
  const [currTrack, setCurrSong] = useState<Track | null>(
    null
  );
  const { songCollectionName, trackName } = useParams();
  const { songCollectionData, setSongCollectionData } = useContext(AppContext);
  const navigate = useNavigate();

  const handleTrackClick = () => {
    setComponentLoadingState("transitioning static");
    setTimeout(
      () => navigate(`/music/${songCollectionName}`),
      FADE_SPEED
    );
  };

  // ? On page load

  const handleDataRender = () => {
    setCurrSong(() =>
      songCollectionData?.data.allSongCollections
        .find(songCollection => toKebabCase(songCollection.name) === songCollectionName)?.trackList
        .find(track => toKebabCase(track.title) === trackName) ?? null
    );
    setComponentLoadingState("");
  };

  // TODO - Make this call in the context instead
  const callAndSetData = async () => {
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

  // ? Effects

  useEffect(() => {
    if (!songCollectionData) callAndSetData();

    // ? This will always run as this is always null on load
    if (!currTrack) handleDataRender();
  }, []);

  useEffect(() => {
    !currTrack ? handleDataRender() : setComponentLoadingState("");
  }, [songCollectionData]);

  useEffect(() => {
    console.log(currTrack)
    currTrack ? setComponentLoadingState("") : setTimeout(() => setComponentLoadingState(""), 5000)
  }, [currTrack])

  return (
    <>
      <NavHeader className={componentLoadingState} />
      <section className={`lyric-view ${componentLoadingState}`}>
        <main>
          {currTrack ? (
            <>
              <h2> <a onClick={handleTrackClick}>{songCollectionName?.replace("-", " ")}</a> &gt; <span>{currTrack.title}</span></h2>
              <div className="lyric-text">
                <p>{currTrack.lyrics}</p>
                <div className="overlay"></div>
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
