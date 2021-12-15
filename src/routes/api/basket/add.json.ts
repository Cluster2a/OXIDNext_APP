import type { Basket } from '$lib/generated/graphql';
import { Client, createClient } from '$lib/graphql';
import { GRAPHQL_ENDPOINT } from '$lib/utilities/config';
import { v4 as uuidv4 } from 'uuid';
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
