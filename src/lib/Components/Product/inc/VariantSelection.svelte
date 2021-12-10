<script lang="ts">
	import type { VariantSelection as VariantSelectionType } from '$lib/generated/graphql';
	import { createClient } from '$lib/graphql';
	import { GRAPHQL_ENDPOINT } from '$lib/utilities/config';
	import { browser, dev } from '$app/env';
	export let variantSelections: VariantSelectionType[];
	export let productId: string;

	let selectedVariants = [];
	let blockSelections = false;

	for (let index = 0; index < variantSelections.length; index++) {
		selectedVariants[index] = '';
	}

	const selectVariant = async (id: number, variant: string): Promise<void> => {
		selectedVariants[id] = variant;

		updateVariant();
	};

	const updateVariant = async (): Promise<void> => {
		blockSelections = true;
		const client = await createClient({
			url: GRAPHQL_ENDPOINT,
			fetch,
			dev: browser && dev
		});

		const query = `query($productId: ID!) {
			product(productId: $productId){
                variantSelections {
                    label
                        list {
                        name
                        value
                        active
                        disabled
                    }
                } 
    		} 
		}`;

		const result = await client.query(query, { productId }).toPromise();
		blockSelections = false;
	};
</script>

{#each variantSelections as variantSelection, i}
	<div>
		<h2 class="text-sm font-medium text-gray-900 mt-6">{variantSelection.label}</h2>

		<fieldset class="mt-2">
			<legend class="sr-only"> Choose a size </legend>
			<div class="grid grid-cols-3 gap-3 sm:grid-cols-6">
				{#each variantSelection.list as listItem}
					<!--
  In Stock: "cursor-pointer", Out of Stock: "opacity-25 cursor-not-allowed"
  Active: "ring-2 ring-offset-2 ring-indigo-500"
  Checked: "bg-indigo-600 border-transparent text-white hover:bg-indigo-700", Not Checked: "bg-white border-gray-200 text-gray-900 hover:bg-gray-50"
-->
					<label
						class:cursor-not-allowed={blockSelections}
						class:cursor-pointer={!blockSelections}
						class:opacity-50={blockSelections}
						on:click|preventDefault={() => selectVariant(i, listItem.value)}
						class="border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1 focus:outline-none"
					>
						<input
							disabled={blockSelections}
							type="radio"
							name="size-choice"
							value={listItem.value}
							class="sr-only"
							aria-labelledby="size-choice-2-label"
						/>
						<p id="size-choice-2-label">{listItem.name}</p>
					</label>
				{/each}
			</div>
		</fieldset>
	</div>
{/each}
