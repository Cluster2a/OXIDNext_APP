<script lang="ts">
	import type {
		BreadCrumbs as BreadCrumbsType,
		Category as CategoryType
	} from '$lib/generated/graphql';
	import ProductList from '$lib/Components/Product/List.svelte';
	import BreadCrumbs from '$lib/Components/BreadCrumbs/index.svelte';
	export let category: CategoryType;
	export let breadCrumbs: BreadCrumbsType[];
</script>

{#if category && category.previewImage}
	<!-- Hero -->
	<div class="masterhead flex flex-col border-b w-full lg:border-0">
		<div class="relative">
			<div
				class="relative bg-gray-900 lg:bg-transparent bg-cover bg-no-repeat"
				style="background-position: 50% 25%; background-image: linear-gradient(rgba(0,0,0,1),rgba(0,0,0,0.2)),url('{category.previewImage}');"
			>
				<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div class="max-w-2xl mx-auto py-24 lg:py-34 lg:max-w-none">
						<div class="lg:pr-16">
							<h1
								class="text-4xl font-extrabold tracking-tight text-gray-100 sm:text-5xl xl:text-6xl"
							>
								{category.title}
							</h1>
							<p class="mt-4 text-xl text-gray-400">
								{category.shortDescription}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}

<BreadCrumbs {breadCrumbs} />

{#if category && category?.children && category.children.length > 0}
	<!-- Collections -->
	<section aria-labelledby="collections-heading" class="bg-white">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="max-w-2xl mx-auto py-16 sm:py-24 lg:py-32 lg:max-w-none">
				<div class="mt-6 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-6">
					{#each category.children as childCategory}
						<a sveltekit:prefetch href={`/${childCategory.shortLink}`}>
							<div class="group relative">
								<div
									class="card-zoom flex rounded-md items-center justify-center relative overflow-hidden w-full shadow-xl h-60 h-80 bg-white overflow-hidden sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1"
								>
									<div
										class="card-zoom-image absolute w-full h-full transition-all duration-500 ease-in-out transform bg-center bg-cover"
										style="background-image: url('{childCategory.thumbnail}');"
									/>

									<h1
										class="card-zoom-text absolute text-3xl font-black transition-all duration-500 ease-in-out transform scale-150 text-gray-50 opacity-60"
									>
										{childCategory.title}
									</h1>
								</div>
							</div>
						</a>
					{/each}
				</div>
			</div>
		</div>
	</section>
{/if}

{#if category && category?.products && category.products.length > 0}
	<ProductList products={category.products} />
{/if}

<style>
	.card-zoom:hover .card-zoom-image {
		scale: 150%;
		transform: scale(1.4);
	}
	.card-zoom:hover .card-zoom-text {
		transform: scale(1);
	}
</style>
