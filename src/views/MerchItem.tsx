// ? Hooks
import { useParams } from "react-router-dom";

// ? Components
import FormalFooter from "../components/FormalFooter";
import FormalHeader from "../components/FormalHeader";
import Carousel from "../components/tailwind/misc/Carousel";

// ? Testing
import SampleStock from "../test/SampleStock";

// ? Image
import MissingImage from "../assets/images/MissingImage.png"

export default function MerchItem() {
  const { id } = useParams()

  // ? get photos
  // ! TEST
  const currentStock = SampleStock.find((stock) => id === stock.stockId)
  const itemPhotos = currentStock?.extraImages ?? [MissingImage]

  return (
    <section>
      <FormalHeader />
      <Carousel photos={itemPhotos} />
      <FormalFooter />
    </section>
  );
}
