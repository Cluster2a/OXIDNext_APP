<script lang="ts">
	import type { Product as ProductType } from '$lib/generated/graphql';
	import Product from '$lib/Components/Product/ListItem.svelte';
	export let products: Array<ProductType>;
</script>

<div class="px-4 sm:px-6 lg:px-0 mt-24">
	<h2 class="text-2xl font-extrabold tracking-tight text-gray-900">Have you seen?</h2>
	<p class="font-extralight">Customers who viewed this item also viewed the following items.</p>
</div>

<div class="mt-8 relative">
	<div class="relative w-full pb-6 -mb-6 overflow-x-auto">
		<ul
			role="list"
			class="mx-4 inline-flex space-x-8 sm:mx-6 lg:mx-0 lg:space-x-0 lg:grid lg:grid-cols-4 lg:gap-x-8"
		>
			{#each products as product}
				<Product {product} />
			{/each}
		</ul>
	</div>
</div>
