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

	let tmpVariants = variants;
	let selectedVariants = [];
	let blockSelections = false;

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
		variants = result.variants;
		tmpVariants = result.variants;

		dispatch('variantChanged', {
			currentVariant: result.variants.selectedVariant
		});

		blockSelections = false;
	};
</script>

{#each variants.variants as variantSelection, i}
	<div>
		<h2 class="text-sm font-medium text-gray-900 mt-6">{variantSelection.label}</h2>

		<fieldset class="mt-2">
			<legend class="sr-only"> Choose a size </legend>
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
						class:cursor-not-allowed={blockSelections || listItem.disabled}
						class:cursor-pointer={!blockSelections && !listItem.disabled}
						class:opacity-50={blockSelections || listItem.disabled}
						class="border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1 focus:outline-none"
					>
						<input
							disabled={blockSelections || listItem.disabled}
							type="radio"
							name="size-choice"
							value={listItem.value}
							class="sr-only"
							on:click|preventDefault={() => selectVariant(i, listItem.value)}
							aria-labelledby="size-choice-2-label"
						/>
						<p id="size-choice-2-label">{listItem.name}</p>
					</label>
				{/each}
			</div>
		</fieldset>
	</div>
{/each}
