<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import type { Query as QueryType } from '$lib/generated/graphql';
	import type { Basket } from '$lib/generated/graphql';
	import Placeholder from './PlaceHolder.svelte';

	export let showOffCanvasBasket: boolean = false;
	export let numberOfNewItemsAdded: number = 0;

	let loadingBasketContent = false;
	let basket: Basket | null = null;

	const closeOffCancasVasket = async (): Promise<void> => {
		showOffCanvasBasket = false;
	};

	const getBasketContent = async (): Promise<Basket> => {
		loadingBasketContent = true;

		const res = await fetch('/api/basket.json', {
			method: 'POST',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({})
		});

		const result: QueryType = await res.json();
		loadingBasketContent = false;

		return result.basket;
	};

	onMount(async () => {
		basket = await getBasketContent();
	});

	onDestroy(async () => {});
</script>

<!-- This example requires Tailwind CSS v2.0+ -->
<div
	class="fixed inset-0 overflow-hidden z-10"
	aria-labelledby="slide-over-title"
	role="dialog"
	aria-modal="true"
>
	<div class="absolute inset-0 overflow-hidden">
		<!--
        Background overlay, show/hide based on slide-over state.
  
        Entering: "ease-in-out duration-500"
          From: "opacity-0"
          To: "opacity-100"
        Leaving: "ease-in-out duration-500"
          From: "opacity-100"
          To: "opacity-0"
      -->
		<div class="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" />

		<div class="fixed inset-y-0 right-0 pl-10 max-w-full flex">
			<!--
          Slide-over panel, show/hide based on slide-over state.
  
          Entering: "transform transition ease-in-out duration-500 sm:duration-700"
            From: "translate-x-full"
            To: "translate-x-0"
          Leaving: "transform transition ease-in-out duration-500 sm:duration-700"
            From: "translate-x-0"
            To: "translate-x-full"
        -->
			<div class="w-screen max-w-md">
				<div class="h-full flex flex-col bg-white shadow-xl">
					<div class="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
						<div class="flex items-start justify-between">
							<h2 class="text-lg font-medium text-gray-900" id="slide-over-title">Shopping cart</h2>

							<div class="ml-3 h-7 flex items-center">
								<button
									type="button"
									on:click|preventDefault={() => closeOffCancasVasket()}
									class="-m-2 p-2 text-gray-400 hover:text-gray-500"
								>
									<span class="sr-only">Close panel</span>
									<!-- Heroicon name: outline/x -->
									<svg
										class="h-6 w-6"
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
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								</button>
							</div>
						</div>

						{#if numberOfNewItemsAdded > 0}
							<div
								class="flex items-center rounded-md bg-indigo-500 text-white text-sm font-bold mt-4 px-4 py-3"
								role="alert"
							>
								<svg
									class="w-6 h-6 mr-2 text-white"
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
										d="M5 13l4 4L19 7"
									/>
								</svg>

								<p>{numberOfNewItemsAdded} Item was added to the basket.</p>
							</div>
						{/if}

						{#if loadingBasketContent == true}
							<Placeholder amount={4} />
						{/if}

						{#if loadingBasketContent !== true}
							<div class="mt-8">
								<div class="flow-root">
									<ul role="list" class="-my-6 divide-y divide-gray-200">
										{#if basket?.items?.length > 0}
											{#each basket.items as item}
												<li class="py-6 flex">
													<div
														class="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden"
													>
														<img
															src={item.product.imageGallery.thumb}
															alt={item.product.title}
															class="w-full h-full object-center object-cover"
														/>
													</div>

													<div class="ml-4 flex-1 flex flex-col">
														<div>
															<div class="flex justify-between text-base font-medium text-gray-900">
																<h3>
																	<a href="#">{item.product.title}</a>
																</h3>
																<p class="ml-4">{item.formattedNetPrice}</p>
															</div>
															<p class="mt-1 text-sm text-gray-500">{item.product.varSelection}</p>
														</div>
														<div class="flex-1 flex items-end justify-between text-sm">
															<p class="text-gray-500">Qty {item.amount}</p>

															<div class="flex">
																<button
																	type="button"
																	class="font-medium text-indigo-600 hover:text-indigo-500"
																	>Remove</button
																>
															</div>
														</div>
													</div>
												</li>
											{/each}
										{/if}
									</ul>
								</div>
							</div>
						{/if}
					</div>

					<div class="border-t border-gray-200 py-6 px-4 sm:px-6">
						{#if loadingBasketContent}
							<div class="animate-pulse flex">
								<div class="flex-1 space-y-3 py-1">
									<div class="grid grid-cols-5 gap-4">
										<div class="h-4 bg-gray-200 rounded col-span-1" />
										<div class="h-4 rounded col-span-1" />
										<div class="h-4 rounded col-span-1" />
										<div class="h-4 rounded col-span-1" />
										<div class="h-4 bg-gray-200 rounded col-span-1" />
									</div>

									<div class="grid grid-cols-3 gap-4">
										<div class="h-4 bg-gray-200 rounded col-span-2" />
										<div class="h-4 rounded col-span-1" />
									</div>
								</div>
							</div>
						{:else if basket?.formattedNetPrice}
							<div class="flex justify-between text-base font-medium text-gray-900">
								<p>Subtotal</p>
								<p>{basket?.formattedNetPrice}</p>
							</div>

							<p class="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
						{/if}

						<div class="mt-6">
							<a
								on:click|preventDefault={() => alert('WIP: Checkout')}
								href="#"
								disabled={loadingBasketContent}
								class:cursor-not-allowed={loadingBasketContent}
								class:opacity-50={loadingBasketContent}
								class="flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
								>Checkout</a
							>
						</div>
						<div class="mt-6 flex justify-center text-sm text-center text-gray-500">
							<p>
								or <button
									on:click|preventDefault={() => closeOffCancasVasket()}
									type="button"
									class="text-indigo-600 font-medium hover:text-indigo-500"
									>Continue Shopping</button
								>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
