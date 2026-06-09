import { useState } from "react";
import missingImage from "../assets/images/misc/MissingImage.png";

interface LazyImage extends React.ImgHTMLAttributes<HTMLImageElement> {
	lowQualitySrc: string;
	highQualitySrc: string;
}

export default function LazyImage({
	lowQualitySrc,
	highQualitySrc,
	alt,
	className,
}: LazyImage) {
	const [imageSrc, setImageSrc] = useState(lowQualitySrc);
	const [hasError, setHasError] = useState(false);

	return (
		<img
			alt={alt}
			className={className}
			onError={() => setHasError(true)}
			onLoad={() => setImageSrc(highQualitySrc)}
			src={hasError ? missingImage : imageSrc}
		/>
	);
}
