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

const MUTATION = `
  mutation CreateCluster($data: ClusterCreateInput!){
    createCluster(data: $data) {
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
  console.log(data);

  res.status(200).json({ data: data?.data });
};

export default composeMiddleware([
  allowedMethods(['POST']),
  sessionCheck(),
  handler,
]);
