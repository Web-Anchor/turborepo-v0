import { composeMiddleware, sessionAuth } from 'lib/middleware';
import axios from 'lib/axios';

const QUERY = `
  query Lists {
    lists {
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

const handler = async (): Promise<Response> => {
  const { data } = await axios.post(process.env.NEXT_PUBLIC_GRAPHQL_URL!, {
    query: QUERY,
  });

  return Response.json({ data: data?.data?.lists });
};

export const POST = composeMiddleware([sessionAuth, handler]);
