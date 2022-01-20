import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-node';
import WindiCSS from 'vite-plugin-windicss';
import yaml from '@rollup/plugin-yaml';
import pug from 'rollup-plugin-pug';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [preprocess()],

	kit: {
		adapter: adapter(),
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		trailingSlash: 'always',
		vite: {
			define: {
				'process.env.VITE_BUILD_TIME': JSON.stringify(new Date().toISOString())
			},
			plugins: [WindiCSS(), yaml(), pug()],
			optimizeDeps: {
				exclude: ['@urql/svelte']
			}
		}
	}
};

export default config;
