// ? components
import FormalHeader from "../components/FormalHeader";
import FormalFooter from "../components/FormalFooter";
import { Link } from "react-router-dom";

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
  const cnv = convertFromStockToCartItem;
  const cartItems = SampleStock.map((s, i) =>
    i <= 2 ? cnv(s, 1, "m") : null
  ).filter((item) => item !== null);

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
          <p>quantity</p>
          <p>total</p>
        </div>
        <hr />
        <div className="item-columns rows">
          {cartItems.map((e) => (
            <div>{e?.name}</div>
          ))}
        </div>
      </main>
      <aside></aside>
      <FormalFooter />
    </section>
  );
}
