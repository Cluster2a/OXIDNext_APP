<script lang="ts">
	import { onMount } from 'svelte';

	let particlesUrl = '/particles.json';
	let particlesComponent: any;

	onMount(async () => {
		const module = await import('svelte-particles');
		particlesComponent = module.default;
	});
</script>

<svelte:component this={particlesComponent} id="tsparticles" url={particlesUrl} />
