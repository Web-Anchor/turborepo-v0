import {
  composeMiddleware,
  MiddlewareTypes,
  sessionAuth,
} from 'lib/middleware';
import axios from 'lib/axios';

function statsQuery({ userId }: { userId: string }): string {
  const users = `{
      some:  {
          id:  {
            equals: "${userId}"
          }
        }
      }`;

  const QUERY = `
    query Q {
      itemsCount(where:  { users:  ${users}})
      ordersCount(where:  { users:  ${users}})
      items(take: 1, orderBy:  { 
        id: desc
      }) {
        updatedAt
      }
      orders(take: 1, orderBy:  {
        id: desc
      }) {
        updatedAt
      }
  
    }
`;

  return QUERY;
}

const handler = async ({ context }: MiddlewareTypes): Promise<Response> => {
  const { data } = await axios.post(process.env.NEXT_PUBLIC_GRAPHQL_URL!, {
    query: statsQuery({ userId: context?.user?.id }),
  });

  return Response.json({ data: data?.data });
};

export const POST = composeMiddleware([sessionAuth, handler]);
