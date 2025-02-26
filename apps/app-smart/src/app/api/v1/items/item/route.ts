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
  const { id, userId } = await req.json();
  const { data } = await axios.post(process.env.NEXT_PUBLIC_GRAPHQL_URL!, {
    query: QUERY,
    variables: {
      where: {
        AND: [
          {
            id: {
              equals: id,
            },
            owners: {
              some: {
                id: {
                  equals: userId,
                },
              },
            },
          },
        ],
      },
    },
  });

  return Response.json({ data: data?.data?.items?.[0] });
};

export const POST = composeMiddleware([sessionAuth, handler]);
