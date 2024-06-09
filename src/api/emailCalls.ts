import { EnquiryFormSchema } from "../types/index";
import axios from "axios";

export const sendEnquiryToDayDreamers = (enquiry: EnquiryFormSchema) => {
  axios.post(`${import.meta.env.VITE_MIDDLEWEAR_URL}/enquiry`, enquiry);
};
