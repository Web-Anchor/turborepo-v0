import type { NextApiRequest, NextApiResponse } from 'next';
import {
  composeMiddleware,
  allowedMethods,
  sessionCheck,
} from 'lib/middleware';
import axios from 'axios';

type ResponseData = {
  message?: string;
  data?: object;
};

const QUERY = `
  query Q($where: ClusterWhereUniqueInput!) {
    cluster(where: $where) {
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
    variables: {
      where: { id: req.body.id },
    },
  });

  res.status(200).json({ data: data?.data?.cluster });
};

export default composeMiddleware([
  allowedMethods(['POST']),
  sessionCheck(),
  handler,
]);
