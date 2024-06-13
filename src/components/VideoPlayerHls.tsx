import { useEffect, useRef } from "react";
import Hls from "hls.js";

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
      // hls.on(Hls.Events.MANIFEST_PARSED, () => {
      //   videoRef.current!.play();
      // });
    } else if (
      videoRef.current !== null &&
      videoRef.current.canPlayType("application/vnd.apple.mpegurl")
    ) {
      videoRef.current.src = src;
      // videoRef.current.addEventListener("loadedmetadata", () => {
      //   videoRef.current!.play();
      // });
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [src]);

  return (
    <video ref={videoRef} controls className={className}>
      Your browser does not support the video tag.
    </video>
  );
}
