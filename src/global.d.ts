/// <reference types="@sveltejs/kit" />
interface ImportMetaEnv {
	VITE_GRAPHQL_ENDPOINT: string;
	VITE_DOMAIN: string;
	JWT_SECRET: string;
}

type Theme = 'light' | 'dark';
