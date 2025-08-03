type PriceInput = {
  id: string;
  placeholder: string;
  currState: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  currencySelection?: boolean;
  compactStyle?: boolean;
};

export default function PriceInput({
  id,
  placeholder,
  currState,
  onChange,
  currencySelection,
  compactStyle,
}: PriceInput) {
  const handleInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
    // Stop event propagation to prevent closing the dropdown
    e.stopPropagation();
  };

  return (
    <div>
      <div className="relative rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <span className="text-gray-500 sm:text-sm">$</span>
        </div>
        <input
          type="text"
          name="price"
          id={id}
          value={currState}
          className="block w-full rounded-md border-0 py-1.5 pl-7 text-gray-900 ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-daydreamer-blue sm:text-sm sm:leading-6"
          placeholder={placeholder}
          onChange={onChange}
          onClick={handleInputClick}
        />
        {currencySelection ? (
          <div className="absolute inset-y-0 right-0 flex items-center">
            <label htmlFor="currency" className="sr-only">
              Currency
            </label>
            <select
              id="currency"
              name="currency"
              className="h-full rounded-md border-0 bg-transparent py-0 pl-7 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm">
              <option>AUD</option>
              <option>USD</option>
              <option>EUR</option>
            </select>
          </div>
        ) : null}
      </div>
    </div>
  );
}
