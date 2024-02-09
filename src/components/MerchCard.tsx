import { MerchItem } from "../types";
import { Link } from "react-router-dom";

// ? Images
import MissingImage from "../assets/images/misc/MissingImage.png";

type MerchCard = {
  merch: MerchItem;
  index: number;
};

export default function MerchCard({ merch, index }: MerchCard) {
  return (
    <Link
      to={merch.merchId}
      id={`${merch.name}-${merch.merchId}-${index}`}
      className="merch-card"
    >
      <img
        key={`${merch.name}-${index}`}
        src={merch.imgSrc}
        onError={(e) => (e.currentTarget.src = MissingImage)}
        alt={`an image of${merch.imgSrc}`}
      />
      <p>{merch.name}</p>
      <p>
        <strong>${merch.price}</strong>
      </p>
    </Link>
  );
}
