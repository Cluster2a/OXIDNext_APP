<script context="module">
	import { GRAPHQL_ENDPOINT } from '$lib/utilities/config';
	import { browser, dev } from '$app/env';
	import createUrl from '$lib/utilities/urlCreator';
	import { getLangIdByPath } from '$lib/utilities/language';
	import { createClient } from '$lib/graphql';

	export async function load({ fetch, page, session }) {
		const url = createUrl(page.path, page.query);
		const langId = getLangIdByPath(url);

		let authToken = null;

		if (
			session &&
			Object.keys(session).length !== 0 &&
			Object.getPrototypeOf(session) !== Object.prototype
		) {
			authToken = session.get('authToken');
		}

		const client = await createClient({
			url: GRAPHQL_ENDPOINT,
			fetch,
			dev: browser && dev,
			fetchOptions: () => {
				return authToken ? { headers: { Authorization: `Bearer ${authToken}` } } : {};
			}
		});

		const query = `query($langId: Int!, $url: String!) {
			
			languages(langId: $langId, url: $url){
				id,
				name,
				abbr,
				selected,
				url
			},
			categorieTree(langId: $langId){
				title
				id
				link
				subCategories {
					title
					id
					link
				}
			} 
		}`;

		const result = await client.query(query, { url, langId }).toPromise();

		return {
			props: {
				objectBySeoUrl: result?.data?.objectBySeoUrl,
				categorieTree: result?.data?.categorieTree,
				languages: result?.data?.languages,
				graphQLError: typeof result?.error !== 'undefined'
			}
		};
	}
</script>

<script lang="ts">
	import Header from '$lib/Components/Header/index.svelte';
	import Footer from '$lib/Components/Footer/index.svelte';
	import type {
		Common as CommonType,
		CategoryTree as CategoryTreeType,
		Language as LanguageType
	} from '$lib/generated/graphql';

	export let objectBySeoUrl: CommonType;
	export let categorieTree: CategoryTreeType[];
	export let languages: LanguageType[];
	export let graphQLError: boolean;
</script>

<Header {categorieTree} {languages} />
<main>
	<!-- Hero -->
	<div class="masterhead flex flex-col border-b w-full h-screen lg:border-0">
		<div class="relative">
			<div aria-hidden="true" class="hidden absolute w-full h-screen bg-gray-700 lg:block">
				<div
					class="w-full h-full absolute"
					style="background-image: linear-gradient(rgba(0,0,0,1),rgba(0,0,0,0.2));"
				/>
				<img src="/img/background.webp" class="w-full h-full object-cover top-0 left-0 abbsolute" />
			</div>
			<div class="relative bg-gray-900 lg:bg-transparent">
				<div class="max-w-7xl z-10 mx-auto px-4 sm:px-6 lg:px-8 lg:grid lg:grid-cols-2">
					<div class="max-w-2xl mx-auto py-24 lg:py-64 lg:max-w-none">
						<div class="lg:pr-16">
							<h1
								class="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl xl:text-6xl"
							>
								OXID next
							</h1>
							<p class="mt-4 text-xl text-gray-600">
								All the charts, datepickers, and notifications in the world can't beat checking off
								some items on a paper card.
								<a sveltekit:prefetch href="/lang/ger" class="box">Link</a>
							</p>
							<div class="mt-6">
								<a
									sveltekit:prefetch
									href="startseite/"
									class="inline-block bg-indigo-600 border border-transparent py-3 px-8 font-medium text-white hover:bg-indigo-700"
									>Zum Shop</a
								>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</main>
