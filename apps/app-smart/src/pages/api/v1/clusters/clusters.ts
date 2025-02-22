import type { NextApiRequest, NextApiResponse } from 'next';
import {
  composeMiddleware,
  allowedMethods,
  // sessionCheck,
} from 'lib/middleware';

type ResponseData = {
  message: string;
};

const handler = (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
  // body of the API
  // if (req.method !== 'POST') {
  //   res.status(405).json({ message: 'Method Not Allowed' });
  //   return;
  // }

  // validate request body
  // if (!req.body.userId) {
  //   res.status(400).json({ message: 'Missing userId in request body' });
  //   return;
  // }

  // perform some operation with the userId
  // ...
  console.log('Request body:', req.body);

  // return response
  res.status(200).json({ message: 'User clusters fetched successfully' });
};

export default composeMiddleware([
  allowedMethods(['POST']),
  // sessionCheck(),
  handler,
]);
