import { useEffect, useState } from "react"
import { ComponentStatus } from "../types"
import EnquiryForm from "../components/EnquiryForm";
import Footer from "../components/Footer";
import NavHeader from "../components/NavHeader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Contact() {
  const [dataSubmissionStatus, setDataSubmissionStatus] = useState<ComponentStatus>("neutral")

  useEffect(() => {
    switch (dataSubmissionStatus) {
      case "error":
        toast.error("There was an error submitting your enquiry.");
        break;
      case "ok":
        toast.success("Enquiry submitted!")
    }
  }, [dataSubmissionStatus])

  return (
    <>
      <NavHeader linkToDisable="Contact" />
      <EnquiryForm submissionStatus={dataSubmissionStatus} setSubmissionStatus={setDataSubmissionStatus} />
      <Footer />
      <ToastContainer />
    </>
  )
}
