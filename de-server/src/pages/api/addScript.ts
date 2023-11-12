import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';

type Data = {
  result: unknown;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'POST', 'HEAD', 'OPTIONS', 'PUT'],
    origin: '*', // FLAG : ***Allows requests from any origin*** 
    optionsSuccessStatus: 200,
  });


  const { siteId } = req.body;

  const headersList = {
    Authorization: `Bearer ${process.env.TOKEN}`,
    'Content-Type': 'application/json',
  };

  const scriptVersion = process.env.VERSION;

  const bodyContent = JSON.stringify({
    scripts: [
      {
        id: 'threeman',
        location: 'header',
        version: scriptVersion,
      },
    ],
  });

  const reqOptions = {
    url: `https://api.webflow.com/beta/sites/${siteId}/custom_code`,
    method: 'PUT',
    headers: headersList,
    data: bodyContent,
  };

  try {
    const response = await axios.request(reqOptions);
    res.status(200).json({ result: response.data });
  } catch (error) {
    res.status(500).json({ result: 'An error occurred' });
  }

}
