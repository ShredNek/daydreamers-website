// ? Hooks
import { useParams, Link } from "react-router-dom";

// ? Components
import FormalFooter from "../components/FormalFooter";
import FormalHeader from "../components/FormalHeader";

// ? Testing
import SampleStock from "../test/SampleStock";

// ? Image
import MissingImage from "../assets/images/misc/MissingImage.png";
import BuyButton from "../components/ShopifyBuy/BuyButton";

export default function MerchItem() {
  const { id } = useParams();

  // ? get photos
  // ! TEST
  const currentStockItem = SampleStock.find((stock) => id === stock.merchId);

  return (
    <section id="merch-item">
      <FormalHeader />
      <main>
        <BuyButton productId={id!} />
      </main>
      <aside>
        <h2>Related Products</h2>
        <div className="collection">
          {SampleStock
            .filter(
              (stock) =>
                stock.category === currentStockItem?.category &&
                stock.merchId !== currentStockItem.merchId
            )
            .map((stock, index) => (
              <Link key={stock.merchId} to={`../${stock.merchId}`} relative="path">
                <a className="stock-card">
                  <img
                    key={`${stock.name}-${index}`}
                    src={stock.imgSrc}
                    onError={(e) => (e.currentTarget.src = MissingImage)}
                    alt={`an image of${stock.imgSrc}`}
                  />
                  <p>{stock.name}</p>
                  <p>
                    <strong>${stock.price}</strong>
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
