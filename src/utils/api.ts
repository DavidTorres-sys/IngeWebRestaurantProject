/* eslint-disable @typescript-eslint/no-explicit-any */
const makePost = (
	url: string,
	body: string,
	options: { headers?: Record<string, string> }
) => {
	const headers = options.headers || {};
	return fetch(url, {
		body,
		headers,
		method: 'POST',
	}).then((res) => {
		if (res.statusText === 'No Content') {
			return res;
		}
		return res.json();
	});
};

const makeJSONPost = (
	url: string,
	data: any,
	options: { headers: Record<string, string> }
) => {
	const body = JSON.stringify(data);
	const headers = options.headers || {};
	headers['Content-Type'] = 'application/json';
	return makePost(url, body, { headers });
};

export const getAuth0Token = async () => {
	try {
		const response = await fetch(`https://${process.env.AUTH0_DOMAIN}/oauth/token`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				client_id: process.env.AUTH0_CLIENT_ID,
				client_secret: process.env.AUTH0_CLIENT_SECRET,
				audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
				grant_type: 'client_credentials',
			}),
		});

		if (!response.ok) {
			const errorDetails = await response.json();
			throw new Error(`Failed to fetch token: ${errorDetails.error_description}`);
		}

		const text = await response.text();

		const data = JSON.parse(text);
		return data.access_token;
	} catch (error) {
		console.error('Error fetching Auth0 token:', error);
		throw error;
	}
};


export const createAuth0User = async (
	data: any,
	token: any,
	tokenType: any
) => {
	const url = `https://${process.env.AUTH0_DOMAIN}/api/v2/users`;
	const headers = {
		Authorization: `${tokenType} ${token}`,
	};
	const body = data;
	return makeJSONPost(url, body, { headers });
};

export const createUser = (data: any) => {
	const url = `/api/auth0`;
	const body = { data };
	return makeJSONPost(url, body, { headers: {} });
};
