import { StatusCodes } from "http-status-codes";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { middleware } from "../api/index.ts";
import Y2kWindowShell from "../components/Y2k/Y2kWindowShell.tsx";
import type { ComponentStatus } from "../types/index.ts";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const EmailUnsubscribe = () => {
	const navigate = useNavigate();
	const [formInput, setFormInput] = useState<{
		email: string;
		fullName: string;
	}>({ email: "", fullName: "" });
	const [dataSubmissionStatus, setDataSubmissionStatus] =
		useState<ComponentStatus>("neutral");

	const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault();
		const { email, fullName } = formInput;

		if (!(email && fullName)) {
			return setDataSubmissionStatus("missing information");
		}

		try {
			const addResult = await middleware.addToMailingList({ email, fullName });

			if (addResult.status === StatusCodes.OK) {
				setDataSubmissionStatus("no change ok");
			} else if (addResult.status === StatusCodes.CREATED) {
				setDataSubmissionStatus("ok");
			} else {
				console.warn("OK status code is not recognised.");
				setDataSubmissionStatus("ok");
			}
			setFormInput(() => ({ fullName: "", email: "" }));
		} catch {
			setDataSubmissionStatus("error");
		}
	};

	const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		setFormInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	useEffect(() => {
		switch (dataSubmissionStatus) {
			case "error":
				toast.error("There was an error adding you to our mailing list.");
				break;
			case "missing information":
				toast.error(
					"Please provide your name and your email to sign up to our mailing list!",
				);
				break;
			case "ok":
				toast.success("You are now subscribed to our mailing list!");
				break;
			case "no change ok":
				toast.success("You are already subscribed our mailing list!");
				break;
		}
	}, [dataSubmissionStatus]);

	return (
		<>
			<Y2kWindowShell
				closeButtonRedirect="/"
				windowHeader="Subscribe to mailing list :D"
			>
				<form
					action="submit"
					className="email-subscribe-form"
					onSubmit={handleSubmit}
				>
					<div className="input-group">
						<label htmlFor="email">Email</label>
						<input
							id="email"
							name="email"
							onChange={handleChange}
							type="email"
							value={formInput.email}
						/>
					</div>
					<div className="input-group">
						<label htmlFor="full-name">Full Name</label>
						<input
							id="full-name"
							name="fullName"
							onChange={handleChange}
							type="text"
							value={formInput.fullName}
						/>
					</div>
					<button type="submit">Subscribe to mailing list</button>
				</form>
				<div className="unsubscribe-prompt">
					<p>No longer want to receive emails?</p>
					<button
						onClick={() => navigate("/email-unsubscribe")}
						onKeyUp={() => navigate("/email-unsubscribe")}
						type="button"
					>
						Unsubscribe here
					</button>
				</div>
			</Y2kWindowShell>
			<ToastContainer />
		</>
	);
};

export default EmailUnsubscribe;
