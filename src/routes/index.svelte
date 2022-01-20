<script lang="ts">
	import type { Index as IndexType } from '$lib/types/content/index';
	import CMSIndex from '$lib/content/index.yaml';
	import ContactForm from '$lib/Components/StartPage/ContactForm.svelte';
	import Particles from '$lib/Components/Particles/index.svelte';
	import { onMount } from 'svelte';

	const contentIndex: IndexType = CMSIndex;
	const time = new Intl.DateTimeFormat('de', { year: 'numeric' }).format();
	let y: number;
	let readMore = [];
	for (let index = 0; index < contentIndex.sections.length; index++) {
		readMore[index] = false;
	}

	function scrollToTop() {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	}

	onMount(() => {});
</script>

<svelte:window bind:scrollY={y} />

<div class="flex h-screen relative items-center justify-center">
	<img src="/img/zoridAnimated.svg" alt="" width="600" height="auto" class="z-30" />
	<div class="flex absolute bottom-5 flex-col my-auto items-center animate-bounce">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-12 w-12"
			style="color: rgba(45, 45, 45, 1);"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z"
			/>
		</svg>
	</div>
</div>

<div class="bg-white relative">
	<div class="bg-white max-w-xl mx-auto text-center py-24 md:py-32">
		<div class="w-24 h-2 bg-orange-700 mb-8 mx-auto" />
		<h2 class="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-6">
			{contentIndex.header.topic}
		</h2>
		<p class="font-light text-gray-600 mb-6 leading-relaxed">
			{contentIndex.header.text}
		</p>
	</div>

	{#each contentIndex.sections as section, index}
		{#if index % 2 === 0}
			<div class="grid grid-cols-1 md:grid-cols-2">
				<div class="bg-gray-100 p-12 md:p-24 flex justify-end items-center relative">
					<div class="max-w-md z-20">
						<h2 class="font-display font-bold text-2xl md:text-3xl lg:text-4xl mb-6">
							{section.header}
						</h2>
						<p class="font-light text-gray-600 text-sm md:text-base mb-6 leading-relaxed">
							{section.text}
						</p>
						<button
							on:click|preventDefault={() => {
								readMore[index] = true;
							}}
							class="inline-block border-2 border-orange-700 font-light text-orange-700 text-sm uppercase tracking-widest py-3 px-8 hover:bg-orange-700 hover:text-white"
							>Read more</button
						>
					</div>

					<div
						class="absolute z-10 fade-in overflow-y-auto text-white bg-gray-800 w-full h-full top-0 left-0 p-12 md:p-18"
						class:fade-active={readMore[index]}
					>
						<button
							class="inline-flex text-white items-center absolute top-10 right-10"
							on:click|preventDefault={() => {
								readMore[index] = false;
							}}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-10 w-10"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
						<h2 class="font-display font-bold text-2xl md:text-3xl lg:text-4xl mb-6">
							{section.header}
						</h2>
						<div class="text-sm">{@html section.description}</div>
					</div>
				</div>
				<div class="bg-white p-12 md:p-24 flex justify-start items-center">
					<img src={`/img/${section.image}`} class="w-full max-w-md h-80" />
				</div>
			</div>
		{:else}
			<div class="grid grid-cols-1 md:grid-cols-2">
				<div class="bg-white p-12 md:p-24 flex justify-end items-center">
					<img src={`/img/${section.image}`} class="w-full max-w-md h-80" />
				</div>
				<div class="bg-gray-100 p-12 md:p-24 flex justify-start items-center relative">
					<div class="max-w-md z-20">
						<div class="w-24 h-2 orange-700 mb-4" />
						<h2 class="font-display font-bold text-2xl md:text-3xl lg:text-4xl mb-6">
							{section.header}
						</h2>
						<p class="font-light text-gray-600 text-sm md:text-base mb-6 leading-relaxed">
							{@html section.text}
						</p>
						<button
							on:click|preventDefault={() => {
								readMore[index] = true;
							}}
							class="inline-block border-2 border-orange-700 font-light text-orange-700 text-sm uppercase tracking-widest py-3 px-8 hover:bg-orange-700 hover:text-white"
							>Read more</button
						>
					</div>
					<div
						class="absolute z-10 fade-in overflow-y-auto text-white bg-gray-800 w-full h-full top-0 left-0 p-12 md:p-18"
						class:fade-active={readMore[index]}
					>
						<button
							class="nline-flex text-white items-center absolute top-10 right-10"
							on:click|preventDefault={() => {
								readMore[index] = false;
							}}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-10 w-10"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
						<h2 class="font-display font-bold text-2xl md:text-3xl lg:text-4xl mb-6">
							{section.header}
						</h2>
						<div class="text-sm">{@html section.description}</div>
					</div>
				</div>
			</div>
		{/if}
	{/each}
</div>

<div class="bg-orange-700 relative">
	<div class="max-w-xl mx-auto text-center py-24 md:py-32 z-20">
		<h2 class="font-display text-white font-bold text-3xl md:text-4xl lg:text-5xl mb-6">
			Ready for the future?
		</h2>
		<p class="font-light text-white mb-6 leading-relaxed">
			Try out our demonstration and see how it works for you.
		</p>
		<a
			sveltekit:prefetch
			href="/startseite/"
			class="inline-block border-2 border-white font-light text-white text-sm uppercase tracking-widest py-3 px-8 hover:bg-white hover:text-orange-700"
			>try demo
		</a>
	</div>
</div>

<ContactForm />

<footer class="bg-gray-800">
	<div class="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
		<nav class="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
			<div class="px-5 py-2">
				<a href="/privacy" class="text-base text-gray-500 hover:text-gray-900"> Privacy </a>
			</div>

			<div class="px-5 py-2">
				<a href="/imprint/" class="text-base text-gray-500 hover:text-gray-900"> Imprint </a>
			</div>
		</nav>
		<div class="mt-8 flex justify-center space-x-6">
			<img src="/img/zorid-icon.svg" alt="" width="100" height="auto" />
		</div>
		<p class="mt-8 text-center text-base text-gray-400">
			© {time} Alexander Hirschfeld. All rights reserved.
		</p>
	</div>
</footer>

<button
	on:click={() => scrollToTop()}
	class:opacity-0={y < 200}
	class="transition-opacity fixed bottom-5 z-40 right-5 bg-orange-700 hover:bg-orange-800 h-10 w-10 text-white text-center flex items-center justify-center rounded-full"
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
			d="M7 11l5-5m0 0l5 5m-5-5v12"
		/>
	</svg>
</button>

<style lang="scss">
	.fade-in {
		-webkit-transition: all 0.2s ease;
		-moz-transition: all 0.2s ease;
		-ms-transition: all 0.2s ease;
		-o-transition: all 0.2s ease;
		transition: all 0.2s ease;
		opacity: 0;
	}
	.fade-in.fade-active {
		opacity: 1;
		z-index: 50;
	}

	:global(html, body) {
		background: linear-gradient(45deg, rgba(45, 45, 45, 1) 9%, rgba(0, 0, 0, 1) 100%);
	}
</style>
