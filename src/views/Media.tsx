import "react-toastify/dist/ReactToastify.css";
import { useEffect, useRef, useState } from "react";
import {
	FaBackwardFast,
	FaBandcamp,
	FaCircle,
	FaCode,
	FaFacebookF,
	FaForwardFast,
	FaInstagram,
	FaMusic,
	FaPause,
	FaPlay,
	FaRecordVinyl,
	FaSpotify,
	FaSquare,
	FaTiktok,
	FaYoutube,
} from "react-icons/fa6";
import { IoTriangleSharp } from "react-icons/io5";
import TripleJ from "../components/svg/TripleJ";
import Y2kWindowShell from "../components/Y2k/Y2kWindowShell";
import type { LinkType } from "../types";
import { SOCIAL_LINKS } from "../utils/globals";

export default function Media() {
	const [media, setMedia] = useState<{
		trackState: "playing" | "paused";
		currentSocial: LinkType;
		scrubX: number;
	}>({ trackState: "paused", currentSocial: "album", scrubX: 0 });

	const trackLineRef = useRef<HTMLDivElement>(null);
	const scrubberRef = useRef<HTMLButtonElement>(null);
	const isDraggingRef = useRef(false);

	const isLinkType = (value: string): value is LinkType =>
		SOCIAL_LINKS.some((v) => v.linkType === value);

	const handleSkipButtonClick = (newIndex: number) => {
		const newSocial =
			SOCIAL_LINKS[
				SOCIAL_LINKS.findIndex(
					(social) => social.linkType === media.currentSocial,
				) + newIndex
			]?.linkType;

		setMedia((prev) => ({
			...prev,
			currentSocial: newSocial ?? prev.currentSocial,
			scrubX: 0,
			trackState: "paused",
		}));
	};

	useEffect(() => {
		const getClientX = (e: MouseEvent | TouchEvent): number => {
			if ("touches" in e) {
				const touch = e.touches[0] || e.changedTouches[0];
				return touch ? touch.clientX : 0;
			}
			return e.clientX;
		};

		const handleMove = (e: MouseEvent | TouchEvent) => {
			if (!isDraggingRef.current || !trackLineRef.current) return;

			const trackRect = trackLineRef.current.getBoundingClientRect();
			const newX = getClientX(e) - trackRect.left;
			const clampedX = Math.max(0, Math.min(newX, trackRect.width));
			setMedia((prev) => ({ ...prev, scrubX: clampedX, trackState: "paused" }));
		};

		const stopDrag = () => {
			isDraggingRef.current = false;
		};

		window.addEventListener("mousemove", handleMove);
		window.addEventListener("mouseup", stopDrag);
		window.addEventListener("touchmove", handleMove, { passive: false });
		window.addEventListener("touchend", stopDrag);

		return () => {
			window.removeEventListener("mousemove", handleMove);
			window.removeEventListener("mouseup", stopDrag);
			window.removeEventListener("touchmove", handleMove);
			window.removeEventListener("touchend", stopDrag);
		};
	}, []);

	useEffect(() => {
		if (media.trackState !== "playing" || !trackLineRef.current) return;

		const TRACK_DURATION_IN_SECONDS = 10;

		let animationFrameId: number;
		let lastTime = performance.now();

		const trackWidth = trackLineRef.current.getBoundingClientRect().width;
		const pixelsPerSecond = trackWidth / TRACK_DURATION_IN_SECONDS;

		const animate = (time: number) => {
			const deltaSeconds = (time - lastTime) / 1000;
			lastTime = time;

			if (!isDraggingRef.current) {
				setMedia((prev) => {
					const nextX = prev.scrubX + pixelsPerSecond * deltaSeconds;

					if (nextX >= trackWidth) {
						return { ...prev, scrubX: trackWidth, trackState: "paused" };
					}
					return { ...prev, scrubX: nextX };
				});
			}

			animationFrameId = requestAnimationFrame(animate);
		};

		animationFrameId = requestAnimationFrame(animate);

		return () => cancelAnimationFrame(animationFrameId);
	}, [media.trackState]);

	return (
		<section className="media" id="media">
			<Y2kWindowShell closeButtonRedirect="/" navText="Media">
				<a
					className="social-image-container"
					href={
						SOCIAL_LINKS.find((v) => v.linkType === media.currentSocial)?.href
					}
					target="_blank"
				>
					<CurrentSocialImage linkType={media.currentSocial} />
				</a>

				<div className="social-information">
					<div className="social-media-select">
						<label htmlFor="search-results-input">Social Media:</label>
						<div className="search-input-combo">
							<select
								id="search-results-input"
								name="search-results-input"
								onChange={(e) => {
									const currentSocial = e.currentTarget.value;
									if (!isLinkType(currentSocial)) {
										return console.warn(`${currentSocial} not of link type`);
									}
									setMedia((prev) => ({ ...prev, currentSocial }));
								}}
								value={media.currentSocial}
							>
								{SOCIAL_LINKS.map((v) => (
									<option key={v.linkType} value={v.linkType}>
										{v.title}
									</option>
								))}
							</select>
							<button className="dropdown-arrow" type="button">
								<IoTriangleSharp />
							</button>
						</div>
					</div>
					<div className="track-length-container">
						<div className="track-line" ref={trackLineRef} />
						<button
							className="track-scrubber"
							onMouseDown={() => {
								isDraggingRef.current = true;
							}}
							ref={scrubberRef}
							style={{
								left: `${media.scrubX}px`,
								transform: "translateX(-50%)",
							}}
							type="button"
						/>
					</div>
					<div className="button-row">
						<button className="record" type="button">
							<FaCircle />
						</button>
						<button
							className="back-track"
							onClick={() => handleSkipButtonClick(-1)}
							type="button"
						>
							<FaBackwardFast />
						</button>
						<button
							className="play-pause"
							onClick={() =>
								setMedia((prev) => ({
									...prev,
									trackState:
										prev.trackState === "playing" ? "paused" : "playing",
								}))
							}
							type="button"
						>
							{media.trackState === "playing" ? (
								<FaPause />
							) : media.trackState === "paused" ? (
								<FaPlay />
							) : (
								<FaPlay />
							)}
						</button>
						<button
							className="fast-forward"
							onClick={() => handleSkipButtonClick(1)}
							type="button"
						>
							<FaForwardFast />
						</button>
						<button className="stop" type="button">
							<FaSquare />
						</button>
					</div>
				</div>
			</Y2kWindowShell>
		</section>
	);
}

const CurrentSocialImage = ({ linkType }: { linkType: LinkType }) => {
	switch (linkType) {
		case "instagram":
			return <FaInstagram />;
		case "facebook":
			return <FaFacebookF />;
		case "youtube":
			return <FaYoutube />;
		case "tiktok":
			return <FaTiktok />;
		case "spotify":
			return <FaSpotify />;
		case "triple j":
			return <TripleJ />;
		case "bandcamp":
			return <FaBandcamp />;
		case "song":
			return <FaMusic />;
		case "album":
			return <FaRecordVinyl />;
		case "website":
			return <FaCode />;
	}
};
