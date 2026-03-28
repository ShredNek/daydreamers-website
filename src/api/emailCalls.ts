import axios from "axios";
// In your web app's main entry file (e.g., app.ts or index.ts)
import { initializeApp } from "firebase/app";
import {
	getToken,
	initializeAppCheck,
	ReCaptchaEnterpriseProvider,
} from "firebase/app-check";
import type { EnquiryFormSchema } from "../types/index.ts";

const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

Object.entries(firebaseConfig).forEach(([key, value]) => {
	if (!value) {
		throw new Error(
			`Firebase configuration error: ${key} is missing or empty.`,
		);
	}
});

const app = initializeApp(firebaseConfig);

const appCheckInstance = initializeAppCheck(app, {
	provider: new ReCaptchaEnterpriseProvider(import.meta.env.VITE_RECAPTCHA_KEY),
	isTokenAutoRefreshEnabled: true,
});

export const sendEnquiryToDayDreamers = async (enquiry: EnquiryFormSchema) => {
	let appCheckToken: string | undefined;

	try {
		// 1. Get the App Check token using the standalone getToken function
		// It takes the appCheckInstance as the first argument.
		const tokenResponse = await getToken(
			appCheckInstance,
			/* forceRefresh */ false,
		);
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

	const middlewareEndpoint = import.meta.env.DEV
		? import.meta.env.VITE_TEST_MIDDLEWARE_URL
		: import.meta.env.VITE_MIDDLEWARE_URL;

	return axios.post(`${middlewareEndpoint}/enquiry`, enquiry, {
		headers,
	});
};
