import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import EnquiryForm from "../components/EnquiryForm";
import type { ComponentStatus } from "../types";
import "react-toastify/dist/ReactToastify.css";

export default function Contact() {
	const [dataSubmissionStatus, setDataSubmissionStatus] =
		useState<ComponentStatus>("neutral");

	useEffect(() => {
		switch (dataSubmissionStatus) {
			case "error":
				toast.error("There was an error submitting your enquiry.");
				break;
			case "ok":
				toast.success("Enquiry submitted!");
		}
	}, [dataSubmissionStatus]);

	return (
		<>
			<section id="contact">
				<EnquiryForm
					submissionStatus={dataSubmissionStatus}
					setSubmissionStatus={setDataSubmissionStatus}
				/>
			</section>
			<ToastContainer />
		</>
	);
}
