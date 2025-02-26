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
  mutation M($where: ItemWhereUniqueInput!, $data: ItemUpdateInput!) {
    updateItem(where: $where, data: $data) {
      id
    }
  }
`;

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  const formData = { ...req.body };
  delete formData.id; // remove id from the form data

  const { data } = await axios.post(process.env.NEXT_PUBLIC_GRAPHQL_URL!, {
    query: MUTATION,
    variables: {
      where: { id: req.body.id },
      data: formData,
    },
  });
  await errorCather({ data, res });

  res.status(200).json({ data: data?.data?.updateCluster });
};

export default composeMiddleware([
  allowedMethods(['POST']),
  sessionCheck(),
  handler,
]);
