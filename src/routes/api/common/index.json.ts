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
	const { url, langId } = request.body;
	const cookies = cookie.parse(request.headers.cookie || '');

	let authToken = null;

	if (cookies?.authToken?.length > 0) {
		authToken = cookies?.authToken;
	} else {
		// ToDo: redirect to login
	}

	const client = await getClient(authToken);

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
        },
        objectBySeoUrl(url: $url){
            type
            id
            lang
            bredcrumbs {
                link
                title
            }
            article {
                id
                title
                shortDescription
                longDescription
                shortLink
                ratingAverage
                varSelection
                sku
                isBuyable
                variantSelection {
                    selectedVariant
                    variants {
                        label
                        isEnriched
                        list {
                            name
                            value
                            active
                            disabled
                            type
                          	colorCode
                          	image
                        }
                        activeSelection {
                            name
                            value
                            active
                            disabled
                            type
                          	colorCode
                          	image
                        }
                    }
                } 
                formattedPrice
                imageGallery {
                    images {
                        image
                        icon
                        zoom
                    }
                    icon
                    thumb
                }
                crossSelling {
                    id
                    title
                    formattedPrice
                    shortLink
                    imageGallery {
                        images {
                
                            zoom
                          }
                    }
                }
            }
            category {
                id
                title
                shortDescription
                longDescription
                previewImage
                icon
                children {
                    title
                    shortDescription
                    shortLink
                    thumbnail
                    icon
                    seo {
                        description
                        keywords
                        url
                    } 
                }
                products {
                    id
                    title
                    shortDescription
                    shortLink
                    formattedPrice
                    imageGallery {
                        images {
                            image
                            icon
                            zoom
                        }
                        icon
                        thumb
                    }
                }
            }
        } 
    }`;

	const result = await client.query(query, { url, langId }).toPromise();

	return {
		status: 200,
		body: result?.data
	};
}
