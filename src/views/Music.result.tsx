import { IoTriangleOutline } from "react-icons/io5";
import magnifyingGlass from "../assets/images/y2k-resources/magnifying_glass.png";
import Y2kWindowShell from "../components/Y2k/Y2kWindowShell.tsx";
import type { SongCollection, Track } from "../types/index.ts";
import "../styles/views/_music.scss";

export default function MusicResult({
	currentSongCollection,
}: {
	currentSongCollection: SongCollection | null;
}) {
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
		selectedRandTracks.randTrackOne =
			tempTrackList.splice(randInt(), 1)[0] ?? null;
		selectedRandTracks.randTrackTwo =
			tempTrackList.splice(randInt(), 1)[0] ?? null;

		if (selectedRandTracks.randTrackOne || selectedRandTracks.randTrackTwo) {
			console.warn(
				"selectedRandTracks.randTrackOne or selectedRandTracks.randTrackTwo is null",
			);
		}

		return selectedRandTracks;
	};

	const randTracks = getRandTracks();

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

	return (
		<Y2kWindowShell
			className={`song-collection-window ${currentSongCollection?.collectionType === "single" && "single"}`}
			closeButtonAction={{ redirectTo: "/music" }}
			isModal
			windowHeader={currentSongCollection?.name ?? "nothing here :/"}
		>
			<div className="url-search-row">
				<div className="search-label">
					<p>Search URL</p>
					<span>
						<img alt="Magnifying glass" src={magnifyingGlass} />
					</span>
				</div>
				<div className="url">
					<p>{window.location.href}</p>
				</div>
			</div>
			<div className="info-grid">
				<div className="artwork">
					<img
						alt={`Artwork for ${currentSongCollection?.name}`}
						src={currentSongCollection?.coverArt.url}
					/>
				</div>
				<div className="title-card">
					<h2>{currentSongCollection?.name}</h2>
					<hr />
					<ul>
						<li>
							<h4>release date:</h4> <p>{currentSongCollection?.releaseDate}</p>
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
								{currentSongCollection?.summary?.trim()?.length
									? currentSongCollection?.summary
									: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque mollitia sunt amet animi, non praesentium."}
							</p>
						</li>
					</ul>
					<a
						className="listen"
						href={currentSongCollection?.spotifyLink}
						rel="noreferrer"
						target="_blank"
					>
						LISTEN
					</a>
				</div>
				<div className="likes-dislikes">
					<span className="likes">
						<h4>:D</h4>
						<p>{currentSongCollection?.pros}</p>
					</span>
					<span className="asterisks">* * * * *</span>
					<span className="dislikes">
						<h4>:(</h4>
						<p>{currentSongCollection?.cons}</p>
					</span>
				</div>
				{currentSongCollection?.collectionType === "album" ||
				(currentSongCollection?.trackList.length ?? 0) > 1 ? (
					<>
						<div className="lyric-showcase-one">
							<h3 className="song-name">{randTracks.randTrackOne?.title}</h3>
							<hr />
							<p>
								{randTracks.randTrackOne?.lyrics.trim().length
									? randTracks.randTrackOne?.lyrics
											.replaceAll("\n\n", " - ")
											.replaceAll("\n", " - ")
									: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, enim. In velit itaque ex quas accusantium dolore eum ea voluptatum?"}
							</p>
							<div className="fade-overlay" />
						</div>
						<div className="lyric-showcase-two">
							<h3 className="song-name">{randTracks.randTrackTwo?.title}</h3>
							<hr />
							<p>
								{randTracks.randTrackTwo?.lyrics.trim().length
									? randTracks.randTrackTwo?.lyrics
											.replaceAll("\n\n", " - ")
											.replaceAll("\n", " - ")
									: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, enim. In velit itaque ex quas accusantium dolore eum ea voluptatum?"}
							</p>
							<div className="fade-overlay" />
						</div>
						<div className="now-playing">
							<p className="title">Featuring your favourite tracks...</p>
							<IoTriangleOutline />
							<p>
								{currentSongCollection?.trackList
									.map((t) => t.title)
									.join(", ")}
							</p>
						</div>
					</>
				) : (
					<div className="now-playing">
						<p className="title">Lyrics provided for your convenience...</p>
						<IoTriangleOutline />
						<p>{currentSongCollection?.trackList[0]?.lyrics}</p>
					</div>
				)}
			</div>
		</Y2kWindowShell>
	);
}
