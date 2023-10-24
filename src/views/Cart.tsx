// ? components
import FormalHeader from "../components/FormalHeader";
import FormalFooter from "../components/FormalFooter";
import QuantityControl from "../components/QuantityControl";
import LazyImage from "../components/LazyImage";
import { Link } from "react-router-dom";
import StripePayButton from "../components/StripePayButton";

// ? styles
import "../styles/views/_cart.scss";

// ? interfaces
import { CartItem, Stock, Size } from "../interfaces";

// ? testing
import SampleStock from "../test/SampleStock";

function convertFromStockToCartItem(
  stock: Stock,
  quantity: number,
  chosenSize: Size
): CartItem {
  return {
    ...stock,
    quantity,
    chosenSize,
  };
}

export default function Cart() {
  const cartItems = SampleStock.map((s, i) =>
    i <= 2 ? convertFromStockToCartItem(s, 1, "m") : null
  ).filter((item) => item !== null);

  function calculateSubtotal() {
    return cartItems
      .map((item) => (item ? Number(item.price) : 0))
      .reduce((curr, next) => curr + next);
  }

  return (
    <section id="cart">
      <FormalHeader />
      <main>
        <div id="cart-title-row">
          <h1>Your cart</h1>
          <Link className="link" to="/merch">
            Continue Shopping
          </Link>
        </div>
        <div className="item-columns titles">
          <p>product</p>
          <div className="quantity-and-total">
            <p>quantity</p>
            <p>total</p>
          </div>
        </div>
        <hr />
        <div className="item-columns rows">
          {cartItems.map((item, index) =>
            item ? (
              <div key={index} className="item">
                <div className="item-details">
                  <LazyImage
                    lowQualitySrc={item.imgSrc}
                    highQualitySrc={item.imgSrc}
                    alt={`One of our products - ${item.name}`}
                  />
                  <div>
                    <h3>
                      <strong>{item.name}</strong>
                    </h3>
                    <p>${item.price}</p>
                    <p>{item.chosenSize.toUpperCase()}</p>
                  </div>
                </div>
                <div className="quantity-and-total">
                  <QuantityControl
                    quantity={item.quantity}
                    onIncrement={() => console.log("up")}
                    onDecrement={() => console.log("daeown")}
                  />
                  <p>
                    <strong> ${item.quantity * +item.price}</strong>
                  </p>
                </div>
              </div>
            ) : null
          )}
        </div>
      </main>
      <aside>
        <h2>
          <strong> Subtotal: ${calculateSubtotal()} </strong>
        </h2>
        <StripePayButton />
      </aside>
      <FormalFooter />
    </section>
  );
}
