import cookie from 'cookie';
const COOKIE_NAME_AUTH_TOKEN = 'authToken';
const COOKIE_NAME_BASKET_ID = 'basketId';

export async function getSession(request) {
	if (request.locals.authToken) {
		return { authToken: request.locals.authToken };
	}
	return {};
}

export async function handle({ request, resolve }) {
	const loggingOut = request.path === '/api/logout.json';
	const cookies = cookie.parse(request.headers.cookie || '');

	request.locals.authToken = cookies[COOKIE_NAME_AUTH_TOKEN];
	request.locals.basketId = cookies[COOKIE_NAME_BASKET_ID];

	const response = await resolve(request);

	const authToken = loggingOut ? '' : request.locals.authToken;
	const basketId = request.locals.basketId;

	const secure = process.env.NODE_ENV === 'production';
	const maxAge = 7_200; // (3600 seconds / hour) * 2 hours
	const sameSite = 'Strict';
	const setAuthCookieValue = `${COOKIE_NAME_AUTH_TOKEN}=${
		authToken || ''
	}; Max-Age=${maxAge}; Path=/; ${secure ? 'Secure;' : ''} HttpOnly; SameSite=${sameSite},`;

	const setBasketCookieValue = `${COOKIE_NAME_BASKET_ID}=${
		basketId || ''
	}; Max-Age=${maxAge}; Path=/; ${secure ? 'Secure;' : ''} HttpOnly; SameSite=${sameSite},`;

	return {
		...response,
		headers: {
			...response.headers,
			...(authToken || loggingOut
				? { 'Set-Cookie': [setAuthCookieValue, setBasketCookieValue] }
				: {})
		}
	};
}
