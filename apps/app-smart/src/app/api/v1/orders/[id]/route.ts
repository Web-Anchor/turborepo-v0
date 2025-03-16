import {
  composeMiddleware,
  MiddlewareTypes,
  sessionAuth,
} from 'lib/middleware';
import axios from 'lib/axios';
import { QUERY } from '../utils';

const handler = async ({
  req,
  context,
}: MiddlewareTypes): Promise<Response> => {
  const id = req.url.split('/').pop();

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

  return Response.json({ data: data?.data?.orders?.[0] });
};

export const GET = composeMiddleware([sessionAuth, handler]);
