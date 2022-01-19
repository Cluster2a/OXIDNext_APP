<script lang="ts">
	import type { Index as IndexType } from '$lib/types/content/index';
	import CMSIndex from '$lib/content/index.yaml';

	const contentIndex: IndexType = CMSIndex;

	let readMore = [];
	for (let index = 0; index < contentIndex.sections.length; index++) {
		readMore[index] = false;
	}
</script>

<div class="flex h-screen relative items-center justify-center">
	<div class="relative">
		<a href="/startseite/">
			<img src="/img/zoridAnimated.svg" alt="" width="600" height="auto" />
		</a>
	</div>

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
		<div class="w-24 h-2 bg-orange-700 mb-4 mx-auto" />
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
						class="absolute z-10 fade-in overflow-y-auto text-white bg-slate-800 w-full h-full top-0 left-0 p-12 md:p-18"
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
					<img src={`/img/${section.image}`} class="w-full max-w-md" />
				</div>
			</div>
		{:else}
			<div class="grid grid-cols-1 md:grid-cols-2">
				<div class="bg-white p-12 md:p-24 flex justify-end items-center">
					<img src={`/img/${section.image}`} class="w-full max-w-md" />
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
						class="absolute z-10 fade-in overflow-y-auto text-white bg-slate-800 w-full h-full top-0 left-0 p-12 md:p-18"
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

<!--
<header class="relative px-6 h-full overflow-hidden lg:py-72 xl:py-80 sm:px-8 xl:px-12">
	<div class="relative h-100 z-20 mx-auto max-w-screen-2xl">
		<div class="h-full">
			<a href="/startseite/"><h1 class="flickering" style="text-shadow: 20px 20px 10px rgb(0 0 0 / 25%);" data-heading="X">NEXT</h1></a><br>
		</div>
		<div class="flex flex-col my-auto items-center animate-bounce">
			<svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16" style="color: rgba(45, 45, 45, 1);" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z" />
			  </svg>
		</div>
	</div>
</header>
-->
<style>
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

	.bg-slate-800 {
		background-color: rgb(30 41 59);
	}
	:global(#tsparticles) {
		opacity: 1;
		-webkit-transition: opacity 2s ease;
		transition: opacity 2s ease;
		-webkit-transition-delay: 1s;
		transition-delay: 1s;
		height: 100%;
		left: 0;
		top: 0;
		position: absolute;
		width: 100%;
	}

	:global(html, body) {
		background: linear-gradient(45deg, rgba(45, 45, 45, 1) 9%, rgba(0, 0, 0, 1) 100%);
	}
	@keyframes flicker {
		0%,
		19.999%,
		22%,
		62.999%,
		64%,
		64.999%,
		70%,
		100% {
			opacity: 0.99;
			text-shadow: -0.10330578512396695vh -0.10330578512396695vh 0 rgba(255, 255, 255, 0.4),
				0.10330578512396695vh -0.10330578512396695vh 0 rgba(255, 255, 255, 0.4),
				-0.10330578512396695vh 0.10330578512396695vh 0 rgba(255, 255, 255, 0.4),
				0.10330578512396695vh 0.10330578512396695vh 0vh rgba(255, 255, 255, 0.4),
				0vh -0.2066115702479339vh 8px, 0 0 0.2066115702479339vh,
				0vh 0vh 0.5165289256198347vh #ff7e00, 0vh 0vh 1.5495867768595042vh #f44,
				0vh 0vh 0.2066115702479339vh #ff7e00, 0vh 0.2066115702479339vh 0.30991735537190085vh #000;
		}
		20%,
		21.999%,
		63%,
		63.999%,
		65%,
		69.999% {
			opacity: 0.4;
			text-shadow: none;
		}
	}

	@font-face {
		font-family: 'CoreCircus2DDot1';
		src: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/209981/333BF4_1_0.eot');
		src: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/209981/333BF4_1_0.eot?#iefix')
				format('embedded-opentype'),
			url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/209981/333BF4_1_0.woff2') format('woff2'),
			url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/209981/333BF4_1_0.woff') format('woff'),
			url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/209981/333BF4_1_0.ttf') format('truetype');
	}
	@font-face {
		font-family: 'CoreCircus';
		src: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/209981/333BF4_8_0.eot');
		src: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/209981/333BF4_8_0.eot?#iefix')
				format('embedded-opentype'),
			url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/209981/333BF4_8_0.woff2') format('woff2'),
			url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/209981/333BF4_8_0.woff') format('woff'),
			url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/209981/333BF4_8_0.ttf') format('truetype');
	}
</style>
