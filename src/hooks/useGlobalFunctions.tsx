import { useContext } from "react";
import MsPaintNotVirusPromise from "../components/modals/MsPaintNotVirusPromise.tsx";
import YouHaveNotSubscribed from "../components/modals/YouHaveNotSubscribedPrompt.tsx";
import { AppContext } from "../utils/AppContext.tsx";

const POPUP_DURATION = 10_000;
// const FOLLOW_US_DURATION = 3000;

export const useGlobalStartupProcedures = () => {
	const { setDialogContent } = useContext(AppContext);

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
		}, POPUP_DURATION);
	};
};
