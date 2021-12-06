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
</script>

<Header {categorieTree} {languages} />
<main>
	<!-- Hero -->
	<div class="masterhead flex flex-col border-b w-full h-screen lg:border-0">
		<div class="relative">
			<div aria-hidden="true" class="hidden absolute w-full h-screen bg-gray-700 lg:block">
				<div
					class="w-full h-full absolute"
					style="background-image: linear-gradient(rgba(0,0,0,1),rgba(0,0,0,0.2));"
				/>
				<img src="/img/background.webp" class="w-full h-full object-cover top-0 left-0 abbsolute" />
			</div>
			<div class="relative bg-gray-900 lg:bg-transparent">
				<div class="max-w-7xl z-10 mx-auto px-4 sm:px-6 lg:px-8 lg:grid lg:grid-cols-2">
					<div class="max-w-2xl mx-auto py-24 lg:py-64 lg:max-w-none">
						<div class="lg:pr-16">
							<h1
								class="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl xl:text-6xl"
							>
								OXID next
							</h1>
							<p class="mt-4 text-xl text-gray-600">
								All the charts, datepickers, and notifications in the world can't beat checking off
								some items on a paper card.
								<a sveltekit:prefetch href="/lang/ger" class="box">Link</a>
							</p>
							<div class="mt-6">
								<a
									sveltekit:prefetch
									href="startseite/"
									class="inline-block bg-indigo-600 border border-transparent py-3 px-8 font-medium text-white hover:bg-indigo-700"
									>Zum Shop</a
								>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

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
<Footer />
