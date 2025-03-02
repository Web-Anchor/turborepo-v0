import {
  composeMiddleware,
  MiddlewareTypes,
  sessionAuth,
} from 'lib/middleware';
import axios from 'axios';

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
