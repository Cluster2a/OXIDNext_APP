<script lang="ts">
	import RatingStar from './RatingStar.svelte';
	export let ratingAverage: number;
</script>

<!-- Reviews -->
<div class="mt-3">
	<h3 class="sr-only">Reviews</h3>
	<div class="flex items-center">
		<div class="flex items-center">
			{#each Array(5) as _, i}
				<RatingStar filled={ratingAverage > i || ratingAverage === 5} />
			{/each}
		</div>
	</div>
</div>
