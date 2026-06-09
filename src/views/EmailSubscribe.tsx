import { ToastContainer } from "react-toastify";
import Y2kWindowShell from "../components/Y2k/Y2kWindowShell.tsx";
import "react-toastify/dist/ReactToastify.css";
import SubscribeToMailingListDialogContent from "../components/SubscribeToMailingList.tsx";

const EmailSubscribe = () => {
	return (
		<>
			<Y2kWindowShell
				closeButtonAction={{ redirectTo: "/" }}
				windowHeader="Subscribe to mailing list :D"
			>
				<SubscribeToMailingListDialogContent />
			</Y2kWindowShell>
			<ToastContainer />
		</>
	);
};

export default EmailSubscribe;
