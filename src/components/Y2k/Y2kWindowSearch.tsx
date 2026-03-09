import { IoTriangleSharp } from "react-icons/io5";
import newFolder from "../../assets/images/y2k-resources/new-folder_active.png";
import changeDisplay from "../../assets/images/y2k-resources/window-filter-display.png";
import changeSort from "../../assets/images/y2k-resources/window-filter-sort.png";

import "../../styles/components/_y2k-window.scss";

export default function Y2kWindowSearch({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="search-parent">
			<div className="search-filters">
				<label htmlFor="search-results-input">
					Look <span className="file-shortcut-underline">i</span>n:
				</label>
				<div className="search-input-combo">
					<input
						disabled
						id="search-results-input"
						name="search-results-input"
						placeholder="My Music"
						type="text"
					/>
					<button className="dropdown-arrow" type="button">
						<IoTriangleSharp />
					</button>
				</div>
				<button type="button">
					<img alt="New folder icon" src={newFolder} />
				</button>
				<button type="button">
					<img alt="Change display" src={changeDisplay} />
				</button>
				<button type="button">
					<img alt="Change sort" src={changeSort} />
				</button>
			</div>
			<main className="search-results-window">{children}</main>
			<div className="search-results-actions">
				<label htmlFor="file-name">
					File <span className="file-shortcut-underline">n</span>ame:
				</label>
				<input disabled id="file-name" name="file-name" type="text" />
				<div className="action-buttons">
					<button type="button">
						<span>
							<span className="file-shortcut-underline">O</span>pen
						</span>
					</button>
					<button type="button">
						<span>
							<span className="file-shortcut-underline">C</span>ancel
						</span>
					</button>
				</div>
			</div>
		</div>
	);
}
