import { SetStateAction, useEffect } from "react";

interface SearchModal {
  isOpen?: boolean;
  onClose?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  searchQuery: string;
  setSearchQuery: React.Dispatch<SetStateAction<string>>
}

export default function SearchModal({ isOpen, onClose, searchQuery, setSearchQuery }: SearchModal) {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.currentTarget.value)
  };

  useEffect(() => {
    const handleOverlayClick = (e: MouseEvent) => {
      if (
        e.target instanceof HTMLDivElement &&
        e.target.classList.contains("overlay")
      ) {
        onClose ? onClose() : null;
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleOverlayClick);
    }

    return () => {
      document.removeEventListener("click", handleOverlayClick);
    };
  }, [isOpen, onClose, searchQuery]);

  return (
    <div
      className={`fixed z-50 inset-0 w-screen transition-opacity ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
    >
      <div className="overlay fixed inset-0 bg-black opacity-20"></div>
      <div className="relative bg-white w-screen rounded-lg shadow-lg p-8">
        <form className="flex items-center justify-center gap-2 my-12">
          <input
            type="text"
            placeholder="Search for cool stuff here..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full border rounded-lg px-3 py-2 max-w-2xl"
          />
          {/* <button
            type="submit"
            className=" bg-daydreamer-blue hover:bg-white  border-2 border-daydreamer-blue  text-white hover:text-daydreamer-blue font-semibold px-4 py-2 rounded-lg transition-colors"
          >
          Search
         </button> */}
          <button
            className="ml-5 text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </form>
      </div>
    </div >
  );
}
