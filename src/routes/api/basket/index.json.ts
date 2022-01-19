import { Client, createClient } from '$lib/graphql';
import type { Basket } from '$lib/generated/graphql';
import { GRAPHQL_ENDPOINT } from '$lib/utilities/config';
import type { EndpointOutput } from '@sveltejs/kit';
import cookie from 'cookie';
import { v4 as uuidv4 } from 'uuid';

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

export const getUserBasket = async (authToken: string, basketId: string): Promise<Basket> => {
	const client = await getClient(authToken);

	const query = `query($basketId: ID!){
		basket(basketId: $basketId){
			formattedNetPrice
			items(pagination: null) {
				id
				formattedNetPrice
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

	return result.data;
};

export async function get(request): Promise<EndpointOutput> {
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

	const result = await getUserBasket(authToken, basketId);

	return {
		status: 200,
		body: result
	};
}

export const createUserBasket = async (authToken: string): Promise<Basket> => {
	const client = await getClient(authToken);

	const query = `
        mutation($basket: BasketInput!) {
            basketCreate(basket: $basket){
                id
            }
        }
    `;

	const title = uuidv4();

	const basket = {
		title,
		public: false
	};

	const result = await client.mutation(query, { basket }).toPromise();
	return result.data.basketCreate.id;
};

export const addToUserBasket = async (
	authToken: string,
	basketId: string,
	productId: string,
	amount: number
): Promise<Basket> => {
	const client = await getClient(authToken);

	const query = `
        mutation($basketId: ID!, $productId: ID!, $amount: Float!) {
            basketAddItem(basketId: $basketId, productId: $productId, amount: $amount){
                id
            }
        }
    `;

	const result = await client.mutation(query, { basketId, productId, amount }).toPromise();
	return result.data.basketAddItem.id;
};

export const deleteFromUserBasket = async (
	authToken: string,
	basketId: string,
	basketItemId: string,
	amount: number
): Promise<Basket> => {
	const client = await getClient(authToken);

	const query = `
        mutation($basketId: ID!, $basketItemId: ID!, $amount: Float!) {
            basketRemoveItem(basketId: $basketId, basketItemId: $basketItemId, amount: $amount){
                id
            }
        }
    `;

	const result = await client.mutation(query, { basketId, basketItemId, amount }).toPromise();
	return result.data.basketRemoveItem.id;
};

export async function post(request) {
	const { productId, qty } = request.body;
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
		basketId = await createUserBasket(authToken);
	}

	await addToUserBasket(authToken, basketId, productId, parseFloat(qty));

	request.locals.basketId = basketId;

	return {
		status: 200,
		body: {
			itemAmount: qty
		}
	};
}

export async function del(request) {
	const basketItemId = request.url.searchParams.get('basketItemId');
	const amount = request.url.searchParams.get('amount');
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
		await deleteFromUserBasket(authToken, basketId, basketItemId, parseFloat(amount));
		const result = await getUserBasket(authToken, basketId);
		return {
			status: 200,
			body: result
		};
	}

	return {
		status: 400,
		body: {}
	};
}
