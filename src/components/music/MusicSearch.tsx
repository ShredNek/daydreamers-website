import MusicSecretDirectory from "@app/components/music/MusicSecretDirectory.tsx";
import Y2kWindowSearch from "@app/components/Y2k/Y2kWindowSearch.tsx";
import Y2kWindowShell from "@app/components/Y2k/Y2kWindowShell.tsx";
import { toKebabCase } from "@app/helper/index.tsx";
import type { MusicData } from "@app/types/index.ts";
import { AppContext } from "@app/utils/AppContext.tsx";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import "@app/styles/views/_music.scss";
import { SUPER_SECRET_REDIRECT } from "@app/utils/globals.ts";
import OhNoBamboozleTime from "../modals/OhNoBamoozleTime.tsx";

export default function MusicSearch({
	handleSecretCodeAttempt,
	setMusicSearchInput,
	musicSearchInput,
	musicData,
}: {
	handleSecretCodeAttempt: React.FormEventHandler<
		HTMLInputElement | HTMLButtonElement
	>;
	setMusicSearchInput: React.Dispatch<React.SetStateAction<string>>;
	musicSearchInput: string;
	musicData: MusicData | null;
}) {
	const { secretMusicDirectoryAccessed, setDialogContent } =
		useContext(AppContext);
	const navigate = useNavigate();

	const SecretDirectory = secretMusicDirectoryAccessed && (
		<MusicSecretDirectory
			onClick={() => {
				window.open(SUPER_SECRET_REDIRECT, "_blank");
				setDialogContent(<OhNoBamboozleTime />);
			}}
		/>
	);

	const MusicCollection = musicData?.data.allSongCollections.map(
		(collection) => (
			<button
				className="result"
				key={collection.id}
				onClick={() => navigate(`/music/${toKebabCase(collection.name)}`)}
				type="button"
			>
				<div className="artwork">
					<img alt="" src={collection.coverArt?.url} />
				</div>
				<p className="result-name">{collection.name}</p>
			</button>
		),
	);

	const NoResults = (
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
	);

	return (
		<Y2kWindowShell closeButtonAction={{ redirectTo: "/" }} windowHeader="Open">
			<Y2kWindowSearch
				onHandleSearchSubmitAction={handleSecretCodeAttempt}
				onSearchInput={(e) => setMusicSearchInput(e.currentTarget.value)}
				searchInput={musicSearchInput}
			>
				{SecretDirectory || MusicCollection || NoResults}
			</Y2kWindowSearch>
		</Y2kWindowShell>
	);
}
