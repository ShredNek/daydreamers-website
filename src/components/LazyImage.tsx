import { useState } from "react";

interface LazyImage {
  lowQualitySrc: string;
  highQualitySrc: string;
  alt: string;
}

function LazyImage({ lowQualitySrc, highQualitySrc, alt }: LazyImage) {
  const [imageSrc, setImageSrc] = useState(lowQualitySrc);

  return (
    <img
      src={imageSrc}
      alt={alt}
      onLoad={() => setImageSrc(highQualitySrc)}
      style={{ transition: "opacity 0.3s" }}
    />
  );
}

export default LazyImage;
