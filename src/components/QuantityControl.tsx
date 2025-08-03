interface QuantityControl {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export default function QuantityControl({
  quantity,
  onIncrement,
  onDecrement,
}: QuantityControl) {
  function handleIncrement(e: React.MouseEvent) {
    e.preventDefault();
    onIncrement();
  }

  function handleDecrement(e: React.MouseEvent) {
    e.preventDefault();
    onDecrement();
  }

  return (
    <div className="button quantity-control">
      <button onClick={handleIncrement}>+</button>
      <p>{quantity}</p>
      <button onClick={handleDecrement}>-</button>
    </div>
  );
}
