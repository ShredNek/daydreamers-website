import { useEffect, useState } from "react";
import type { ComponentStatus } from "../types";
import EnquiryForm from "../components/EnquiryForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SiteWrapper from "../SiteWrapper";

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
			<SiteWrapper sectionId="contact">
				<EnquiryForm
					submissionStatus={dataSubmissionStatus}
					setSubmissionStatus={setDataSubmissionStatus}
				/>
			</SiteWrapper>
			<ToastContainer />
		</>
	);
}
