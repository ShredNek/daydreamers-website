import axios from "axios";
import type { EnquiryFormSchema } from "../types/index.ts";

export const sendEnquiryToDayDreamers = (enquiry: EnquiryFormSchema) => {
	return axios.post(`${import.meta.env.VITE_MIDDLEWARE_URL}/enquiry`, enquiry);
	// return axios.post(`fake/enquiry`, enquiry);
};
