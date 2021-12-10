<script lang="ts">
	import type { BreadCrumbs } from '$lib/generated/graphql';
	export let breadCrumbs: BreadCrumbs[];
	export let hasPreviewImage: boolean;
</script>

<section aria-labelledby="breadcrumbs" class="bg-white">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div
			class:pt-8={hasPreviewImage}
			class:pt-24={!hasPreviewImage}
			class="max-w-2xl mx-auto lg:max-w-none pb-8"
		>
			{#if breadCrumbs && breadCrumbs.length > 0}
				<ol
					class="list-reset flex text-grey-dark"
					itemscope
					itemtype="http://schema.org/BreadcrumbList"
				>
					<li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
						<a sveltekit:prefetch href="/" title="Home" itemprop="item"
							><span itemprop="name">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
									/>
								</svg>
							</span></a
						>
					</li>
					<li><span class="mx-2">/</span></li>
					{#each breadCrumbs as bredcrumb, i}
						<li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
							<a
								sveltekit:prefetch
								href={`/${bredcrumb.link}`}
								title={bredcrumb.title}
								itemprop="item"><span itemprop="name">{bredcrumb.title}</span></a
							>
						</li>
						{#if i + 1 < breadCrumbs.length}
							<li><span class="mx-2">/</span></li>
						{/if}
					{/each}
				</ol>
			{/if}
		</div>
	</div>
</section>
