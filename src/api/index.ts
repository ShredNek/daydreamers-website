import type {
	EnquiryFormSchema,
	MailingListEntry,
	MailingListRemoval,
} from "../types/index.ts";
import { handleAppCheckMiddlewareRequest } from "./helpers.ts";

if (import.meta.env.DEV) {
	// biome-ignore lint/suspicious/noExplicitAny: Expose a debug token for dev only
	(window as any).FIREBASE_APPCHECK_DEBUG_TOKEN =
		import.meta.env.VITE_APP_CHECK_DEBUG_TOKEN;
}

export const middleware = {
	sendEnquiryToDayDreamers: async (enquiry: EnquiryFormSchema) => {
		return handleAppCheckMiddlewareRequest({
			endpoint: "postEnquiry",
			method: "POST",
			body: JSON.stringify({ enquiry }),
		});
	},

	addToMailingList: async (user: MailingListEntry) => {
		const { email, fullName } = user;

		if (!(email && fullName)) {
			throw new Error("Either email or full name were not provided");
		}

		return handleAppCheckMiddlewareRequest({
			endpoint: "addToMailingList",
			method: "POST",
			body: JSON.stringify({ email, fullName }),
		});
	},

	deleteFromMailingList: async (user: MailingListRemoval) => {
		const { email } = user;

		if (!email) {
			throw new Error("Email was not provided");
		}

		return handleAppCheckMiddlewareRequest({
			endpoint: "deleteFromMailingList",
			method: "DELETE",
			body: JSON.stringify({ email }),
		});
	},
};
