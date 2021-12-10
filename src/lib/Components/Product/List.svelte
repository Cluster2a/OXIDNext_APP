<script lang="ts">
	import Product from '$lib/Components/Product/ListItem.svelte';
	import type { Product as ProductType } from '$lib/generated/graphql';

	export let products: ProductType[] = [];
</script>

<section aria-labelledby="trending-heading" class="bg-white">
	<div class="lg:max-w-7xl lg:mx-auto lg:px-8">
		<div class="mt-8 relative">
			<div class="relative w-full overflow-x-auto">
				<ul
					role="list"
					class="mx-4 inline-flex space-x-8 sm:mx-6 lg:mx-0 space-x-0 lg:grid lg:grid-cols-4 lg:gap-x-8"
				>
					{#each products as product}
						<Product {product} />
					{/each}
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
