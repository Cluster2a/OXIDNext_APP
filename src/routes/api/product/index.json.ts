import { Client, createClient } from '$lib/graphql';
import { GRAPHQL_ENDPOINT } from '$lib/utilities/config';
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

export async function post(request) {
	const { productId, selectedVariants } = request.body;
	const cookies = cookie.parse(request.headers.cookie || '');

	let authToken = null;

	if (cookies?.authToken?.length > 0) {
		authToken = cookies?.authToken;
	} else {
		// ToDo: redirect to login
	}

	const client = await getClient(authToken);

	const query = `query($productId: ID!, $selectedVariants: [SelectedVariants!]) {
        product(productId: $productId){
            id
            title
            varSelection
			variantSelection(selectedVariants: $selectedVariants) {
				selectedVariant
				variants {
					label
					list {
						name
						value
						active
						disabled
					}
					activeSelection {
						name
						value
						active
						disabled
					}
				}
			} 
            imageGallery {
                images {
                    image
                    icon
                    zoom
                }
                icon
                thumb
            } 
            shortDescription
            formattedPrice
            sku
            isBuyable
        } 
    }`;

	const result = await client.query(query, { productId, selectedVariants }).toPromise();

	return {
		status: 200,
		body: result?.data
	};
}
