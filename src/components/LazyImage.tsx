import { useState } from "react";
import missingImage from "../assets/images/misc/MissingImage.png";

interface LazyImage {
  lowQualitySrc: string;
  highQualitySrc: string;
  alt: string;
  className?: string;
}

function LazyImage({ lowQualitySrc, highQualitySrc, alt, className }: LazyImage) {
  const [imageSrc, setImageSrc] = useState(lowQualitySrc);
  const [hasError, setHasError] = useState(false);

  return (
    <img
      className={className}
      src={hasError ? missingImage : imageSrc}
      alt={alt}
      onLoad={() => setImageSrc(highQualitySrc)}
      onError={() => setHasError(true)}
    />
  );
}

export default LazyImage;
