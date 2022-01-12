<script lang="ts">
	import type {
		BreadCrumbs as BreadCrumbsType,
		Product as ProductType,
		Query as QueryType,
		VariantSelection as VariantSelectionType
	} from '$lib/generated/graphql';
	import { createEventDispatcher } from 'svelte';
	import BreadCrumbs from '$lib/Components/BreadCrumbs/index.svelte';
	import Reviews from './inc/Reviews.svelte';
	import ShortDescription from './inc/ShortDescription.svelte';
	import VariantSelection from './inc/VariantSelection.svelte';
	import Crossselling from './inc/Crossselling.svelte';
	export let article: ProductType;
	export let breadCrumbs: BreadCrumbsType[];

	const dispatch = createEventDispatcher();

	let mainProduct = article.id;
	let loadingVariant = false;
	let itemBasketId = null;
	let addingToBasket = false;
	let currentImage = article?.imageGallery?.images[0]?.zoom;
	let longDescriptionHidden = false;

	itemBasketId = article.id;

	const getVariant = async (
		productId: string,
		selectedVariants: VariantSelectionType
	): Promise<void> => {
		const res = await fetch('/api/product.json', {
			method: 'POST',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ productId, selectedVariants })
		});

		const result: QueryType = await res.json();

		article.varSelection = result.product.varSelection;
		article.title = result.product.title;
		article.imageGallery = result.product.imageGallery;
		article.shortDescription = result.product.shortDescription;
		article.formattedPrice = result.product.formattedPrice;
		article.sku = result.product.sku;
		article.isBuyable = result.product.isBuyable;
		article.variantSelection = result.product.variantSelection;
		currentImage = result?.product?.imageGallery?.images[0]?.zoom;

		itemBasketId = result.product.id;
	};

	const variantChanged = async (e: CustomEvent) => {
		const selectedVariants = e.detail.selectedVariants;
		const currentVariant = e.detail.currentVariant;

		await getVariant(currentVariant !== null ? currentVariant : mainProduct, selectedVariants);

		loadingVariant = false;
	};

	const addToBasket = async (): Promise<void> => {
		addingToBasket = true;
		const res = await fetch('/api/basket.json', {
			method: 'POST',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ productId: itemBasketId, qty: 1 })
		});

		const body = await res.json();
		addingToBasket = false;

		if (res.ok) {
			dispatch('offCanvasBasketOpen', {
				itemAmount: body.itemAmount
			});
		}
	};

	const switchImage = async (imageUrl: string): Promise<void> => {
		currentImage = imageUrl;
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
								on:click={() => switchImage(image.zoom)}
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
					{#if currentImage}
						<img
							src={currentImage}
							alt={article.shortDescription}
							class="w-full h-full object-center object-cover sm:rounded-lg"
						/>
					{/if}
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

			<form class="mt-6" on:submit|preventDefault={() => addToBasket()}>
				<!-- VariantSelection -->
				<VariantSelection
					on:variantChanged={(e) => variantChanged(e)}
					bind:loadingVariant
					variants={article.variantSelection}
					productId={article.id}
				/>

				<div class="mt-10 flex sm:flex-col1">
					<button
						disabled={!article.isBuyable ||
							loadingVariant ||
							itemBasketId === null ||
							addingToBasket}
						class:cursor-not-allowed={!article.isBuyable ||
							loadingVariant ||
							itemBasketId === null ||
							addingToBasket}
						class:opacity-50={!article.isBuyable ||
							loadingVariant ||
							itemBasketId === null ||
							addingToBasket}
						type="submit"
						class="max-w-xs flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex inline-flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:w-full"
					>
						{#if addingToBasket === true}
							<svg
								class="animate-spin -ml-1 h-6 w-6 mr-2"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
							>
								<circle
									class="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									stroke-width="4"
								/>
								<path
									class="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
								/>
							</svg>
						{:else}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-6 w-6 mr-2"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
								/>
							</svg>
						{/if}

						Add to bag</button
					>

					<button
						type="button"
						class="hidden ml-4 py-3 px-3 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500"
					>
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
				<h2 id="details-heading" class="sr-only">Description</h2>

				<div class="border-t divide-y divide-gray-200">
					<div>
						<h3>
							<button
								type="button"
								class="group relative w-full py-6 flex justify-between items-center text-left"
								aria-controls="disclosure-1"
								aria-expanded="false"
								on:click|preventDefault={() => (longDescriptionHidden = !longDescriptionHidden)}
							>
								<span
									class="text-sm font-medium"
									class:text-indigo-600={longDescriptionHidden === false}
									class:text-gray-900={longDescriptionHidden !== false}
								>
									Description
								</span>
								<span class="ml-6 flex items-center">
									<svg
										class="h-6 w-6 text-gray-400 group-hover:text-gray-500"
										class:block={longDescriptionHidden === false}
										class:hidden={longDescriptionHidden !== false}
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
									<svg
										class="h-6 w-6 text-indigo-400 group-hover:text-indigo-500"
										class:block={longDescriptionHidden !== false}
										class:hidden={longDescriptionHidden === false}
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
						<div
							class:block={longDescriptionHidden === false}
							class:hidden={longDescriptionHidden !== false}
							class="pb-6 prose prose-sm"
							id="disclosure-1"
						>
							{article.longDescription}
						</div>
					</div>

					<!-- More sections... -->
				</div>
			</section>
		</div>
	</div>
	{#if article?.crossSelling?.length > 0}
		<Crossselling products={article.crossSelling} />
	{/if}
</div>
