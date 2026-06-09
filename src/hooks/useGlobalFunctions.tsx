import { useContext } from "react";
import YouHaveNotSubscribed from "../components/modals/YouHaveNotSubscribedPrompt.tsx";
import { AppContext } from "../utils/AppContext.tsx";

const SUBSCRIBE_DIALOG_TIMEOUT = 3000;

export const useGlobalStartupProcedures = () => {
	const { setDialogContent } = useContext(AppContext);

	return () => {
		setTimeout(() => {
			if (sessionStorage.getItem("has_closed_subscribe_modal") !== "true") {
				setDialogContent(<YouHaveNotSubscribed />);
			}
		}, SUBSCRIBE_DIALOG_TIMEOUT);
	};
};
