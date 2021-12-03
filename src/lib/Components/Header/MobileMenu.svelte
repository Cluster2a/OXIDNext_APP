<!--
	  Mobile menu
  
	  Off-canvas menu for mobile, show/hide based on off-canvas menu state.
	-->
<div class="fixed inset-0 flex z-40 lg:hidden" role="dialog" aria-modal="true">
	<!--
		Off-canvas menu overlay, show/hide based on off-canvas menu state.
  
		Entering: "transition-opacity ease-linear duration-300"
		  From: "opacity-0"
		  To: "opacity-100"
		Leaving: "transition-opacity ease-linear duration-300"
		  From: "opacity-100"
		  To: "opacity-0"
	  -->
	<div class="fixed inset-0 bg-black bg-opacity-25" aria-hidden="true" />

	<!--
		Off-canvas menu, show/hide based on off-canvas menu state.
  
		Entering: "transition ease-in-out duration-300 transform"
		  From: "-translate-x-full"
		  To: "translate-x-0"
		Leaving: "transition ease-in-out duration-300 transform"
		  From: "translate-x-0"
		  To: "-translate-x-full"
	  -->
	<div class="relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto">
		<div class="px-4 pt-5 pb-2 flex">
			<button
				type="button"
				class="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
			>
				<span class="sr-only">Close menu</span>
				<!-- Heroicon name: outline/x -->
				<svg
					class="h-6 w-6"
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
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			</button>
		</div>

		<!-- Links -->
		<div class="mt-2">
			<div class="border-b border-gray-200">
				<div class="-mb-px flex px-4 space-x-8" aria-orientation="horizontal" role="tablist">
					<!-- Selected: "text-indigo-600 border-indigo-600", Not Selected: "text-gray-900 border-transparent" -->
					<button
						id="tabs-1-tab-1"
						class="text-gray-900 border-transparent flex-1 whitespace-nowrap py-4 px-1 border-b-2 text-base font-medium"
						aria-controls="tabs-1-panel-1"
						role="tab"
						type="button"
					>
						Women
					</button>

					<!-- Selected: "text-indigo-600 border-indigo-600", Not Selected: "text-gray-900 border-transparent" -->
					<button
						id="tabs-1-tab-2"
						class="text-gray-900 border-transparent flex-1 whitespace-nowrap py-4 px-1 border-b-2 text-base font-medium"
						aria-controls="tabs-1-panel-2"
						role="tab"
						type="button"
					>
						Men
					</button>
				</div>
			</div>

			<!-- 'Women' tab panel, show/hide based on tab state. -->
			<div
				id="tabs-1-panel-1"
				class="px-4 pt-10 pb-6 space-y-12"
				aria-labelledby="tabs-1-tab-1"
				role="tabpanel"
				tabindex="0"
			>
				<div class="grid grid-cols-1 items-start gap-y-10 gap-x-6">
					<div class="grid grid-cols-1 gap-y-10 gap-x-6">
						<div>
							<p id="mobile-featured-heading-0" class="font-medium text-gray-900">Featured</p>
							<ul role="list" aria-labelledby="mobile-featured-heading-0" class="mt-6 space-y-6">
								<li class="flex">
									<a href="#" class="text-gray-500"> Sleep </a>
								</li>

								<li class="flex">
									<a href="#" class="text-gray-500"> Swimwear </a>
								</li>

								<li class="flex">
									<a href="#" class="text-gray-500"> Underwear </a>
								</li>
							</ul>
						</div>
						<div>
							<p id="mobile-categories-heading" class="font-medium text-gray-900">Categories</p>
							<ul role="list" aria-labelledby="mobile-categories-heading" class="mt-6 space-y-6">
								<li class="flex">
									<a href="#" class="text-gray-500"> Basic Tees </a>
								</li>

								<li class="flex">
									<a href="#" class="text-gray-500"> Artwork Tees </a>
								</li>

								<li class="flex">
									<a href="#" class="text-gray-500"> Bottoms </a>
								</li>

								<li class="flex">
									<a href="#" class="text-gray-500"> Underwear </a>
								</li>

								<li class="flex">
									<a href="#" class="text-gray-500"> Accessories </a>
								</li>
							</ul>
						</div>
					</div>
					<div class="grid grid-cols-1 gap-y-10 gap-x-6">
						<div>
							<p id="mobile-collection-heading" class="font-medium text-gray-900">Collection</p>
							<ul role="list" aria-labelledby="mobile-collection-heading" class="mt-6 space-y-6">
								<li class="flex">
									<a href="#" class="text-gray-500"> Everything </a>
								</li>

								<li class="flex">
									<a href="#" class="text-gray-500"> Core </a>
								</li>

								<li class="flex">
									<a href="#" class="text-gray-500"> New Arrivals </a>
								</li>

								<li class="flex">
									<a href="#" class="text-gray-500"> Sale </a>
								</li>
							</ul>
						</div>

						<div>
							<p id="mobile-brand-heading" class="font-medium text-gray-900">Brands</p>
							<ul role="list" aria-labelledby="mobile-brand-heading" class="mt-6 space-y-6">
								<li class="flex">
									<a href="#" class="text-gray-500"> Full Nelson </a>
								</li>

								<li class="flex">
									<a href="#" class="text-gray-500"> My Way </a>
								</li>

								<li class="flex">
									<a href="#" class="text-gray-500"> Re-Arranged </a>
								</li>

								<li class="flex">
									<a href="#" class="text-gray-500"> Counterfeit </a>
								</li>

								<li class="flex">
									<a href="#" class="text-gray-500"> Significant Other </a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>

			<!-- 'Men' tab panel, show/hide based on tab state. -->
			<div
				id="tabs-1-panel-2"
				class="px-4 pt-10 pb-6 space-y-12"
				aria-labelledby="tabs-1-tab-2"
				role="tabpanel"
				tabindex="0"
			>
				<div class="grid grid-cols-1 items-start gap-y-10 gap-x-6">
					<div class="grid grid-cols-1 gap-y-10 gap-x-6">
						<div>
							<p id="mobile-featured-heading-1" class="font-medium text-gray-900">Featured</p>
							<ul role="list" aria-labelledby="mobile-featured-heading-1" class="mt-6 space-y-6">
								<li class="flex">
									<a href="#" class="text-gray-500"> Casual </a>
								</li>

								<li class="flex">
									<a href="#" class="text-gray-500"> Boxers </a>
								</li>

								<li class="flex">
									<a href="#" class="text-gray-500"> Outdoor </a>
								</li>
							</ul>
						</div>
						<div>
							<p id="mobile-categories-heading" class="font-medium text-gray-900">Categories</p>
							<ul role="list" aria-labelledby="mobile-categories-heading" class="mt-6 space-y-6">
								<li class="flex">
									<a href="#" class="text-gray-500"> Artwork Tees </a>
								</li>

								<li class="flex">
									<a href="#" class="text-gray-500"> Pants </a>
								</li>

								<li class="flex">
									<a href="#" class="text-gray-500"> Accessories </a>
								</li>

								<li class="flex">
									<a href="#" class="text-gray-500"> Boxers </a>
								</li>

								<li class="flex">
									<a href="#" class="text-gray-500"> Basic Tees </a>
								</li>
							</ul>
						</div>
					</div>
					<div class="grid grid-cols-1 gap-y-10 gap-x-6">
						<div>
							<p id="mobile-collection-heading" class="font-medium text-gray-900">Collection</p>
							<ul role="list" aria-labelledby="mobile-collection-heading" class="mt-6 space-y-6">
								<li class="flex">
									<a href="#" class="text-gray-500"> Everything </a>
								</li>

								<li class="flex">
									<a href="#" class="text-gray-500"> Core </a>
								</li>

								<li class="flex">
									<a href="#" class="text-gray-500"> New Arrivals </a>
								</li>

								<li class="flex">
									<a href="#" class="text-gray-500"> Sale </a>
								</li>
							</ul>
						</div>

						<div>
							<p id="mobile-brand-heading" class="font-medium text-gray-900">Brands</p>
							<ul role="list" aria-labelledby="mobile-brand-heading" class="mt-6 space-y-6">
								<li class="flex">
									<a href="#" class="text-gray-500"> Significant Other </a>
								</li>

								<li class="flex">
									<a href="#" class="text-gray-500"> My Way </a>
								</li>

								<li class="flex">
									<a href="#" class="text-gray-500"> Counterfeit </a>
								</li>

								<li class="flex">
									<a href="#" class="text-gray-500"> Re-Arranged </a>
								</li>

								<li class="flex">
									<a href="#" class="text-gray-500"> Full Nelson </a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="border-t border-gray-200 py-6 px-4 space-y-6">
			<div class="flow-root">
				<a href="#" class="-m-2 p-2 block font-medium text-gray-900">Company</a>
			</div>

			<div class="flow-root">
				<a href="#" class="-m-2 p-2 block font-medium text-gray-900">Stores</a>
			</div>
		</div>

		<div class="border-t border-gray-200 py-6 px-4 space-y-6">
			<div class="flow-root">
				<a href="#" class="-m-2 p-2 block font-medium text-gray-900">Create an account</a>
			</div>
			<div class="flow-root">
				<a href="#" class="-m-2 p-2 block font-medium text-gray-900">Sign in</a>
			</div>
		</div>

		<div class="border-t border-gray-200 py-6 px-4 space-y-6">
			<!-- Currency selector -->
			<form>
				<div class="inline-block">
					<label for="mobile-currency" class="sr-only">Currency</label>
					<div
						class="-ml-2 group relative border-transparent rounded-md focus-within:ring-2 focus-within:ring-white"
					>
						<select
							id="mobile-currency"
							name="currency"
							class="bg-none border-transparent rounded-md py-0.5 pl-2 pr-5 flex items-center text-sm font-medium text-gray-700 group-hover:text-gray-800 focus:outline-none focus:ring-0 focus:border-transparent"
						>
							<option>CAD</option>

							<option>USD</option>

							<option>AUD</option>

							<option>EUR</option>

							<option>GBP</option>
						</select>
						<div class="absolute right-0 inset-y-0 flex items-center pointer-events-none">
							<svg
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 20 20"
								class="w-5 h-5 text-gray-500"
							>
								<path
									stroke="currentColor"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="1.5"
									d="M6 8l4 4 4-4"
								/>
							</svg>
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>
</div>
