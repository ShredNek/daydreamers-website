/// <reference types="vite/client" />
/** biome-ignore-all lint/correctness/noUnusedVariables: Shut up biome this interface is actually being used when not exported */

interface ImportMetaEnv {
	readonly VITE_DATO_GRAPHQL_ENDPOINT: string;
	readonly VITE_DATO_GRAPHQL_READONLY_KEY: string;
	readonly VITE_SMTP_EMAIL_SERVER: string;
	readonly VITE_SMTP_EMAIL_PORT: string;
	readonly VITE_SMTP_EMAIL_USERNAME: string;
	readonly VITE_SMTP_EMAIL_PASSWORD: string;
	readonly VITE_MIDDLEWARE_URL: string;
	readonly VITE_TEST_MIDDLEWARE_URL: string;
	readonly VITE_RECAPTCHA_KEY: string;
	readonly VITE_FIREBASE_API_KEY: string;
	readonly VITE_FIREBASE_AUTH_DOMAIN: string;
	readonly VITE_FIREBASE_PROJECT_ID: string;
	readonly VITE_FIREBASE_STORAGE_BUCKET: string;
	readonly VITE_FIREBASE_MESSAGING_SENDER_ID: string;
	readonly VITE_FIREBASE_APP_ID: string;
}
