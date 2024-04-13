// ? Hooks
import { useParams, Link } from "react-router-dom";

// ? Components
import FormalFooter from "../components/FormalFooter";
import FormalHeader from "../components/FormalHeader";
import DynamicHeightDiv from "../components/DynamicHeightDiv";

// ? Testing
import SampleStock from "../test/SampleStock";

// ? Image
import BuyButton from "../components/ShopifyBuy/BuyButton";
import { useEffect, useState } from "react";

export default function MerchItem() {
  const [visible, setVisible] = useState(false)
  const { id } = useParams();

  useEffect(() => {
    window.addEventListener("reveal", () => setVisible(true))

    return () => {
      window.removeEventListener("reveal", () => setVisible(true))
    }
  }, [])

  // ? get photos
  // ! TEST
  const currentStockItem = SampleStock.find((stock) => id === stock.merchId);

  return (
    <section id="merch-item">
      <FormalHeader searchHidden={true} />
      <main>
        {/* <DynamicHeightDiv visible={visible}> */}
        <BuyButton productId={id!} />
        {/* </DynamicHeightDiv> */}
      </main>
      {/* <aside>
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
      </aside> */}
      <FormalFooter />
    </section>
  );
}
