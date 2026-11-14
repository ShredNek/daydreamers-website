import { AppContext } from "@app/utils/AppContext.tsx";
import { useContext } from "react";
import NewMerchAd from "../../assets/images/popups/new-merch-ad.jpg";
import { PAGE_LINKS } from "../../utils/globals.ts";
import Y2kWindowShell from "../Y2k/Y2kWindowShell.tsx";

export const MerchHere = () => {
	const { setPopupContent } = useContext(AppContext);

	return (
		<Y2kWindowShell
			closeButtonAction={{
				performAction: () => {
					sessionStorage.setItem("has_closed_merch_here_popup", "true");
					setPopupContent(null);
				},
			}}
			windowHeader="hello, stranger!"
		>
			<div className="merch-here-popup">
				<a
					/** biome-ignore lint/performance/useDomNodeTextContent: biome bruh this is not a dom element */
					href={PAGE_LINKS.find((l) => l.innerText === "Merch")?.to}
					rel="noopener"
					target="_blank"
					title="New merch out now!"
				>
					<img alt="New merch out now!" draggable={false} src={NewMerchAd} />
				</a>
			</div>
		</Y2kWindowShell>
	);
};
