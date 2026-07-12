import { useContext } from "react";
import MsPaintNotVirusPromise from "../components/modals/MsPaintNotVirusPromise.tsx";
import YouHaveNotSubscribed from "../components/modals/YouHaveNotSubscribedPrompt.tsx";
import { AppContext } from "../utils/AppContext.tsx";
import { SHOW_POPUP_INTERVAL } from "../utils/globals.ts";
import { useThemedFavicon } from "./useThemedFavicon.ts";

export const useGlobalStartupProcedures = () => {
	const { setDialogContent } = useContext(AppContext);
	const setThemedFavicon = useThemedFavicon();

	void setThemedFavicon();

	return () => {
		setInterval(() => {
			if (sessionStorage.getItem("has_closed_subscribe_modal") !== "true") {
				return setDialogContent(<YouHaveNotSubscribed />);
			} else if (
				sessionStorage.getItem("has_closed_follow_us_modal") !== "true" &&
				window.location.pathname === "/"
			) {
				return setDialogContent(<MsPaintNotVirusPromise />);
			}
		}, SHOW_POPUP_INTERVAL);
	};
};
