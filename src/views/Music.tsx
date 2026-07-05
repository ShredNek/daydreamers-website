import { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllMusic } from "../api/datoCmsCalls.ts";
import { toKebabCase } from "../helper/index.tsx";
import type { MusicData } from "../types/index.ts";
import { AppContext } from "../utils/AppContext.tsx";
import "../styles/views/_music.scss";
import { SUPER_SECRET_CODE } from "../utils/globals.ts";
import MusicResult from "./Music.result.tsx";
import MusicSearch from "./Music.search.tsx";

export default function Music() {
	const { musicData, setMusicData } = useContext(AppContext);
	const [musicSearchInput, setMusicSearchInput] = useState("");
	const urlParams = useParams();

	const handleSecretCodeAttempt = useCallback(
		(event: Event | React.FormEvent<HTMLInputElement | HTMLButtonElement>) => {
			const codeIsIncorrect = musicSearchInput !== SUPER_SECRET_CODE;
			const enterWasNotPressed = !(
				event instanceof KeyboardEvent && event.key === "Enter"
			);
			const buttonWasNotPressed = event.type !== "click";

			if (codeIsIncorrect || (enterWasNotPressed && buttonWasNotPressed)) {
				return;
			}

			console.log("Bingo!");
		},
		[musicSearchInput],
	);

	const currentSongCollection =
		musicData?.data.allSongCollections.find(
			(songCollection) =>
				toKebabCase(songCollection.name) === urlParams["songSlug"],
		) ?? null;

	// ? On page load
	const callAndSetMusicData = useCallback(async () => {
		let rawData: MusicData | null = null;
		try {
			rawData = await getAllMusic();
		} catch (error) {
			throw Error(`getAllMusic API call failed - ${JSON.stringify(error)}`);
		}

		if (rawData === null) {
			return;
		}

		setMusicData(rawData);
	}, [setMusicData]);

	useEffect(() => {
		void callAndSetMusicData();
	}, [callAndSetMusicData]);

	useEffect(() => {
		window.addEventListener("keydown", handleSecretCodeAttempt);
		return () => window.removeEventListener("keydown", handleSecretCodeAttempt);
	}, [handleSecretCodeAttempt]);

	return (
		<section className={"music-collection"} id="music">
			{currentSongCollection ? (
				<MusicResult
					{...{
						currentSongCollection,
					}}
				/>
			) : (
				<MusicSearch
					{...{
						handleSecretCodeAttempt,
						setMusicSearchInput,
						musicSearchInput,
						musicData,
					}}
				/>
			)}
		</section>
	);
}
