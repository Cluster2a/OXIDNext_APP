import type { EndpointOutput } from '@sveltejs/kit';

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function post(): Promise<EndpointOutput> {
	return {
		body: { Location: '/top/rss' }
	};
}
