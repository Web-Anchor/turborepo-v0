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
      price
      unit
      attributes
      status
      cost
      quantity
      lists {
        id
        name
      }
      tags {
        name
      }
      users {
        id
        firstName
        lastName
        email
      }
      isHidden
      createdAt
      updatedAt
    }
  }
`;

const handler = async ({
  req,
  context,
}: MiddlewareTypes): Promise<Response> => {
  const { take, skip, orderBy } = await req.json();

  const { data } = await axios.post(process.env.NEXT_PUBLIC_GRAPHQL_URL!, {
    query: QUERY,
    variables: {
      where: {
        users: { some: { id: { equals: context?.user?.id } } }, // User ID owning items
      },
      take,
      skip,
      orderBy,
    },
  });

  return Response.json({ data: data?.data?.items });
};

export const POST = composeMiddleware([sessionAuth, handler]);
