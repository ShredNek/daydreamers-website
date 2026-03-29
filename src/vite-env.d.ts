/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_MIDDLEWEAR_URL: string;
	readonly VITE_DATO_GRAPHQL_ENDPOINT: string;
	readonly VITE_DATO_GRAPHQL_READONLY_KEY: string;
	readonly VITE_SMTP_EMAIL_SERVER: string;
	readonly VITE_SMTP_EMAIL_PORT: string;
	readonly VITE_SMTP_EMAIL_USERNAME: string;
	readonly VITE_SMTP_EMAIL_PASSWORD: string;
}
