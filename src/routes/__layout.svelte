<script context="module" lang="ts">
	export async function load({ fetch, url }) {
		return {};
		await fetch('/api/user/login.json', {
			method: 'POST',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email: null, password: null, page: url.host })
		});

		return {};
	}
</script>

<script lang="ts">
	import 'virtual:windi.css';
	import '@fontsource/comfortaa';
	import '../styles/site.css';
</script>

<slot />
