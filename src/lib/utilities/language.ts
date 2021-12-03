import { LANGUAGE_MAPPER } from '$lib/utilities/config';

export const getLangIdByPath = (path: string | null): Number => {
	if (path === null || path === undefined) {
		return 0;
	}

	// non seo url
	const regex = /lang=(\d+)/;
	let langId = regex.exec(path);

	if (langId !== null) {
		return parseInt(langId[2]);
	}

	// seo url
	const lang = path.substring(0, 2);

	for (let i = 0; i < LANGUAGE_MAPPER.length; i++) {
		if (LANGUAGE_MAPPER[i] === lang) {
			return i;
		}
	}

	return 0;
};

export const getLangStringByPath = (path: string | null): String => {
	if (path === null || path === undefined) {
		return LANGUAGE_MAPPER[0];
	}

	// non seo url
	const regex = /lang=(\d+)/;
	let langId = regex.exec(path);

	if (langId !== null) {
		return LANGUAGE_MAPPER[parseInt(langId[2])];
	}

	// seo url
	const lang = path.substring(0, 2);

	for (let i = 0; i < LANGUAGE_MAPPER.length; i++) {
		if (LANGUAGE_MAPPER[i] === lang) {
			return LANGUAGE_MAPPER[i];
		}
	}

	return LANGUAGE_MAPPER[0];
};
