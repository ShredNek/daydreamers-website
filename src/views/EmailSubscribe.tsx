import { ToastContainer } from "react-toastify";
import SubscribeToMailingListDialogContent from "../components/SubscribeToMailingList.tsx";
import Y2kWindowShell from "../components/Y2k/Y2kWindowShell.tsx";

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
