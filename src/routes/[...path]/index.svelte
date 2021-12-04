<script context="module">
	import { GRAPHQL_ENDPOINT } from '$lib/utilities/config';
	import { browser, dev } from '$app/env';
	import createUrl from '$lib/utilities/urlCreator';
	import { createClient } from '$lib/graphql';

	export async function load({ page }) {
		const url = createUrl(page.path, page.query);

		const client = await createClient({
			url: GRAPHQL_ENDPOINT,
			fetch,
			dev: browser && dev
		});

		const query = `query($url: String!){
			objectBySeoUrl(url: $url){
				type
				id
				lang
				category {
					id
					title
					shortDescription
					longDescription
					thumbnail,
					children {
						title
						shortDescription
						shortLink
						icon
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

		const result = await client.query(query, { url }).toPromise();

		return {
			props: {
				objectBySeoUrl: result?.data?.objectBySeoUrl
			}
		};
	}
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import { microtime } from '$lib/stores/headerStore';
	import Category from '$lib/Components/Category/index.svelte';
	import type { Common as CommonType } from '$lib/generated/graphql';

	export let objectBySeoUrl: CommonType;

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

<main>
	{#if objectBySeoUrl?.category}
		<Category category={objectBySeoUrl.category} />
	{/if}

	<!-- Trending products -->

	<!-- Collections -->
	<section aria-labelledby="collections-heading" class="bg-gray-100">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="max-w-2xl mx-auto py-16 sm:py-24 lg:py-32 lg:max-w-none">
				<h2 id="collections-heading" class="text-2xl font-extrabold text-gray-900">Collections</h2>

				<div class="mt-6 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-6">
					<div class="group relative">
						<div
							class="relative w-full h-80 bg-white rounded-lg overflow-hidden group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1"
						>
							<img
								src="https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg"
								alt="Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug."
								class="w-full h-full object-center object-cover"
							/>
						</div>
						<h3 class="mt-6 text-sm text-gray-500">
							<a href="#">
								<span class="absolute inset-0" />
								Desk and Office
							</a>
						</h3>
						<p class="text-base font-semibold text-gray-900">Work from home accessories</p>
					</div>

					<div class="group relative">
						<div
							class="relative w-full h-80 bg-white rounded-lg overflow-hidden group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1"
						>
							<img
								src="https://tailwindui.com/img/ecommerce-images/home-page-02-edition-02.jpg"
								alt="Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant."
								class="w-full h-full object-center object-cover"
							/>
						</div>
						<h3 class="mt-6 text-sm text-gray-500">
							<a href="#">
								<span class="absolute inset-0" />
								Self-Improvement
							</a>
						</h3>
						<p class="text-base font-semibold text-gray-900">Journals and note-taking</p>
					</div>

					<div class="group relative">
						<div
							class="relative w-full h-80 bg-white rounded-lg overflow-hidden group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1"
						>
							<img
								src="https://tailwindui.com/img/ecommerce-images/home-page-02-edition-03.jpg"
								alt="Collection of four insulated travel bottles on wooden shelf."
								class="w-full h-full object-center object-cover"
							/>
						</div>
						<h3 class="mt-6 text-sm text-gray-500">
							<a href="#">
								<span class="absolute inset-0" />
								Travel
							</a>
						</h3>
						<p class="text-base font-semibold text-gray-900">Daily commute essentials</p>
					</div>
				</div>
			</div>
		</div>
	</section>
</main>

<style>
</style>
