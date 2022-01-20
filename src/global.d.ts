/// <reference types="@sveltejs/kit" />
interface ImportMetaEnv {
	VITE_GRAPHQL_ENDPOINT: string;
	VITE_DOMAIN: string;
	VITE_JWT_SECRET: string;
	EMAIL_FROM_ADDRESS: string;
	VITE_EMAIL_FROM_NAME: string;
	VITE_CONTACT_FORM_RECIPIENT: string;
	VITE_EMAIL_FROM_CONTACT_SUBJECT: string;
	VITE_SENDGRID_API_KEY: string;
}

type Theme = 'light' | 'dark';
