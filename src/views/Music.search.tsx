import type React from "react";
import { useNavigate } from "react-router-dom";
import Y2kWindowSearch from "../components/Y2k/Y2kWindowSearch.tsx";
import Y2kWindowShell from "../components/Y2k/Y2kWindowShell.tsx";
import { toKebabCase } from "../helper/index.tsx";
import type { MusicData } from "../types/index.ts";
import "../styles/views/_music.scss";

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
	const navigate = useNavigate();

	return (
		<Y2kWindowShell closeButtonAction={{ redirectTo: "/" }} windowHeader="Open">
			<Y2kWindowSearch
				onHandleSearchSubmitAction={handleSecretCodeAttempt}
				onSearchInput={(e) => setMusicSearchInput(e.currentTarget.value)}
				searchInput={musicSearchInput}
			>
				{musicData?.data.allSongCollections ? (
					musicData.data.allSongCollections.map((collection) => (
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
	);
}
