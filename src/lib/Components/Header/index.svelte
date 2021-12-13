<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/env';
	import LogoLGPlus from '$lib/Components/Header/LogoLGPlus.svelte';
	import LogoLGMinus from '$lib/Components/Header/LogoLGMinus.svelte';
	import MobileMenu from '$lib/Components/Header/MobileMenu.svelte';
	import MobileMenuToggle from '$lib/Components/Header/MobileMenuToggle.svelte';
	import MegaMenu from '$lib/Components/Header/MegaMenu.svelte';
	import Search from '$lib/Components/Header/Search.svelte';

	import { microtime } from '$lib/stores/headerStore';

	import type { CategorieTree } from '$lib/types/categorieTree';
	import type { Languages } from '$lib/types/languages';

	export let categorieTree: CategorieTree[];
	export let languages: Languages[];

	let y: number;
	let stickyHeader = false;

	const calculateScroll = () => {
		if (!browser) {
			return;
		}

		const elementTarget: HTMLElement = document.querySelector('.masterhead');
		if (!elementTarget) {
			stickyHeader = true;
		} else {
			if (y > elementTarget.offsetTop + elementTarget.offsetHeight) {
				stickyHeader = true;
			} else {
				stickyHeader = false;
			}
		}
	};

	microtime.subscribe((value) => {
		if (value) {
			calculateScroll();
		}
	});

	onMount(async () => {
		calculateScroll();
	});
</script>

<svelte:window bind:scrollY={y} on:scroll={calculateScroll} />

<MobileMenu />

