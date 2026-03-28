import type React from "react";
import { useState } from "react";
import { type ZodSchema, z } from "zod";
import { sendEnquiryToDayDreamers } from "../api/emailCalls.ts";
import type { ComponentStatus, EnquiryFormSchema } from "../types/index.ts";
import Y2kWindowShell from "./Y2k/Y2kWindowShell.tsx";

const formSchema: ZodSchema<EnquiryFormSchema> = z.object({
	firstName: z.string().min(1, "First name is required"),
	lastName: z.string().min(1, "Last name is required"),
	email: z.string().email("Invalid email address"),
	mobileNumber: z.string().min(8, "Mobile number must be at least 8 digits"),
	favouriteColour: z
		.string()
		.regex(/^#([0-9A-F]{3}|[0-9A-F]{6})$/i, "Invalid color format"),
	enquiryType: z.enum([
		"General",
		"Booking",
		"Management",
		"Scathing Review",
		"Content or Merch Request",
		"Divulge Covert Information",
	]),
	subject: z.string().min(1, "Subject is required"),
	message: z.string().min(1, "Message is required"),
	angerLevel: z.string().nullable(), // For Scathing Review
	suggestedPunishment: z.string().nullable(), // For Scathing Review
	codeName: z.string().nullable(), // For Divulge Covert Information
	levelOfSecrecy: z
		.enum([
			"Top Secret",
			"For Your Eyes Only",
			"Confidential",
			"Public Knowledge",
		])
		.nullable(), // For Divulge Covert Information
});

type EnquiryFormComponent = {
	submissionStatus: ComponentStatus;
	setSubmissionStatus: React.Dispatch<React.SetStateAction<ComponentStatus>>;
};

export default function EnquiryForm({
	submissionStatus,
	setSubmissionStatus,
}: EnquiryFormComponent) {
	const defaultFormFields: EnquiryFormSchema = {
		firstName: "",
		lastName: "",
		email: "",
		mobileNumber: "",
		favouriteColour: "#ffffff00",
		enquiryType: "General",
		subject: "",
		message: "",
		angerLevel: null,
		suggestedPunishment: null,
		codeName: null,
		levelOfSecrecy: null,
	};

	const [formData, setFormData] =
		useState<EnquiryFormSchema>(defaultFormFields);

	const [errors, setErrors] = useState<{ [key: string]: string }>({});

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>,
	) => {
		const { name, value } = e.target;
		setErrors((errors) => ({ ...errors, [name]: "" }));
		setFormData({ ...formData, [name]: value });
	};

	const validateForm = async () => {
		const result = formSchema.safeParse(formData);
		if (result.success) {
			setErrors({});
			setSubmissionStatus("loading");
			let res = null;
			try {
				res = await sendEnquiryToDayDreamers(result.data);
				if (res.status === 200 || res.status === 201 || res.status === 202) {
					setSubmissionStatus("ok");
					setFormData(() => defaultFormFields);
				} else {
					throw Error("New Enquiry request was not ok");
				}
			} catch (error) {
				setSubmissionStatus("error");
				console.error(error);
			}
		} else {
			const newErrors: { [key: string]: string } = {};
			result.error.errors.forEach((error) => {
				newErrors[error.path[0] as string] = error.message;
			});
			setErrors(newErrors);
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		validateForm();
	};

	interface CustomCSSProperties extends React.CSSProperties {
		"--favourite-colour"?: string;
	}

	const customStyle: CustomCSSProperties = {
		"--favourite-colour": formData.favouriteColour,
	};

	return (
		<div className="enquiry-form-container" style={customStyle}>
			<div className="enquiry-form-filter" />
			<div className="enquiry-form-backdrop" />
			<Y2kWindowShell closeButtonRedirect="/" navText="Contact us">
				<form onSubmit={handleSubmit}>
					<div className="first-last-name">
						<div className="field-container">
							<div className="input-container">
								<label className="placeholder" htmlFor="firstName">
									First Name
								</label>
								<input
									id="firstName"
									name="firstName"
									onChange={handleChange}
									placeholder=" "
									type="text"
									value={formData.firstName}
								/>
							</div>
							{errors["firstName"] ? (
								<span className="error">{errors["firstName"]}</span>
							) : null}
						</div>
						<div className="field-container">
							<div className="input-container">
								<label className="placeholder" htmlFor="lastName">
									Last Name
								</label>
								<input
									id="lastName"
									name="lastName"
									onChange={handleChange}
									placeholder=" "
									type="text"
									value={formData.lastName}
								/>
							</div>
							{errors["lastName"] ? (
								<span className="error">{errors["lastName"]}</span>
							) : null}
						</div>
					</div>
					<div className="field-container">
						<div className="input-container">
							<label className="placeholder" htmlFor="email">
								Email
							</label>
							<input
								id="email"
								name="email"
								onChange={handleChange}
								placeholder=" "
								type="email"
								value={formData.email}
							/>
						</div>
						{errors["email"] ? (
							<span className="error">{errors["email"]}</span>
						) : null}
					</div>
					<div className="field-container">
						<div className="input-container">
							<label className="placeholder" htmlFor="mobileNumber">
								Mobile Number
							</label>
							<input
								id="mobileNumber"
								name="mobileNumber"
								onChange={handleChange}
								placeholder=" "
								type="text"
								value={formData.mobileNumber}
							/>
						</div>
						{errors["mobileNumber"] ? (
							<span className="error">{errors["mobileNumber"]}</span>
						) : null}
					</div>

					<div className="favourite-colour-enquiry-type">
						<div className="input-container">
							<label className="placeholder" htmlFor="favouriteColour">
								Favourite Colour
							</label>
							<input
								id="favouriteColour"
								name="favouriteColour"
								onChange={handleChange}
								type="color"
								value={formData.favouriteColour}
							/>
							{errors["favouriteColour"] ? (
								<span className="error">{errors["favouriteColour"]}</span>
							) : null}
						</div>

						<div className="input-container">
							<label className="placeholder" htmlFor="enquiryType">
								Enquiry Type
							</label>
							<select
								id="enquiryType"
								name="enquiryType"
								onChange={handleChange}
								value={formData.enquiryType}
							>
								<option value="General">General</option>
								<option value="Booking">Booking</option>
								<option value="Management">Management</option>
								<option value="Scathing Review">Scathing Review</option>
								<option value="Content or Merch Request">
									Content or Merch Request
								</option>
								<option value="Divulge Covert Information">
									Divulge Covert Information
								</option>
							</select>
						</div>
					</div>
					<div className="field-container">
						<div className="input-container">
							<label className="placeholder" htmlFor="subject">
								Subject
							</label>
							<input
								id="subject"
								name="subject"
								onChange={handleChange}
								placeholder=" "
								type="text"
								value={formData.subject}
							/>
						</div>
						{errors["subject"] ? (
							<span className="error">{errors["subject"]}</span>
						) : null}
					</div>
					<div className="field-container">
						<div className="input-container">
							<label className="placeholder" htmlFor="message">
								Message
							</label>
							<textarea
								id="message"
								name="message"
								onChange={handleChange}
								placeholder="  "
								value={formData.message}
							/>
						</div>
						{errors["message"] ? (
							<span className="error">{errors["message"]}</span>
						) : null}
					</div>
					{formData.enquiryType === "Scathing Review" ? (
						<>
							<div className="field-container">
								<div className="input-container">
									<label className="placeholder" htmlFor="angerLevel">
										Anger Level (1 to 10)
									</label>
									<input
										id="angerLevel"
										name="angerLevel"
										onChange={handleChange}
										placeholder=" "
										type="number"
										value={formData.angerLevel ?? ""}
									/>
								</div>
								{errors["angerLevel"] ? (
									<span className="error">{errors["angerLevel"]}</span>
								) : null}
							</div>
							<div className="field-container">
								<div className="input-container">
									<label className="placeholder" htmlFor="suggestedPunishment">
										Suggested Punishment for the Band
									</label>
									<input
										id="suggestedPunishment"
										name="suggestedPunishment"
										onChange={handleChange}
										placeholder=" "
										type="text"
										value={formData.suggestedPunishment ?? ""}
									/>
								</div>
								{errors["suggestedPunishment"] ? (
									<span className="error">{errors["suggestedPunishment"]}</span>
								) : null}
							</div>
						</>
					) : null}
					{formData.enquiryType === "Divulge Covert Information" ? (
						<div className="code-name-level-of-secrecy">
							<div className="input-container">
								<label htmlFor="codeName">Code Name</label>
								<input
									id="codeName"
									name="codeName"
									onChange={handleChange}
									placeholder=" "
									type="text"
									value={formData.codeName ?? ""}
								/>
							</div>
							{errors["codeName"] ? (
								<span className="error">{errors["codeName"]}</span>
							) : null}

							<div className="input-container">
								<label htmlFor="levelOfSecrecy">Level of Secrecy</label>
								<select
									id="levelOfSecrecy"
									name="levelOfSecrecy"
									onChange={handleChange}
									value={formData.levelOfSecrecy ?? ""}
								>
									<option value="Top Secret">Top Secret</option>
									<option value="For Your Eyes Only">For Your Eyes Only</option>
									<option value="Confidential">Confidential</option>
									<option value="Public Knowledge">Public Knowledge</option>
								</select>
							</div>
							{errors["levelOfSecrecy"] ? (
								<span className="error">{errors["levelOfSecrecy"]}</span>
							) : null}
						</div>
					) : null}
					<button disabled={submissionStatus === "loading"} type="submit">
						Submit
					</button>
				</form>
			</Y2kWindowShell>
		</div>
	);
}
