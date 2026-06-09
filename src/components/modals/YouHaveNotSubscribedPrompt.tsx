import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import errorIcon from "../../assets/images/y2k-resources/msg_error-0.png";
import { AppContext } from "../../utils/AppContext.tsx";
import Y2kWindowShell from "../Y2k/Y2kWindowShell.tsx";

const YouHaveNotSubscribed = () => {
	const { setDialogContent } = useContext(AppContext);
	const navigate = useNavigate();

	const closeModal = () => {
		sessionStorage.setItem("has_closed_subscribe_modal", "true");
		setDialogContent(null);
	};

	return (
		<Y2kWindowShell
			closeButtonAction={{
				performAction: closeModal,
			}}
			windowHeader="Error"
		>
			<div className="you-have-not-subscribed">
				<div className="container-parent">
					<img
						alt="Error. You have not subscribed to our mailing list."
						src={errorIcon}
					/>
					<div className="content-container">
						<h3>oh! why haven't you signed up to our mailing list?</h3>
						<p>
							do you just wanna be a stinky uncool guy that doesn't go to cool
							gigs or somthin
						</p>
					</div>
				</div>
				<button
					onClick={() => {
						closeModal();
						navigate("/email-subscribe");
					}}
					type="button"
				>
					sign up here
				</button>
			</div>
		</Y2kWindowShell>
	);
};

export default YouHaveNotSubscribed;
