import Hls from "hls.js";
import { useEffect, useRef } from "react";

interface VideoPlayerProps {
	src: string;
	className?: string;
}

export default function VideoPlayerHls({ src, className }: VideoPlayerProps) {
	const videoRef = useRef<HTMLVideoElement | null>(null);

	useEffect(() => {
		let hls: Hls | undefined;

		if (Hls.isSupported() && videoRef.current !== null) {
			hls = new Hls();
			hls.loadSource(src);
			hls.attachMedia(videoRef.current);
		} else if (
			videoRef.current?.canPlayType("application/vnd.apple.mpegurl")
		) {
			videoRef.current.src = src;
		}

		return () => {
			if (hls) {
				hls.destroy();
			}
		};
	}, [src]);

	return (
		<video ref={videoRef} controls className={className} muted>
			Your browser does not support the video tag.
		</video>
	);
}
