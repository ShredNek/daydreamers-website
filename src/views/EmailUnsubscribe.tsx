import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { middleware } from "../api/index.ts";
import Y2kWindowShell from "../components/Y2k/Y2kWindowShell.tsx";

const EmailUnsubscribe = () => {
	const [searchParams] = useSearchParams();
	const [formInput, setFormInput] = useState<{ email: string }>({
		email: searchParams.get("email") ?? "",
	});

	const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault();
		const { email } = formInput;

		if (!email) {
			toast.error("There was an error submitting your enquiry.");
			return;
		}

		try {
			const addResult = await middleware.deleteFromMailingList({ email });

			if (addResult.ok) {
				toast.success("You have been removed from our mailing list.");
				setFormInput({ email: "" });
			} else {
				toast.error("There was an error removing you from our mailing list.");
			}
		} catch {
			toast.error("There was an error removing you from our mailing list.");
		}
	};

	const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		setFormInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	return (
		<>
			<Y2kWindowShell
				closeButtonRedirect="/"
				windowHeader="Unsubscribe from mailing list :("
			>
				<form
					action="submit"
					className="email-unsubscribe-form"
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

					<button type="submit">Unsubscribe from mailing list</button>
				</form>
			</Y2kWindowShell>
			<ToastContainer />
		</>
	);
};

export default EmailUnsubscribe;
