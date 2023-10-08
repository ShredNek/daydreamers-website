// ? Hooks
import { useParams, Link } from "react-router-dom";
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
  const currentStockItem = SampleStock.find((stock) => id === stock.stockId);
  const itemPhotos = currentStockItem?.extraImages ?? [MissingImage];

  return (
    <section id="merch-item">
      <FormalHeader />
      <main>
        <Carousel photos={itemPhotos} className="carousel" />
        <form>
          <h1>
            {currentStockItem?.name}
          </h1>
          <h2>
            {currentStockItem?.price}
          </h2>
          <small>GST Inclusive. Shipping calculated at checkout.</small>
          <div>
            <h3>Size</h3>
            <Dropdown sortBy={sizes} openToRight={true} className="sizes" />
          </div>
          <div>
            <h3>Quantity</h3>
            <QuantityControl
              quantity={quantity}
              increment={handleIncrement}
              decrement={handleDecrement}
            />
          </div>
          <button className="form-button">Buy now</button>
          <p>{currentStockItem?.description}</p>
        </form>
      </main>
      <aside>
        <h2>Related Products</h2>
        <div className="collection">
          {SampleStock
            .filter(
              (stock) =>
                stock.category === currentStockItem?.category &&
                stock.stockId !== currentStockItem.stockId
            )
            .map((stock, index) => (
              <Link key={stock.stockId} to={`../${stock.stockId}`} relative="path">
                <a className="stock-card">
                  <img
                    key={`${stock.name}-${index}`}
                    src={stock.imgSrc}
                    onError={(e) => (e.currentTarget.src = MissingImage)}
                    alt={`an image of${stock.imgSrc}`}
                  />
                  <p>{stock.name}</p>
                  <p>
                    <strong>{stock.price}</strong>
                  </p>
                </a>
              </Link>
            ))}
        </div>
      </aside>
      <FormalFooter />
    </section>
  );
}
