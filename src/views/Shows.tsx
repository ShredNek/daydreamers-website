import { useCallback, useContext, useEffect, useState } from "react";
import { IoTriangleOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { getAllShows } from "../api/datoCmsCalls.ts";
import channels from "../assets/images/y2k-resources/channels.png";
import myComputer from "../assets/images/y2k-resources/computer-explorer.png";
import desktop from "../assets/images/y2k-resources/desktop.png";
import internetExplorer from "../assets/images/y2k-resources/internet-explorer.png";
import magnifyingGlass from "../assets/images/y2k-resources/magnifying_glass.png";
import networkNeighborhood from "../assets/images/y2k-resources/network.png";
import recycleBin from "../assets/images/y2k-resources/recycle-bin.png";
import timeAndDate from "../assets/images/y2k-resources/time_and_date.png";
import windowsStart from "../assets/images/y2k-resources/windows.png";
import Y2kWindowShell from "../components/Y2k/Y2kWindowShell.tsx";
import { returnFormattedArtistNames, toKebabCase } from "../helper/index.tsx";
import type { AllShowsEntity } from "../types/index.ts";
import { AppContext } from "../utils/AppContext.tsx";

export default function Shows() {
	const { showsData, setShowsData } = useContext(AppContext);
	const navigate = useNavigate();
	const params = useParams();

	const getTime = useCallback(
		() =>
			new Date().toLocaleTimeString(undefined, {
				minute: "2-digit",
				hour: "numeric",
				hourCycle: "h12",
			}),
		[],
	);

	const [time, setTime] = useState(getTime());

	const callAndSetShowsData = useCallback(async () => {
		let rawData: AllShowsEntity | null = null;
		try {
			rawData = await getAllShows();

			if (rawData !== null && rawData.errors !== undefined) {
				throw Error(rawData.errors.map((e) => e.message).join(", "));
			}
		} catch (error) {
			throw Error(`getAllPosts API call failed - ${error}`);
		}

		if (rawData === null) {
			throw Error("getAllPosts API call failed - rawData is null");
		}

		const finalData: AllShowsEntity = {
			data: {
				...rawData.data,
				allShows:
					rawData.data.allShows?.map((gig) => ({
						...gig,
						slugname: toKebabCase(gig.title),
					})) ?? null,
			},
		};
		setShowsData(finalData);
	}, [setShowsData]); // include only stable dependencies

	const selectedShow =
		showsData?.data.allShows?.find(
			(show) => show.slugname === params["showSlug"],
		) ?? null;

	const desktopIcons: Array<{
		img: string;
		name: string;
		slugName: string;
		isShow: boolean;
	}> = [
		{
			img: myComputer,
			name: "My Computer",
			slugName: "my-computer",
			isShow: false,
		},
		{
			img: networkNeighborhood,
			name: "Network Neighborhood",
			slugName: "network-neighborhood",
			isShow: false,
		},
		{
			img: recycleBin,
			name: "Recycle Bin",
			slugName: "recycle-bin",
			isShow: false,
		},
		...(showsData?.data.allShows?.map((show) => ({
			img: show.poster.url,
			name: show.title,
			slugName: show.slugname,
			isShow: true,
		})) ?? []),
	];

	useEffect(() => {
		if (showsData === null) {
			callAndSetShowsData();
		}

		const interval = setInterval(() => {
			if (time !== getTime()) {
				setTime(() => getTime());
			}
		}, 5000);

		return () => clearInterval(interval); // cleanup on unmount
	}, [showsData, time, callAndSetShowsData, getTime]);

	return (
		<section id="shows" className="shows">
			<Y2kWindowShell
				closeButtonRedirect="/"
				navText="Shows"
				className="shows-container"
			>
				<div className="menu-icons-parent">
					{desktopIcons.map((icon, index) => (
						<button
							key={icon.slugName.concat(index.toString())}
							className="desktop-icon"
							type="button"
							onClick={() =>
								icon.isShow && navigate(`/shows/${toKebabCase(icon.name)}`)
							}
						>
							<img src={icon.img} alt={icon.name} />
							<p>{icon.name}</p>
						</button>
					))}
				</div>
				<div className="search-bar">
					<div className="start-and-search-icons">
						<button type="button" className="windows-start">
							<img src={windowsStart} alt="windows start logo" />
							<p>Start</p>
						</button>
						<div className="vertical-line" />
						<a className="search-icon" href="#internet-explorer">
							<img src={internetExplorer} alt="internet explorer" />
						</a>
						<a className="search-icon" href="#desktop">
							<img src={desktop} alt="desktop" />
						</a>
						<a className="search-icon" href="#channels">
							<img src={channels} alt="channels" />
						</a>
						<div className="vertical-line" />
					</div>
					<div className="time-and-date">
						<a className="settings" href="#time-and-date">
							<img src={timeAndDate} alt="time and date" />
						</a>
						<p className="time">{time}</p>
					</div>
				</div>
			</Y2kWindowShell>
			<Y2kWindowShell
				isModal
				closeButtonRedirect="/shows"
				className={`show-collection-window ${selectedShow ? "open" : ""}`}
				navText={selectedShow?.title ?? "nothing here :/"}
			>
				<div className="url-search-row">
					<div className="search-label">
						<p>Search URL</p>
						<span>
							<img src={magnifyingGlass} alt="Magnifying glass" />
						</span>
					</div>
					<div className="url">
						<p>{window.location.href}</p>
					</div>
				</div>
				<div className="info-grid">
					<div className="artwork">
						<img
							src={selectedShow?.poster.url}
							alt={selectedShow?.poster.filename}
						/>
					</div>
					<div className="title-card">
						<h2>{selectedShow?.title}</h2>
						<hr />
						<ul>
							<li>
								<h4>performance date: </h4>
								<p>
									{selectedShow?.datetime
										? new Date(selectedShow?.datetime).toLocaleDateString(
												undefined,
												{
													minute: "2-digit",
													hour: "numeric",
													hourCycle: "h12",
													hour12: true,
												},
											)
										: "unknown"}
								</p>
							</li>
							<li>
								<h4>venue: </h4>
								<p>{selectedShow?.venue}</p>
							</li>
							<li>
								<h4>ticket price: </h4>
								<p>{selectedShow?.ticketprice}</p>
							</li>
						</ul>
						<a
							className="listen"
							href={selectedShow?.ticketslink}
							target="_blank"
							rel="noreferrer"
						>
							JOIN
						</a>
					</div>
					<div className="likes-dislikes">
						<span className="likes">
							<h4>:(</h4>
							<p>
								Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum,
								non.
							</p>
						</span>
						<span className="asterisks">* * * * *</span>
						<span className="dislikes">
							<h4>:D</h4>
							<div className="artists">
								{returnFormattedArtistNames(selectedShow?.artists ?? [])}
							</div>
							<p>{}</p>
						</span>
					</div>
					<div className="now-playing">
						<p className="title">Details released to the public...</p>
						<IoTriangleOutline />
						<div
							// biome-ignore lint/security/noDangerouslySetInnerHtml: what other suggestion do you friggin' have to parse markup?
							dangerouslySetInnerHTML={{
								__html: selectedShow?.details.trim()?.length
									? selectedShow?.details
									: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque mollitia sunt amet animi, non praesentium.",
							}}
						/>
					</div>
				</div>
			</Y2kWindowShell>
		</section>
	);
}
