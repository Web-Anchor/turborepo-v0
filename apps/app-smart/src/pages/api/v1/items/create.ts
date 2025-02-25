import type { NextApiRequest, NextApiResponse } from 'next';
import {
  composeMiddleware,
  allowedMethods,
  sessionCheck,
} from 'lib/middleware';
import axios from 'axios';
import { errorCather } from 'server/utils';

type ResponseData = {
  message?: string;
  data?: object;
};

const MUTATION = `
  mutation CreateItem($data: ItemCreateInput!) {
    createItem(data: $data) {
      id
    }
  }
`;

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  const { data } = await axios.post(process.env.NEXT_PUBLIC_GRAPHQL_URL!, {
    query: MUTATION,
    variables: {
      data: req.body,
    },
  });
  await errorCather({ data, res });

  res.status(200).json({ data: data?.data?.createCluster });
};

export default composeMiddleware([
  allowedMethods(['POST']),
  sessionCheck(),
  handler,
]);
