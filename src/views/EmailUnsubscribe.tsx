import { useState } from "react";
import { middleware } from "../api/index.ts";
import Y2kWindowShell from "../components/Y2k/Y2kWindowShell.tsx";

const EmailUnsubscribe = () => {
	const [formInput, setFormInput] = useState<{
		email: string;
		fullName: string;
	}>({ email: "", fullName: "" });

	const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		const { email, fullName } = formInput;
		void middleware.addToMailingList({ email, fullName });
	};

	const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		setFormInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	return (
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
				<button type="submit">Add to mailing list</button>
			</form>
		</Y2kWindowShell>
	);
};

export default EmailUnsubscribe;
