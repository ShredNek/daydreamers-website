import EnquiryForm from "../components/EnquiryForm";
import Footer from "../components/Footer";
import NavHeader from "../components/NavHeader";

export default function Contact() {
  return (
    <>
      <NavHeader linkToDisable="Contact" />
      <EnquiryForm />
      <Footer />
    </>
  )
}
