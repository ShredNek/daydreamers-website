import { useState } from "react";
import { middleware } from "../api/index.ts";

export const Sandbox = () => {
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
		<form action="submit" onSubmit={handleSubmit}>
			<label htmlFor="email">Email</label>
			<input
				id="email"
				name="email"
				onChange={handleChange}
				type="email"
				value={formInput.email}
			/>
			<label htmlFor="full-name">Full Name</label>
			<input
				id="full-name"
				name="fullName"
				onChange={handleChange}
				type="text"
				value={formInput.fullName}
			/>
			<button type="submit">Add to mailing list</button>
		</form>
	);
};
