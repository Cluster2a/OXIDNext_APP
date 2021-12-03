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
					thumbnail
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

	export let objectBySeoUrl: any;

	onMount(async () => {
		const currentTime = Date.now()
		$microtime = currentTime;
	});
</script>

<main>
	{#if objectBySeoUrl}
		{JSON.stringify(objectBySeoUrl)}
	{/if}

	<!-- Trending products -->
	<section aria-labelledby="trending-heading" class="bg-white">
		<div class="py-16 sm:py-24 lg:max-w-7xl lg:mx-auto lg:py-32 lg:px-8">
			<div class="px-4 flex items-center justify-between sm:px-6 lg:px-0">
				<h2 id="trending-heading" class="text-2xl font-extrabold tracking-tight text-gray-900">
					Trending products
				</h2>
				<a
					href="#"
					class="hidden sm:block text-sm font-semibold text-indigo-600 hover:text-indigo-500"
					>See everything<span aria-hidden="true"> &rarr;</span></a
				>
			</div>

			<div class="mt-8 relative">
				<div class="relative w-full overflow-x-auto">
					<ul
						role="list"
						class="mx-4 inline-flex space-x-8 sm:mx-6 lg:mx-0 lg:space-x-0 lg:grid lg:grid-cols-4 lg:gap-x-8"
					>
						<li class="w-64 inline-flex flex-col text-center lg:w-auto">
							<div class="group relative">
								<div class="w-full bg-gray-200 rounded-md overflow-hidden aspect-w-1 aspect-h-1">
									<img
										src="https://tailwindui.com/img/ecommerce-images/home-page-02-product-01.jpg"
										alt="Black machined steel pen with hexagonal grip and small white logo at top."
										class="w-full h-full object-center object-cover group-hover:opacity-75"
									/>
								</div>
								<div class="mt-6">
									<p class="text-sm text-gray-500">Black</p>
									<h3 class="mt-1 font-semibold text-gray-900">
										<a href="#">
											<span class="absolute inset-0" />
											Machined Pen
										</a>
									</h3>
									<p class="mt-1 text-gray-900">$35</p>
								</div>
							</div>

							<h4 class="sr-only">Available colors</h4>
							<ul role="list" class="mt-auto pt-6 flex items-center justify-center space-x-3">
								<li
									class="w-4 h-4 rounded-full border border-black border-opacity-10"
									style="background-color: #111827;"
								>
									<span class="sr-only"> Black </span>
								</li>

								<li
									class="w-4 h-4 rounded-full border border-black border-opacity-10"
									style="background-color: #fde68a;"
								>
									<span class="sr-only"> Brass </span>
								</li>

								<li
									class="w-4 h-4 rounded-full border border-black border-opacity-10"
									style="background-color: #e5e7eb;"
								>
									<span class="sr-only"> Chrome </span>
								</li>
							</ul>
						</li>

						<!-- More products... -->
					</ul>
				</div>
			</div>

			<div class="mt-12 px-4 sm:hidden">
				<a href="#" class="text-sm font-semibold text-indigo-600 hover:text-indigo-500"
					>See everything<span aria-hidden="true"> &rarr;</span></a
				>
			</div>
		</div>
	</section>

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
