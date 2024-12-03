import { createAuth0User, getAuth0Token } from '@/utils/api';

const Auth0 = async (req: any, res: any) => {
  if (req.method === 'POST') {
    const { data } = req.body;
    let userData;
    try {
      const accessToken = await getAuth0Token();
      data.connection = 'Username-Password-Authentication';
      userData = await createAuth0User(data, accessToken, 'Bearer').then((resUser) => resUser);
    } catch (error) {
      res.status(409).send(`Error getting Auth0 token ${error}`);
    }

    // Check if userData is defined before using Object.keys
    if (userData && !Object.keys(userData).includes('statusCode')) {
      return res.status(200).json({ usuario: userData });
    } else if (userData) {
      return res.status(userData.statusCode).json({ error: userData.message });
    } else {
      return res.status(500).send('An unexpected error occurred.');
    }
  } else {
    res.status(405).send('Method not allowed');
  }
};

export default Auth0;
