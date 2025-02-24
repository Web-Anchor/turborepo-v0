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

const QUERY = `
  query QQ($where: ItemWhereInput, $take: Int, $skip: Int, $orderBy: [ItemOrderByInput!]) {
    items(where: $where, take: $take, skip: $skip, orderBy: $orderBy) {
      id
      name
      description
      category
      cost
      price
      unit
      attributes
      status
      inventoryList {
        id
        name
      }
      tags {
        name
      }
      owners {
        id
        name
        email
      }
      isHidden
      createdAt
      updatedAt
    }
  }
`;

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  if (!req.body.userId) {
    res.status(400).json({ message: 'User ID is required' });
    return;
  }

  const { data } = await axios.post(process.env.NEXT_PUBLIC_GRAPHQL_URL!, {
    query: QUERY,
    variables: {
      where: {
        owners: { some: { id: { equals: req.body.userId } } }, // User ID owning items
      },
      take: req.body.take,
      skip: req.body.skip,
      orderBy: req.body.orderBy,
    },
  });
  await errorCather({ data, res });

  res.status(200).json({ data: data?.data?.items });
};

export default composeMiddleware([
  allowedMethods(['POST']),
  sessionCheck(),
  handler,
]);
