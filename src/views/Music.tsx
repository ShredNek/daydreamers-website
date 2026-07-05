import { getAllMusic } from "@app/api/datoCmsCalls.ts";
import MusicResult from "@app/components/music/MusicResult.tsx";
import MusicSearch from "@app/components/music/MusicSearch.tsx";
import { toKebabCase } from "@app/helper/index.tsx";
import type { MusicData } from "@app/types/index.ts";
import { AppContext } from "@app/utils/AppContext.tsx";
import { SUPER_SECRET_CODE } from "@app/utils/globals.ts";
import { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "@app/styles/views/_music.scss";

export default function Music() {
	const { musicData, setMusicData, setSecretMusicDirectoryAccessed } =
		useContext(AppContext);
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
				return setSecretMusicDirectoryAccessed(false);
			}

			setSecretMusicDirectoryAccessed(true);
		},
		[musicSearchInput, setSecretMusicDirectoryAccessed],
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
