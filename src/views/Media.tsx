import { useCallback, useEffect, useState } from "react";
import { MdOutlineFileDownload, MdOutlineShare } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import { getAllMedia } from "../api/datoCmsCalls";
import LazyImage from "../components/LazyImage";
import VideoPlayerHls from "../components/VideoPlayerHls";
import { convertToPng, downloadImage } from "../helper/index.tsx";
import type { MediaCollection, MediaData } from "../types";
import "react-toastify/dist/ReactToastify.css";

export default function Media() {
	const [media, setMedia] = useState<null | MediaData[]>(null);

	const callMediaOnLoad = useCallback(async () => {
		const res: MediaCollection = await getAllMedia();
		setMedia(() => res.data.mediaCollection.mediaData);
	}, []);

	const handleShare = async (imgUrl: string) => {
		try {
			if (navigator.share) {
				await navigator.share({
					title: "Check out this image",
					text: "Here is an image I wanted to share with you",
					url: imgUrl,
				});
			} else {
				const response = await fetch(imgUrl);
				let blob: Blob = await response.blob();

				if (!blob.type.startsWith("image/png")) blob = await convertToPng(blob);

				const item = new ClipboardItem({ [blob.type]: blob });
				await navigator.clipboard.write([item]);
				toast.info("Image copied to clipboard");
			}
		} catch (error) {
			toast.error("There was an error sharing this image");
			console.error(
				`Error sharing this image link ${imgUrl}. Error caught:`,
				error,
			);
		}
	};

	useEffect(() => {
		callMediaOnLoad();
	}, [callMediaOnLoad]);

	return (
		<>
			<ToastContainer />
			<section id="media">
				<div className="media-container">
					{media?.map((media) =>
						media.video ? (
							<VideoPlayerHls src={media.video.streamingUrl} key={media.id} />
						) : (
							<div
								className="lazy-image-parent"
								id={media.filename ?? media.id}
								key={media.id}
							>
								<div className="button-row">
									<button type="button" onClick={() => handleShare(media.url)}>
										<MdOutlineShare />
									</button>
									<button
										type="button"
										onClick={() =>
											downloadImage(
												media.url,
												media.filename ?? "downloaded image",
											)
										}
									>
										<MdOutlineFileDownload />
									</button>
								</div>
								<div className="overlay" />
								<LazyImage
									highQualitySrc={media.url}
									lowQualitySrc={media.blurUpThumb}
									alt={media.alt ?? media.filename ?? ""}
								/>
							</div>
						),
					)}
				</div>
			</section>
		</>
	);
}
