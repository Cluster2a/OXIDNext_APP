<script lang="ts">
	import type { CategorieTree } from '$lib/types/categorieTree';
	export let categorieTree: CategorieTree[] = [];
</script>

<div class="ml-8">
	<div class="h-full flex justify-center space-x-8">
		{#if categorieTree}
			{#each categorieTree as category}
				<div class="flex">
					<div class="group relative relative flex">
						<!-- Item active: "border-indigo-600 text-indigo-600", Item inactive: "border-transparent text-gray-700 hover:text-gray-800" -->

						<a
							class="border-transparent outline-none focus:outline-none text-white hover:text-gray-500 relative z-10 flex items-center transition-colors ease-out duration-200 text-sm font-medium border-b-2 -mb-px pt-px"
							sveltekit:prefetch
							href={`/${category.link}`}
							>{category.title}
							{#if category.subCategories.length > 0}
								<svg
									class="-mr-1 ml-2 h-5 w-5"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="currentColor"
									aria-hidden="true"
								>
									<path
										fill-rule="evenodd"
										d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
										clip-rule="evenodd"
									/>
								</svg>
							{/if}
						</a>

						{#if category.subCategories.length > 0}
							<div
								class="mt-16 opacity-0 hidden group-hover:opacity-100 group-hover:block origin-top-left absolute left-0 w-56 shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
								role="menu"
								aria-orientation="vertical"
								aria-labelledby="menu-button"
								tabindex="-1"
							>
								<div class="py-1" role="none">
									<!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
									{#each category.subCategories as subCategories, index}
										<a
											sveltekit:prefetch
											href={`/${subCategories.link}`}
											class="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
											role="menuitem">{subCategories.title}</a
										>
									{/each}
								</div>
							</div>
						{/if}
					</div>
				</div>
			{/each}
		{/if}
	</div>
</div>
