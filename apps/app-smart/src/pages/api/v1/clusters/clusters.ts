import type { NextApiRequest, NextApiResponse } from 'next';
import {
  composeMiddleware,
  allowedMethods,
  sessionCheck,
} from 'lib/middleware';
import axios from 'axios';
import { cmsRootUserLogin } from 'server/auth';

type ResponseData = {
  message?: string;
  data?: object;
};

const QUERY = `
query Clusters {
  clusters {
    id
    name
    description
    updatedAt
    listsCount
  }
}
`;

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  const { data } = await axios.post(process.env.NEXT_PUBLIC_GRAPHQL_URL!, {
    query: QUERY,
  });

  cmsRootUserLogin();

  res.status(200).json({ data: data?.data?.clusters });
};

export default composeMiddleware([
  allowedMethods(['POST']),
  sessionCheck(),
  handler,
]);
