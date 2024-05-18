import { useEffect, useState, useContext } from "react";
import { getAllMusic } from "../api/datoCmsCalls";
import { toKebabCase } from "../helper";
import { ComponentLoadingStatus, SongCollectionData } from "../types/index";
import { useNavigate } from "react-router-dom";
import { FADE_SPEED } from "../utils/globals";
import NavHeader from "../components/NavHeader";
import { AppContext } from "../utils/AppContext";
import Footer from "../components/Footer";

export default function Gigs() {
  const [componentLoadingState, setComponentLoadingState] =
    useState<ComponentLoadingStatus>("transitioning static");
  const { songCollectionData, setSongCollectionData } = useContext(AppContext);
  let navigate = useNavigate();

  const handleCardClick = (gigSlug: string) => {
    setComponentLoadingState("transitioning static");
    setTimeout(() => navigate(`/gig/${gigSlug}`), FADE_SPEED);
  };

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
    <>
      <NavHeader
        linkToDisable="Music"
        transitionOnNavItemClick={setComponentLoadingState}
      />
      <section className={componentLoadingState} id="music">
        <div id="cards">
          {songCollectionData?.data.allSongCollections ? (
            songCollectionData.data.allSongCollections.map((collection) => (
              <div
                className="collection-card"
                key={collection.id}
                onClick={() => handleCardClick(toKebabCase(collection.name))}
              >
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
                Some cheeky geezah has probably taken all this down... if you
                see this error, reach out to us at
                daydreamersmusic2015@gmail.com!
              </p>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}
