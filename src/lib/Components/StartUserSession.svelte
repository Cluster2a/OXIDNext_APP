<script context="module">
	export async function load({ fetch, page }) {
		await fetch('/api/user/login.json', {
			method: 'POST',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email: 'null', password: 'null' })
		});

		return {};
	}
</script>
