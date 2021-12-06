<script context="module">
	import { GRAPHQL_ENDPOINT } from '$lib/utilities/config';
	import { browser, dev } from '$app/env';
	import createUrl from '$lib/utilities/urlCreator';
	import { getLangIdByPath } from '$lib/utilities/language';
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
			languages(langId: $langId, url: $url){
				id,
				name,
				abbr,
				selected,
				url
			},
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
			objectBySeoUrl(url: $url){
				type
				id
				lang
				bredcrumbs {
					link
					title
    			} 
				category {
					id
					title
					shortDescription
					longDescription
					previewImage
					children {
						title
						shortDescription
						shortLink
						thumbnail
						seo {
							description
							keywords
							url
						} 
					}
					products {
						id
						title
						shortDescription
						shortLink
						imageGallery {
							images {
								image
								icon
								zoom
							}
							icon
							thumb
						} 
						price {
							currency {
								name
								sign
							}
							price
						} 
					}
        		}
    		} 
		}`;

		const result = await client.query(query, { url, langId }).toPromise();

		return {
			props: {
				objectBySeoUrl: result?.data?.objectBySeoUrl,
				categorieTree: result?.data?.categorieTree,
				languages: result?.data?.languages,
				graphQLError: typeof result?.error !== 'undefined'
			}
		};
	}
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import { microtime } from '$lib/stores/headerStore';
	import Category from '$lib/Components/Category/index.svelte';
	import ConnectionError from '$lib/Components/Errors/ConnectionError.svelte';
	import Header from '$lib/Components/Header/index.svelte';
	import Footer from '$lib/Components/Footer/index.svelte';
	import type {
		Common as CommonType,
		CategoryTree as CategoryTreeType,
		Language as LanguageType
	} from '$lib/generated/graphql';

	export let objectBySeoUrl: CommonType;
	export let categorieTree: CategoryTreeType[];
	export let languages: LanguageType[];
	export let graphQLError: boolean;

	function fetchLessonData(objectBySeoUrl: CommonType) {
		if (browser) {
			new Promise(() => {
				setTimeout(() => {
					const currentTime = Date.now();
					$microtime = currentTime;
				}, 0);
			});
		}
	}

	$: fetchLessonData(objectBySeoUrl);

	onMount(async () => {});
</script>

<div class="bg-white">
	{#if graphQLError}
		<ConnectionError />
	{:else}
		<Header {categorieTree} {languages} />
		<main>
			{#if objectBySeoUrl?.category}
				<Category category={objectBySeoUrl.category} breadCrumbs={objectBySeoUrl.bredcrumbs} />
			{/if}
		</main>
		<Footer />
	{/if}
</div>
