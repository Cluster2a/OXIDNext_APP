<script lang="ts">
	import type {
		VariantSelection as VariantSelectionType,
		Query as QueryType
	} from '$lib/generated/graphql';
	import { createEventDispatcher } from 'svelte';

	export let variants: VariantSelectionType;
	export let productId: string;
	export let loadingVariant: boolean;

	const dispatch = createEventDispatcher();

	let selectedVariants = [];

	for (let index = 0; index < variants.variants.length; index++) {
		selectedVariants[index] = {
			variant: ''
		};
	}

	const selectVariant = async (id: number, variant: string): Promise<void> => {
		if (selectedVariants[id].variant === variant) {
			selectedVariants[id].variant = '';
		} else {
			selectedVariants[id].variant = variant;
		}
		updateVariant();
	};

	const updateVariant = async (): Promise<void> => {
		loadingVariant = true;
		const res = await fetch('/api/product/variants.json', {
			method: 'POST',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ productId, selectedVariants })
		});

		const result: QueryType = await res.json();

		dispatch('variantChanged', {
			selectedVariants,
			currentVariant: result.variants.selectedVariant
		});
	};
</script>

{#each variants.variants as variantSelection, i}
	<div>
		<h2 class="text-sm font-medium text-gray-900 mt-6">{variantSelection.label}</h2>

		<fieldset class="mt-2">
			<legend class="sr-only"> Choose a size </legend>
			{#if variantSelection.isEnriched === true}
				<div class="inline-flex items-center space-x-3">
					{#each variantSelection.list as listItem}
						{#if listItem.type === 'color'}
							<label
								class:opacity-50={loadingVariant || listItem.disabled}
								style={listItem.active
									? 'box-shadow: 0 0 0 2px #fff, 0 0 0 calc(3px + 2px) ' +
									  listItem.colorCode +
									  ', 0 0 #0000;'
									: ''}
								class="rounded-full flex items-center justify-center cursor-pointer focus:outline-none"
							>
								<input
									disabled={loadingVariant || listItem.disabled}
									type="radio"
									name="varselect-{variantSelection.label.replace(/[^a-zA-Z0-9]/g, '')}-choice"
									value={listItem.value}
									class="sr-only"
									on:click|preventDefault={() => selectVariant(i, listItem.value)}
									aria-labelledby="varselect-{variantSelection.label.replace(
										/[^a-zA-Z0-9]/g,
										''
									)}-choice"
								/>
								<span
									aria-hidden="true"
									style="background-color: {listItem.colorCode}"
									class="h-8 w-8 border border-black border-opacity-10 rounded-full"
								/>
							</label>
						{:else}
							<label
								class:ring-indigo-500={listItem.active}
								class:bg-indigo-600={listItem.active}
								class:text-white={listItem.active}
								class:hover:bg-indigo-700={listItem.active}
								class:border-gray-200={!listItem.active}
								class:text-gray-900={!listItem.active}
								class:hover:bg-gray-50={!listItem.active}
								class:cursor-not-allowed={loadingVariant || listItem.disabled}
								class:cursor-pointer={!loadingVariant && !listItem.disabled}
								class:opacity-50={loadingVariant || listItem.disabled}
								class="group relative border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1 focus:outline-none"
							>
								<input
									disabled={loadingVariant || listItem.disabled}
									type="radio"
									name="varselect-{variantSelection.label.replace(/[^a-zA-Z0-9]/g, '')}-choice"
									value={listItem.value}
									class="sr-only"
									on:click|preventDefault={() => selectVariant(i, listItem.value)}
									aria-labelledby="varselect-{variantSelection.label.replace(
										/[^a-zA-Z0-9]/g,
										''
									)}-choice"
								/>
								<img width="40" height="40" src={listItem.image} alt={listItem.value} />
								<img
									class="absolute hidden group-hover:block rounded-md"
									src={listItem.image}
									alt={listItem.value}
								/>
							</label>
						{/if}
					{/each}
				</div>
			{:else}
				<div class="grid grid-cols-3 gap-3 sm:grid-cols-6">
					{#each variantSelection.list as listItem}
						<label
							class:ring-indigo-500={listItem.active}
							class:bg-indigo-600={listItem.active}
							class:text-white={listItem.active}
							class:hover:bg-indigo-700={listItem.active}
							class:border-gray-200={!listItem.active}
							class:text-gray-900={!listItem.active}
							class:hover:bg-gray-50={!listItem.active}
							class:cursor-not-allowed={loadingVariant || listItem.disabled}
							class:cursor-pointer={!loadingVariant && !listItem.disabled}
							class:opacity-50={loadingVariant || listItem.disabled}
							class="border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1 focus:outline-none"
						>
							<input
								disabled={loadingVariant || listItem.disabled}
								type="radio"
								name="varselect-{variantSelection.label.replace(/[^a-zA-Z0-9]/g, '')}-choice"
								value={listItem.value}
								class="sr-only"
								on:click|preventDefault={() => selectVariant(i, listItem.value)}
								aria-labelledby="varselect-{variantSelection.label.replace(
									/[^a-zA-Z0-9]/g,
									''
								)}-choice"
							/>
							<p>{listItem.name}</p>
						</label>
					{/each}
				</div>
			{/if}
		</fieldset>
	</div>
{/each}
