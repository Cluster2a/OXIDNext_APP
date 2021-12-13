import { Client, createClient } from '$lib/graphql';
import { GRAPHQL_ENDPOINT, JWT_SECRET } from '$lib/utilities/config';
import JWT from 'jsonwebtoken';
import cookie from 'cookie';

const getClient = async (): Promise<Client> => {
	return await createClient({
		url: GRAPHQL_ENDPOINT,
		fetch,
		dev: true
	});
};

const login = async (username: string, password: string): Promise<string> => {
	const client = await getClient();
	const query = `query {
        token
    }`;

	const result = await client.query(query).toPromise();
	const token: string = result.data.token;

	return token;
};

export async function post(request) {
	const { username, password } = request.body;
	const cookies = cookie.parse(request.headers.cookie || '');

	let authToken = null;

	if (cookies?.authToken?.length > 0) {
		authToken = cookies?.authToken;
		try {
			JWT.verify(authToken, JWT_SECRET);
		} catch (err) {
			authToken = await login(username, password);
		}
	} else {
		authToken = await login(username, password);
	}

	request.locals.authToken = authToken;

	return {
		status: 200
	};
}
