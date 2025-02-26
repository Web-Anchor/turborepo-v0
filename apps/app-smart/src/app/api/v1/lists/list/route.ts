import {
  composeMiddleware,
  MiddlewareTypes,
  sessionAuth,
} from 'lib/middleware';
import axios from 'axios';

const QUERY = `
  query List($where: ListWhereUniqueInput!) {
    list(where: $where) {
      id
      name
      description
      invitations {
        id
        email
        status
      }
      tags {
        name
      }
      clusters {
        id
        name
      }
      createdAt
      updatedAt
      accessesCount
      itemsCount
      invitationsCount
    }
  }
`;

const handler = async ({ req }: MiddlewareTypes): Promise<Response> => {
  const { id } = await req.json();
  const { data } = await axios.post(process.env.NEXT_PUBLIC_GRAPHQL_URL!, {
    query: QUERY,
    variables: {
      where: { id },
    },
  });

  return Response.json({ data: data?.data?.list });
};

export const POST = composeMiddleware([sessionAuth, handler]);
