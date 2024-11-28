const makePost = (url: string, body: string, options: { headers?: { [key: string]: string } }) => {
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

const makeJSONPost = (url: string, data: any, options: { headers: { [key: string]: string } }) => {
  const body = JSON.stringify(data);
  const headers = options.headers || {};
  headers['Content-Type'] = 'application/json';

  return makePost(url, body, { headers });
};

export const getAuth0Token = async () => {
  const url = `https://dev-xarv5ryn3fxcb3yp.us.auth0.com/oauth/token`;
  const headers = { 'content-type': 'application/json' };
  const body = {
    client_id: 'V0eG3Tb8wiDXpD9MQtwwncnrXesiSzaj',
    client_secret: 'ioPd3tXU00-qnxTCmm4nRrZ9XZhKLLYbT0Gv1YokQBjKUlQTF7yBfWk9kSQf6sCo',
    audience: 'https://dev-xarv5ryn3fxcb3yp.us.auth0.com/api/v2/',
    grant_type: 'client_credentials',
  };
  return makeJSONPost(url, body, { headers });
};

//TODO: cambiar URL POR NUESTRA URL
export const createAuth0User = async (data: any, token: any, tokenType: any) => {
  const url = `https://dev-xarv5ryn3fxcb3yp.us.auth0.com/api/v2`;
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
