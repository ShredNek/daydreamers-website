import { IoTriangleSharp } from "react-icons/io5";
import newFolder from "../../assets/images/y2k-resources/new-folder_active.png";
import changeSort from "../../assets/images/y2k-resources/window-filter-sort.png";
import changeDisplay from "../../assets/images/y2k-resources/window-filter-display.png";

import "../../styles/components/_y2k-window.scss";

export default function Y2kWindowSearch({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="search-parent">
        <div className="search-filters">
          <label htmlFor="search-results-input">
            Look <span className="file-shortcut-underline">i</span>n:
          </label>
          <div className="search-input-combo">
            <input
              type="text"
              name="search-results-input"
              id="search-results-input"
              disabled
              placeholder="My Music"
            />
            <button className="dropdown-arrow">
              <IoTriangleSharp />
            </button>
          </div>
          <button>
            <img src={newFolder} alt="New folder icon" />
          </button>
          <button>
            <img src={changeDisplay} alt="Change display" />
          </button>
          <button>
            <img src={changeSort} alt="Change sort" />
          </button>
        </div>
        <main className="search-results-window">{children}</main>
        <div className="search-results-actions">
          <label htmlFor="file-name">
            File <span className="file-shortcut-underline">n</span>ame:
          </label>
          <input disabled type="text" name="file-name" id="file-name" />
          <div className="action-buttons">
            <button>
              <span className="file-shortcut-underline">O</span>pen
            </button>
            <button>
              <span className="file-shortcut-underline">C</span>ancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
