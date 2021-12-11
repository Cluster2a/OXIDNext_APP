<script lang="ts">
	import type {
		BreadCrumbs as BreadCrumbsType,
		Product as ProductType
	} from '$lib/generated/graphql';
	import { browser, dev } from '$app/env';
	import { createClient } from '$lib/graphql';
	import BreadCrumbs from '$lib/Components/BreadCrumbs/index.svelte';
	import Reviews from './inc/Reviews.svelte';
	import ShortDescription from './inc/ShortDescription.svelte';
	import VariantSelection from './inc/VariantSelection.svelte';
	import { GRAPHQL_ENDPOINT } from '$lib/utilities/config';
	export let article: ProductType;
	export let breadCrumbs: BreadCrumbsType[];

	let mainProduct = article.id;
	let loadingVariant = false;

	let newVariant: string | null = null;

	$: {
		if (newVariant !== null) {
			getVariant(newVariant);
		} else {
			getVariant(mainProduct);
		}
	}

	const getVariant = async (variant: string): Promise<void> => {
		const client = await createClient({
			url: GRAPHQL_ENDPOINT,
			fetch,
			dev: browser && dev
		});

		const query = `query($productId: ID!) {
			product(productId: $productId){
				title
				varSelection
				imageGallery {
					images {
						image
						icon
						zoom
					}
					icon
					thumb
				} 
				shortDescription
				formattedPrice
				sku
				isBuyable
    		} 
		}`;

		const result = await client.query(query, { productId: variant }).toPromise();
		article.varSelection = result.data.product.varSelection;
		article.title = result.data.product.title;
		article.imageGallery = result.data.product.imageGallery;
		article.shortDescription = result.data.product.shortDescription;
		article.formattedPrice = result.data.product.formattedPrice;
		article.sku = result.data.product.sku;
		article.isBuyable = result.data.product.isBuyable;
	};
</script>

<BreadCrumbs {breadCrumbs} hasPreviewImage={false} />

<div class="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
	<div class="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
		<!-- Image gallery -->
		<div class="flex flex-col-reverse">
			<!-- Image selector -->
			<div class="hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
				<div class="grid grid-cols-4 gap-6" aria-orientation="horizontal" role="tablist">
					{#if article?.imageGallery?.images.length > 0}
						{#each article.imageGallery.images as image, i}
							<button
								id="tabs-1-tab-${i}"
								class="relative h-24 bg-white border rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:ring focus:ring-offset-4 focus:ring-opacity-50"
								aria-controls={`tabs-${i}-panel-1`}
								role="tab"
								type="button"
							>
								<span class="sr-only"> Angled view </span>
								<span class="absolute inset-0 rounded-md overflow-hidden">
									<img src={image.image} alt="" class="w-full h-full object-center object-cover" />
								</span>
								<!-- Selected: "ring-indigo-500", Not Selected: "ring-transparent" -->
								<span
									class="ring-transparent absolute inset-0 rounded-md ring-2 ring-offset-2 pointer-events-none"
									aria-hidden="true"
								/>
							</button>
						{/each}
					{/if}
				</div>
			</div>

			<div class="w-full aspect-w-1 aspect-h-1">
				<!-- Tab panel, show/hide based on tab state. -->
				<div id="tabs-1-panel-1" aria-labelledby="tabs-1-tab-1" role="tabpanel" tabindex="0">
					<img
						src={article.imageGallery.images[0].zoom}
						alt={article.shortDescription}
						class="w-full h-full object-center object-cover sm:rounded-lg"
					/>
				</div>

				<!-- More images... -->
			</div>
		</div>

		<!-- Product info -->
		<div class="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
			<h1 class="text-3xl font-extrabold tracking-tight text-gray-900">
				{article.title}
				{article.varSelection}
			</h1>
			<div>{article.sku}</div>

			<div class="mt-3">
				<h2 class="sr-only">Product information</h2>
				<p class="text-3xl text-gray-900">{article.formattedPrice}</p>
			</div>

			<!-- Reviews -->
			<Reviews ratingAverage={article.ratingAverage} />

			<!-- ShortDescription -->
			<ShortDescription shortDescription={article.shortDescription} />

			<form class="mt-6">
				<!-- VariantSelection -->
				<VariantSelection
					bind:loadingVariant
					bind:newVariant
					variantSelection={article.variantSelection}
					productId={article.id}
				/>

				<div class="mt-10 flex sm:flex-col1">
					<button
						disabled={!article.isBuyable || loadingVariant}
						class:cursor-not-allowed={!article.isBuyable || loadingVariant}
						class:opacity-50={!article.isBuyable || loadingVariant}
						type="submit"
						class="max-w-xs flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:w-full"
						>Add to bag</button
					>

					<button
						type="button"
						class="ml-4 py-3 px-3 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500"
					>
						<!-- Heroicon name: outline/heart -->
						<svg
							class="h-6 w-6 flex-shrink-0"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
							/>
						</svg>
						<span class="sr-only">Add to favorites</span>
					</button>
				</div>
			</form>

			<section aria-labelledby="details-heading" class="mt-12">
				<h2 id="details-heading" class="sr-only">Additional details</h2>

				<div class="border-t divide-y divide-gray-200">
					<div>
						<h3>
							<!-- Expand/collapse question button -->
							<button
								type="button"
								class="group relative w-full py-6 flex justify-between items-center text-left"
								aria-controls="disclosure-1"
								aria-expanded="false"
							>
								<!-- Open: "text-indigo-600", Closed: "text-gray-900" -->
								<span class="text-gray-900 text-sm font-medium"> Features </span>
								<span class="ml-6 flex items-center">
									<!--
                      Heroicon name: outline/plus-sm

                      Open: "hidden", Closed: "block"
                    -->
									<svg
										class="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										aria-hidden="true"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M12 6v6m0 0v6m0-6h6m-6 0H6"
										/>
									</svg>
									<!--
                      Heroicon name: outline/minus-sm

                      Open: "block", Closed: "hidden"
                    -->
									<svg
										class="hidden h-6 w-6 text-indigo-400 group-hover:text-indigo-500"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										aria-hidden="true"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M18 12H6"
										/>
									</svg>
								</span>
							</button>
						</h3>
						<div class="pb-6 prose prose-sm" id="disclosure-1">
							<ul role="list">
								<li>Multiple strap configurations</li>

								<li>Spacious interior with top zip</li>

								<li>Leather handle and tabs</li>

								<li>Interior dividers</li>

								<li>Stainless strap loops</li>

								<li>Double stitched construction</li>

								<li>Water-resistant</li>
							</ul>
						</div>
					</div>

					<!-- More sections... -->
				</div>
			</section>
		</div>
	</div>
</div>
