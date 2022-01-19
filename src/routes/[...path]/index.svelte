<script context="module" lang="ts">
	import { browser } from '$app/env';
	import createUrl from '$lib/utilities/urlCreator';
	import { getLangIdByPath } from '$lib/utilities/language';

	export async function load({ fetch, url }) {
		url = createUrl(url.pathname, url?.searchParams);
		const langId = getLangIdByPath(url);

		const res = await fetch('/api/common.json', {
			method: 'POST',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ url: url, langId: langId })
		});

		const common: QueryType = await res.json();

		return {
			props: {
				objectBySeoUrl: common.objectBySeoUrl,
				categorieTree: common?.categorieTree,
				languages: common?.languages
			}
		};
	}
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import { microtime } from '$lib/stores/headerStore';
	import Category from '$lib/Components/Category/index.svelte';
	import Product from '$lib/Components/Product/index.svelte';
	import ConnectionError from '$lib/Components/Errors/ConnectionError.svelte';
	import Header from '$lib/Components/Header/index.svelte';
	import Footer from '$lib/Components/Footer/index.svelte';
	import OffCanvasBasket from '$lib/Components/OffCanvasBasket/index.svelte';
	import type {
		CategoryTree as CategoryTreeType,
		Language as LanguageType,
		Common as CommonType,
		Query as QueryType
	} from '$lib/generated/graphql';

	export let objectBySeoUrl: CommonType;
	export let categorieTree: CategoryTreeType[];
	export let languages: LanguageType[];
	export let graphQLError: boolean;

	let showOffCanvasBasket = false;
	let itemAmount = 0;

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

	const openOffCanvasBasket = async (event: CustomEvent): Promise<void> => {
		itemAmount = event.detail.itemAmount;
		showOffCanvasBasket = true;
	};

	onMount(async () => {});
</script>

<div class="bg-white">
	{#if graphQLError}
		<ConnectionError />
	{:else}
		<Header {categorieTree} {languages} on:offCanvasBasketOpen={(e) => openOffCanvasBasket(e)} />
		<main>
			{#if objectBySeoUrl?.category}
				<Category category={objectBySeoUrl.category} breadCrumbs={objectBySeoUrl.bredcrumbs} />
			{/if}

			{#if objectBySeoUrl?.article}
				<Product
					on:offCanvasBasketOpen={(e) => openOffCanvasBasket(e)}
					article={objectBySeoUrl.article}
					breadCrumbs={objectBySeoUrl.bredcrumbs}
				/>
			{/if}
		</main>
		<Footer />
	{/if}
</div>

{#if showOffCanvasBasket}
	<OffCanvasBasket bind:showOffCanvasBasket bind:numberOfNewItemsAdded={itemAmount} />
{/if}
