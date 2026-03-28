import axios from "axios";
import { getApp, getApps, initializeApp } from "firebase/app";
import {
	getToken,
	initializeAppCheck,
	ReCaptchaEnterpriseProvider,
} from "firebase/app-check";
import type { EnquiryFormSchema } from "../types/index.ts";
import { credentialsMap } from "./credentials.ts";

const currMode = import.meta.env.PROD ? "prod" : "dev";

const { firebaseConfig, recaptchaKey, middlewareRoot } =
	credentialsMap[currMode];

Object.entries(firebaseConfig).forEach(([key, value]) => {
	if (!value) {
		throw new Error(
			`Firebase configuration error: ${key} is missing or empty.`,
		);
	}
});

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// ? This line of code will instead use a debug token to use locally
if (import.meta.env.DEV) {
	(window as any).FIREBASE_APPCHECK_DEBUG_TOKEN =
		import.meta.env.VITE_APP_CHECK_DEBUG_TOKEN;
}

const appCheckInstance = initializeAppCheck(app, {
	provider: new ReCaptchaEnterpriseProvider(recaptchaKey),
	isTokenAutoRefreshEnabled: true,
});

export const sendEnquiryToDayDreamers = async (enquiry: EnquiryFormSchema) => {
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

	return axios.post(`${middlewareRoot}/enquiry`, enquiry, { headers });
};

export const testGet = async () => {
	let appCheckToken: string | undefined;

	try {
		const tokenResponse = await getToken(appCheckInstance, true);
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

	return axios.get(`${middlewareRoot}/enquiry`, { headers });
};