<header class="relative z-10">
	<nav aria-label="Top">
		<!-- Secondary navigation -->
		<div
			class:fixed={stickyHeader}
			class:top-0={stickyHeader}
			class:bg-gray-600={stickyHeader}
			class:z-50={stickyHeader}
			class:absolute={!stickyHeader}
			class:bg-transparent={!stickyHeader}
			class="w-full"
		>
			<div class="">
				<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div class="h-16 flex items-center justify-between">
						<LogoLGPlus />

						<div class="hidden h-full lg:flex">
							<MegaMenu {categorieTree} />
						</div>

						<div class="flex-1 flex items-center lg:hidden">
							<MobileMenuToggle />
							<Search />
						</div>

						<LogoLGMinus />

						<div class="flex-1 h-full flex items-center justify-end">
							<div class="flex h-full items-center lg:ml-8">
								<div class="h-full flex space-x-8">
									<div class="flex">
										<div class="group relative flex">
											<!-- Item active: "border-indigo-600 text-indigo-600", Item inactive: "border-transparent text-gray-700 hover:text-gray-800" -->
											<button
												type="button"
												class="border-transparent outline-none focus:outline-none text-white hover:text-gray-500 relative z-10 flex items-center transition-colors ease-out duration-200 text-sm font-medium border-b-2 -mb-px pt-px"
												aria-expanded="true"
												aria-haspopup="true"
											>
												<svg
													class="w-6 h-6"
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
														d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
													/>
												</svg>
												<span class="sr-only">Search</span>
											</button>
										</div>
									</div>

									<div class="flex">
										<div class="group relative flex">
											<!-- Item active: "border-indigo-600 text-indigo-600", Item inactive: "border-transparent text-gray-700 hover:text-gray-800" -->

											<button
												type="button"
												class="border-transparent outline-none focus:outline-none text-white hover:text-gray-500 relative z-10 flex items-center transition-colors ease-out duration-200 text-sm font-medium border-b-2 -mb-px pt-px"
												aria-expanded="true"
												aria-haspopup="true"
											>
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
														d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
													/>
												</svg>
												<span class="sr-only">Languages</span>
											</button>

											<div
												class="mt-16 opacity-0 hidden group-hover:opacity-100 group-hover:block origin-top-left absolute left-0 w-56 shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
												role="menu"
												aria-orientation="vertical"
												aria-labelledby="menu-button"
												tabindex="-1"
											>
												<div class="py-1" role="none">
													{#if languages && languages.length > 0}
														{#each languages as language}
															<a
																sveltekit:prefetch
																href={`/${language.url}`}
																class:bg-indigo-600={language.selected}
																class:text-white={language.selected}
																class:cursor-not-allowed={language.selected}
																class:text-gray-700={!language.selected}
																class:hover:bg-gray-100={!language.selected}
																class="block px-4 py-2 text-sm"
																role="menuitem">{language.name}</a
															>
														{/each}
													{/if}
												</div>
											</div>
										</div>
									</div>

									<div class="flex">
										<div class="group relative flex">
											<!-- Item active: "border-indigo-600 text-indigo-600", Item inactive: "border-transparent text-gray-700 hover:text-gray-800" -->

											<button
												type="button"
												class="border-transparent outline-none focus:outline-none text-white hover:text-gray-500 relative z-10 flex items-center transition-colors ease-out duration-200 text-sm font-medium border-b-2 -mb-px pt-px"
												aria-expanded="true"
												aria-haspopup="true"
											>
												<svg
													class="w-6 h-6"
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
														d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
													/>
												</svg>
												<span class="sr-only">Account</span>
											</button>

											<div
												class="mt-16 opacity-0 hidden group-hover:opacity-100 group-hover:block origin-top-left absolute left-0 w-56 shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
												role="menu"
												aria-orientation="vertical"
												aria-labelledby="menu-button"
												tabindex="-1"
											>
												<div class="py-1" role="none">
													<!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
													<a
														href="#"
														class="text-gray-700 block px-4 py-2 text-sm"
														role="menuitem"
														tabindex="-1"
														id="menu-item-0">Account settings</a
													>
													<a
														href="#"
														class="text-gray-700 block px-4 py-2 text-sm"
														role="menuitem"
														tabindex="-1"
														id="menu-item-1">Support</a
													>
													<a
														href="#"
														class="text-gray-700 block px-4 py-2 text-sm"
														role="menuitem"
														tabindex="-1"
														id="menu-item-2">License</a
													>
												</div>
											</div>
										</div>
									</div>

									<div class="flex">
										<div class="group relative flex">
											<!-- Item active: "border-indigo-600 text-indigo-600", Item inactive: "border-transparent text-gray-700 hover:text-gray-800" -->

											<div
												class="border-transparent text-white relative z-10 flex items-center text-sm font-medium border-b-2 -mb-px pt-px"
											>
												<span class="mx-4 h-6 w-px bg-gray-200 lg:mx-1" aria-hidden="true" />
											</div>
										</div>
									</div>

									<div class="flex">
										<div class="group relative flex">
											<!-- Item active: "border-indigo-600 text-indigo-600", Item inactive: "border-transparent text-gray-700 hover:text-gray-800" -->

											<button
												type="button"
												class="border-transparent outline-none focus:outline-none text-white hover:text-gray-500 relative z-10 flex items-center transition-colors ease-out duration-200 text-sm font-medium border-b-2 -mb-px pt-px"
												aria-expanded="true"
												aria-haspopup="true"
											>
												<svg
													class="flex-shrink-0 h-6 w-6 text-white group-hover:text-gray-500"
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
														d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
													/>
												</svg>
												<span class="sr-only">items in cart, view bag</span>
											</button>

											<div
												class="mt-16 opacity-0 hidden group-hover:opacity-100 group-hover:block origin-top-left absolute left-0 w-56 shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
												role="menu"
												aria-orientation="vertical"
												aria-labelledby="menu-button"
												tabindex="-1"
											>
												<div class="py-1" role="none">
													<!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
													<a
														href="#"
														class="text-gray-700 block px-4 py-2 text-sm"
														role="menuitem"
														tabindex="-1"
														id="menu-item-0">Account settings</a
													>
													<a
														href="#"
														class="text-gray-700 block px-4 py-2 text-sm"
														role="menuitem"
														tabindex="-1"
														id="menu-item-1">Support</a
													>
													<a
														href="#"
														class="text-gray-700 block px-4 py-2 text-sm"
														role="menuitem"
														tabindex="-1"
														id="menu-item-2">License</a
													>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</nav>
</header>
