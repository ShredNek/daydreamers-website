import { useState } from "react";

interface LazyImage {
  lowQualitySrc: string;
  highQualitySrc: string;
  alt: string;
  className?: string;
}

function LazyImage({ lowQualitySrc, highQualitySrc, alt, className }: LazyImage) {
  const [imageSrc, setImageSrc] = useState(lowQualitySrc);

  return (
    <img
      className={className}
      src={imageSrc}
      alt={alt}
      onLoad={() => setImageSrc(highQualitySrc)}
      style={{ transition: "opacity 0.3s" }}
    />
  );
}

export default LazyImage;
