import { getApp, getApps, initializeApp } from "firebase/app";
import {
	type AppCheck,
	getToken,
	initializeAppCheck,
	ReCaptchaEnterpriseProvider,
} from "firebase/app-check";
import type Methods from "methods";
import { credentialsMap } from "./credentials.ts";

export const getCredentialsByMode = () => {
	const currMode = import.meta.env.PROD ? "prod" : "dev";
	return credentialsMap[currMode];
};

export const createAppCheckInstance = () => {
	const { firebaseConfig, recaptchaKey } = getCredentialsByMode();

	Object.entries(firebaseConfig).forEach(([key, value]) => {
		if (!value) {
			throw new Error(
				`Firebase configuration error: ${key} is missing or empty.`,
			);
		}
	});

	const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

	return initializeAppCheck(app, {
		provider: new ReCaptchaEnterpriseProvider(recaptchaKey),
		isTokenAutoRefreshEnabled: true,
	});
};

type HandleAppCheckMiddlewareRequest = {
	body: string;
	method: (typeof Methods)[number];
	endpoint: string;
};

export const handleAppCheckMiddlewareRequest = async ({
	endpoint,
	method,
	body,
}: HandleAppCheckMiddlewareRequest) => {
	const appCheckInstance: AppCheck | null = createAppCheckInstance();

	const { middlewareRoot } = getCredentialsByMode();

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

	return fetch(`${middlewareRoot}/${endpoint}`, { headers, method, body });
};
