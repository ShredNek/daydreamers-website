import { useContext, useEffect } from "react";
import SubscribeToMailingListDialogContent from "../components/SubscribeToMailingList.tsx";
import Y2kWindowShell from "../components/Y2k/Y2kWindowShell.tsx";
import { AppContext } from "../utils/AppContext.tsx";

const Home = () => {
	const { setDialogContent } = useContext(AppContext);
	const timeoutDuration = 4000;

	useEffect(() => {
		setTimeout(() => {
			if (sessionStorage.getItem("has_closed_subscribe_modal") !== "true") {
				setDialogContent(
					<Y2kWindowShell
						closeButtonAction={{
							performAction: () => {
								sessionStorage.setItem("has_closed_subscribe_modal", "true");
								setDialogContent(null);
							},
						}}
						windowHeader="Welcome to our site! Subscribe to our mailing list?"
					>
						<SubscribeToMailingListDialogContent />
					</Y2kWindowShell>,
				);
			}
		}, timeoutDuration);
	}, [setDialogContent]);

	return <section id="home" />;
};

export default Home;
