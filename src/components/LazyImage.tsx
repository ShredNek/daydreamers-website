import { useState } from "react";
import missingImage from "../assets/images/misc/MissingImage.png";

type Props = Omit<
	React.ImgHTMLAttributes<HTMLImageElement>,
	"src" | "onLoad" | "onError"
> & {
	lowQualitySrc: string;
	highQualitySrc: string;
};

export default function LazyImage({
	lowQualitySrc,
	highQualitySrc,
	alt,
	...imgProps
}: Props) {
	const [imageSrc, setImageSrc] = useState(lowQualitySrc);
	const [hasError, setHasError] = useState(false);

	return (
		<img
			{...imgProps}
			alt={alt}
			onError={() => setHasError(true)}
			onLoad={() => setImageSrc(highQualitySrc)}
			src={hasError ? missingImage : imageSrc}
		/>
	);
}
