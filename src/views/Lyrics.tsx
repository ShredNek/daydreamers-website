import { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllMusic } from "../api/datoCmsCalls";
import Footer from "../components/Footer";
import NavHeader from "../components/NavHeader";
import NotFoundError from "../components/NotFoundError";
import { toKebabCase } from "../helper/index.tsx";
import type { ComponentLoadingStatus, MusicData, Track } from "../types/index";
import { AppContext } from "../utils/AppContext";

export default function MusicView() {
	const [componentLoadingState, setComponentLoadingState] =
		useState<ComponentLoadingStatus>("transitioning static");
	const [currTrack, setCurrSong] = useState<Track | null>(null);
	const { songCollectionName, trackName } = useParams();
	const { musicData: songCollectionData, setMusicData: setSongCollectionData } =
		useContext(AppContext);

	// ? On page load

	const handleDataRender = useCallback(() => {
		setCurrSong(
			() =>
				songCollectionData?.data.allSongCollections
					.find(
						(songCollection) =>
							toKebabCase(songCollection.name) === songCollectionName,
					)
					?.trackList.find((track) => toKebabCase(track.title) === trackName) ??
				null,
		);
		setComponentLoadingState("");
	}, [
		songCollectionData?.data.allSongCollections,
		songCollectionName,
		trackName,
	]);

	// TODO - Make this call in the context instead
	const callAndSetData = useCallback(async () => {
		let rawData: MusicData | null = null;
		try {
			rawData = await getAllMusic();
		} catch (error) {
			throw Error(`getAllMusic API call failed - ${error}`);
		}

		if (rawData === null)
			throw Error("getAllMusic API call failed - rawData is null");

		setSongCollectionData(rawData);
	}, [setSongCollectionData]);

	// ? Effects

	useEffect(() => {
		if (!songCollectionData) callAndSetData();

		// ? This will always run as this is always null on load
		if (!currTrack) handleDataRender();
	}, [callAndSetData, currTrack, handleDataRender, songCollectionData]);

	return (
		<>
			<NavHeader className={componentLoadingState} />
			<section className={`lyric-view ${componentLoadingState}`}>
				<main>
					{currTrack ? (
						<>
							<h2>
								{" "}
								<a href={`/music/${songCollectionName}`}>
									{songCollectionName?.replace("-", " ")}
								</a>{" "}
								&gt; <span>{currTrack.title}</span>
							</h2>
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
