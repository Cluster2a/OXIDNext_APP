<script lang="ts">
	import { enhance } from '$lib/from';

	let formSubmitting = false;

	let msgName = '';
	let msgEmail = '';
	let msgText = '';

	let errorName = false;
	let errorEmail = false;
	let errorText = false;
	let mailComplete = false;

	const formChanged = () => {
		mailComplete = false;
	};

	const handlePending = async (): Promise<void> => {
		errorName = false;
		errorEmail = false;
		errorText = false;
		mailComplete = false;
		formSubmitting = true;
	};

	const handleSubmit = async (): Promise<void> => {
		msgName = '';
		msgEmail = '';
		msgText = '';

		formSubmitting = false;
		mailComplete = true;
	};

	const handleError = async (res: Response): Promise<void> => {
		const response = await res.json();
		errorEmail = response.errorEmail === true;
		errorName = response.errorName === true;
		errorText = response.errorText === true;
		formSubmitting = false;
	};
</script>

<div class="bg-gray-100 relative">
	<div
		class="relative w-full grid gap-8 grid-cols-1 md:grid-cols-2 md:px-12 lg:px-16 xl:px-32 py-16 mx-auto text-gray-900 rounded-lg shadow-lg"
	>
		<div class="flex flex-col justify-between">
			<div>
				<h2 class="text-4xl lg:text-5xl font-bold leading-tight">You got any questions?</h2>
				<div class="text-gray-700 mt-8">
					Hate forms? Send us an <span class="underline"
						><a href="mailto: info@zorid.de" target="_blank">email</a></span
					> instead.
				</div>
			</div>
			<div class="mt-8 text-center">
				<img
					src="/img/contact-complete.svg"
					class="w-full max-w-md h-80"
					class:hidden={!mailComplete}
				/>
				<img src="/img/contact.svg" class="w-full max-w-md h-80" class:hidden={mailComplete} />
			</div>
		</div>
		<form
			action="/api/sendContactForm.json"
			method="post"
			use:enhance={{
				pending: handlePending,
				result: handleSubmit,
				error: handleError
			}}
		>
			<div>
				<span class="uppercase text-sm text-gray-600 font-bold">Full Name</span>
				<input
					class="w-full bg-gray-300 text-gray-900 mt-2 p-3 focus:outline-none focus:shadow-outline"
					type="text"
					name="name"
					placeholder=""
					on:keyup={() => formChanged()}
					required
					bind:value={msgName}
					disabled={formSubmitting}
					class:ring-red-500={errorName}
					class:ring-2={errorName}
					class:text-red-600={errorName}
					class:opacity-50={formSubmitting}
					class:cursor-not-allowed={formSubmitting}
				/>
			</div>
			<div class="mt-8">
				<span class="uppercase text-sm text-gray-600 font-bold">Email</span>
				<input
					class="w-full bg-gray-300 text-gray-900 mt-2 p-3 focus:outline-none focus:shadow-outline"
					type="email"
					name="email"
					on:keyup={() => formChanged()}
					required
					bind:value={msgEmail}
					disabled={formSubmitting}
					class:ring-red-500={errorEmail}
					class:ring-2={errorEmail}
					class:text-red-600={errorEmail}
					pattern="[^ @]*@[^ @]*"
					class:opacity-50={formSubmitting}
					class:cursor-not-allowed={formSubmitting}
				/>
			</div>
			<div class="mt-8">
				<span class="uppercase text-sm text-gray-600 font-bold">Message</span>
				<textarea
					class="disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none w-full h-32 bg-gray-300 text-gray-900 mt-2 p-3 focus:outline-none focus:shadow-outline"
					required
					bind:value={msgText}
					on:keyup={() => formChanged()}
					name="message"
					class:ring-red-500={errorText}
					class:ring-2={errorText}
					class:text-red-600={errorText}
					disabled={formSubmitting}
					class:opacity-50={formSubmitting}
					class:cursor-not-allowed={formSubmitting}
				/>
			</div>

			<div class="mt-8">
				This form collects your name, email address and your Message so we can process your request.
				Find more information in our <a href="/privacy" target="_blank">Privacy Policy</a>.
			</div>

			<div class="mt-8">
				<input
					type="checkbox"
					name="contact_me_by_fax_only"
					value="1"
					style="display:none !important"
					tabindex="-1"
					autocomplete="off"
				/>
				<button
					type="submit"
					disabled={formSubmitting}
					class:cursor-not-allowed={formSubmitting}
					class:hover:bg-orange-700={!formSubmitting}
					class:hover:text-white={!formSubmitting}
					class="relative inline-block flex inline-flex items-center justify-center border-2 border-orange-700 font-light text-orange-700 text-sm uppercase tracking-wide w-full py-3 px-8"
				>
					{#if formSubmitting === true}
						<svg
							class="animate-spin -ml-1 h-5 w-5"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
						>
							<circle
								class="opacity-25"
								cx="12"
								cy="12"
								r="10"
								stroke="currentColor"
								stroke-width="4"
							/>
							<path
								class="opacity-75"
								fill="currentColor"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
							/>
						</svg>
					{:else}
						Send Message
					{/if}
				</button>
			</div>
		</form>
	</div>
</div>
