type Credentials = {
	middlewareRoot: string;
	firebaseConfig: {
		apiKey: string;
		authDomain: string;
		projectId: string;
		storageBucket: string;
		messagingSenderId: string;
		appId: string;
	};
	recaptchaKey: string;
};

type CredentialsMap = {
	dev: Credentials;
	prod: Credentials;
};

export const credentialsMap: CredentialsMap = {
	dev: {
		middlewareRoot: import.meta.env.VITE_TEST_MIDDLEWARE_URL,
		firebaseConfig: {
			apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
			authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
			projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
			storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
			messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
			appId: import.meta.env.VITE_FIREBASE_APP_ID,
		},
		recaptchaKey: import.meta.env.VITE_RECAPTCHA_KEY,
	},
	prod: {
		middlewareRoot: import.meta.env.VITE_MIDDLEWARE_URL,
		firebaseConfig: {
			apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
			authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
			projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
			storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
			messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
			appId: import.meta.env.VITE_FIREBASE_APP_ID,
		},
		recaptchaKey: import.meta.env.VITE_RECAPTCHA_KEY,
	},
};
