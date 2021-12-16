<script lang="ts">
	export let amount: number = 0;
</script>

<div class="mt-8 -my-6">
	{#each Array(amount) as _, i}
		<div class="animate-pulse flex space-x-4 py-6">
			<div class="bg-gray-200 rounded-md w-24 h-24" />
			<div class="flex-1 space-y-3 py-1">
				<div class="grid grid-cols-5 gap-4">
					<div class="h-4 bg-gray-200 rounded col-span-3" />
					<div class="h-4 rounded col-span-1" />
					<div class="h-4 bg-gray-200 rounded col-span-1" />
				</div>
				<div class="space-y-3">
					<div class="grid grid-cols-3 gap-4">
						<div class="h-4 bg-gray-200 rounded col-span-1" />
					</div>
				</div>

				<div class="space-y-3">
					<div class="grid grid-cols-3 gap-4" />
				</div>

				<div class="space-y-3">
					<div class="grid grid-cols-4 gap-4">
						<div class="h-4 bg-gray-200 rounded col-span-1" />
						<div class="h-4 col-span-1" />
						<div class="h-4 col-span-1" />
						<div class="h-4 bg-gray-200 rounded col-span-1" />
					</div>
				</div>
			</div>
		</div>
	{/each}
</div>
