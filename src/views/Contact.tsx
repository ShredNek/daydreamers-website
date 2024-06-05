import EnquiryForm from "../components/EnquiryForm";
import NavHeader from "../components/NavHeader";

export default function Contact() {
  return (
    <>
      <NavHeader linkToDisable="contact" />
      <EnquiryForm />
    </>
  )
}
