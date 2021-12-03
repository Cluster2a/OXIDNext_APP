export default (url: string, queryParams: URLSearchParams) => {
	let i = 0;
	queryParams.forEach(function (value, key) {
		url += (i === 0 ? '?' : '&') + key + '=' + value;
		i++;
	});

	url = url.replace(/^\//, '');

	return url;
};
