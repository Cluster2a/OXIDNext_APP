import { Client, createClient } from '$lib/graphql';
import { GRAPHQL_ENDPOINT } from '$lib/utilities/config';
import type { EndpointOutput } from '@sveltejs/kit';
import cookie from 'cookie';

let client = null;

const getClient = async (authToken: string): Promise<Client> => {
	if (client === null) {
		client = await createClient({
			url: GRAPHQL_ENDPOINT,
			fetch,
			dev: true, // ToDo: disable dev
			fetchOptions: () => {
				return authToken ? { headers: { Authorization: `Bearer ${authToken}` } } : {};
			}
		});
	}
	return client;
};

export async function post(request): Promise<EndpointOutput> {
	const cookies = cookie.parse(request.headers.cookie || '');

	let authToken = null;
	let basketId = null;

	if (cookies?.authToken?.length > 0) {
		authToken = cookies?.authToken;
	} else {
		// ToDo: redirect to login
	}

	if (cookies?.basketId?.length > 0) {
		basketId = cookies?.basketId;
	} else {
		// ToDo: redirect to login
	}

	const client = await getClient(authToken);

	const query = `query($basketId: ID!){
		basket(basketId: $basketId){
			items(pagination: null) {
				product {
					id
					title
					varSelection
					imageGallery {
						icon
						thumb
					}
				}
				amount
			}
			cost {
				productNet {
					currency {
						sign
					}
					price
				}
			}
		}
	}`;

	const result = await client.query(query, { basketId }).toPromise();

	return {
		status: 200,
		body: result?.data
	};
}
