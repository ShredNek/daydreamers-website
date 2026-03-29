import type { EnquiryFormSchema } from "../types/index";
import axios from "axios";

export const sendEnquiryToDayDreamers = (enquiry: EnquiryFormSchema) => {
	return axios.post(`${import.meta.env.VITE_MIDDLEWEAR_URL}/enquiry`, enquiry);
	// return axios.post(`fake/enquiry`, enquiry);
};
