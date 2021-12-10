<script lang="ts">
	import type { Product as ProductType } from '$lib/generated/graphql';

	export let product: ProductType;
</script>

<li
	class="hover:shadow-2xl transition-shadow duration-300 p-5 rounded-md w-64 inline-flex flex-col text-center mb-32 lg:w-auto"
>
	<div class="group relative">
		<div class="w-full bg-gray-200 rounded-md overflow-hidden aspect-w-1 aspect-h-1">
			<img
				src={product.imageGallery.images[0].zoom}
				alt={product.shortDescription}
				class="w-full h-full object-center object-cover group-hover:scale-110 transform transition duration-300"
			/>
		</div>
		<div class="mt-6">
			<h3 class="mt-1 font-semibold text-gray-900">
				<a sveltekit:prefetch href={`/${product.shortLink}`}>
					<span class="absolute inset-0" />
					{product.title}
				</a>
			</h3>
			<p class="mt-1 text-gray-900">{product.formattedPrice}</p>
		</div>
	</div>
</li>
