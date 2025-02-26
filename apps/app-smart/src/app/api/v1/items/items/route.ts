import {
  composeMiddleware,
  MiddlewareTypes,
  sessionAuth,
} from 'lib/middleware';
import axios from 'axios';

const QUERY = `
  query Items($where: ItemWhereInput, $take: Int, $skip: Int, $orderBy: [ItemOrderByInput!]) {
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

const handler = async ({ req }: MiddlewareTypes): Promise<Response> => {
  const { userId, take, skip, orderBy } = await req.json();
  const { data } = await axios.post(process.env.NEXT_PUBLIC_GRAPHQL_URL!, {
    query: QUERY,
    variables: {
      where: {
        owners: { some: { id: { equals: userId } } }, // User ID owning items
      },
      take,
      skip,
      orderBy,
    },
  });

  return Response.json({ data: data?.data?.cluster });
};

export const POST = composeMiddleware([sessionAuth, handler]);
