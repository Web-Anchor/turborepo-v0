import {
  composeMiddleware,
  MiddlewareTypes,
  sessionAuth,
} from 'lib/middleware';
import axios from 'lib/axios';
import { QUERY } from '../inventories/utils';

const handler = async ({
  req,
  context,
}: MiddlewareTypes): Promise<Response> => {
  const { id } = await req.json();
  const { data } = await axios.post(process.env.NEXT_PUBLIC_GRAPHQL_URL!, {
    query: QUERY,
    variables: {
      where: {
        AND: [
          {
            id: {
              equals: id,
            },
            users: {
              some: {
                id: {
                  equals: context?.userId,
                },
              },
            },
          },
        ],
      },
    },
  });

  return Response.json({ data: data?.data?.products?.[0] });
};

export const POST = composeMiddleware([sessionAuth, handler]);
