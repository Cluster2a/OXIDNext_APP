<script context="module">
	export const router = true;
	import { GRAPHQL_ENDPOINT } from '$lib/utilities/config';
	import { getLangIdByPath } from '$lib/utilities/language';
	import createUrl from '$lib/utilities/urlCreator';
	import { browser, dev } from '$app/env';
	import { createClient } from '$lib/graphql';
	export async function load({ fetch, page }) {
		const url = createUrl(page.path, page.query);
		const langId = getLangIdByPath(url);

		const client = await createClient({
			url: GRAPHQL_ENDPOINT,
			fetch,
			dev: browser && dev
		});

		const query = `query($langId: Int!, $url: String!) {
				categorieTree(langId: $langId){
					title
					id
					link
					subCategories {
						title
						id
						link
					}
				},
				languages(langId: $langId, url: $url){
					id,
					name,
					abbr,
					selected,
					url
				}
			}`;

		const result = await client.query(query, { langId, url }).toPromise();
		return {
			props: {
				categorieTree: result?.data?.categorieTree,
				languages: result?.data?.languages
			}
		};
	}
</script>


<script lang="ts">
	import Header from '$lib/Components/Header/index.svelte';
	import Footer from '$lib/Components/Footer/index.svelte';
	import 'virtual:windi.css';
	import type { CategorieTree } from '$lib/types/categorieTree';
	import type { Languages } from '$lib/types/languages';

	export let categorieTree: CategorieTree[];
	export let languages: Languages[];
</script>


<div class="bg-white">
	<Header {categorieTree} {languages} />
	<slot />
	<Footer />
</div>
