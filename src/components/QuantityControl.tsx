interface QuantityControl {
  quantity: number;
  increment: () => void;
  decrement: () => void;
}

export default function QuantityControl({ quantity, increment, decrement }: QuantityControl) {
  function handleIncrement(e: React.MouseEvent) {
    e.preventDefault();
    increment()
  }

  function handleDecrement(e: React.MouseEvent) {
    e.preventDefault();
    decrement()
  }

  return (
    <div className="quantity-control">
      <button onClick={handleIncrement}>+</button>
      <p>{quantity}</p>
      <button onClick={handleDecrement}>-</button>
    </div>
  )
}
