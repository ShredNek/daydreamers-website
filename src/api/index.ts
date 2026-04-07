import { type AppCheck, getToken } from "firebase/app-check";
import type { EnquiryFormSchema, MailingListEntry } from "../types/index.ts";
import {
	createAppCheckInstance,
	getCredentialsByMode,
	handleAppCheckMiddlewareRequest,
} from "./helpers.ts";

if (import.meta.env.DEV) {
	// biome-ignore lint/suspicious/noExplicitAny: Expose a debug token for dev only
	(window as any).FIREBASE_APPCHECK_DEBUG_TOKEN =
		import.meta.env.VITE_APP_CHECK_DEBUG_TOKEN;
}

const { middlewareRoot } = getCredentialsByMode();

export const middleware = {
	sendEnquiryToDayDreamers: async (enquiry: EnquiryFormSchema) => {
		const appCheckInstance: AppCheck | null = createAppCheckInstance();

		let appCheckToken: string | undefined;

		try {
			// 1. Get the App Check token using the standalone getToken function
			// It takes the appCheckInstance as the first argument.
			const tokenResponse = await getToken(appCheckInstance, false);
			appCheckToken = tokenResponse.token;
		} catch (error) {
			console.error("Error getting App Check token:", error);
		}

		// 2. Include the App Check token in the request headers
		const headers: Record<string, string> = {
			"Content-Type": "application/json",
		};

		if (appCheckToken) {
			headers["X-Firebase-AppCheck"] = appCheckToken;
		}

		return await fetch(`${middlewareRoot}/enquiry`, {
			body: JSON.stringify(enquiry),
			method: "POST",
			headers,
		});
	},

	addToMailingList: async (user: MailingListEntry) => {
		const appCheckInstance: AppCheck | null = createAppCheckInstance();

		const { email, fullName } = user;

		if (!(email && fullName)) {
			throw new Error("Either email or full name were not provided");
		}

		return handleAppCheckMiddlewareRequest({
			appCheckInstance,
			endpoint: "addMailingListUser",
			method: "PATCH",
			body: JSON.stringify({ email, fullName }),
		});
	},
};
