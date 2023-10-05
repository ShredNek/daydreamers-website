// ? Hooks
import { useParams } from "react-router-dom";
import { useState } from "react";

// ? Components
import FormalFooter from "../components/FormalFooter";
import FormalHeader from "../components/FormalHeader";
import Carousel from "../components/tailwind/misc/Carousel";

// ? Testing
import SampleStock from "../test/SampleStock";

// ? Image
import MissingImage from "../assets/images/misc/MissingImage.png";
import Dropdown from "../components/tailwind/headlessUI/Dropdown";
import { SearchPreference } from "../interfaces";
import QuantityControl from "../components/QuantityControl";

export default function MerchItem() {
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();

  const handleIncrement = () => quantity <= 99 ? setQuantity((quantity) => quantity + 1) : null;
  const handleDecrement = () => quantity >= 1 ? setQuantity((quantity) => quantity - 1) : null;

  const sizes: SearchPreference[] = [
    { name: "S", camelCaseName: "small" },
    { name: "M", camelCaseName: "medium" },
    { name: "L", camelCaseName: "large" },
    { name: "XL", camelCaseName: "xtrLarge" },
    { name: "XXL", camelCaseName: "xtrXtrLarge" },
  ];

  // ? get photos
  // ! TEST
  const currentStock = SampleStock.find((stock) => id === stock.stockId);
  const itemPhotos = currentStock?.extraImages ?? [MissingImage];

  return (
    <section id="merch-item">
      <FormalHeader />
      <main>
        <Carousel photos={itemPhotos} className="carousel" />
        <form>
          <h2>
            <strong>{currentStock?.name}</strong>
          </h2>
          <h3>
            <strong>{currentStock?.price}</strong>
          </h3>
          <small>GST Inclusive. Shipping calculated at checkout.</small>
          <div>
            <h4>Size</h4>
            <Dropdown sortBy={sizes} openToRight={true} />
          </div>
          <div>
            <h4>Quantity</h4>
            <QuantityControl
              quantity={quantity}
              increment={handleIncrement}
              decrement={handleDecrement}
            />
          </div>
          <p>{currentStock?.description}</p>
        </form>
      </main>
      <FormalFooter />
    </section>
  );
}
