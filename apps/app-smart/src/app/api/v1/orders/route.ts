import {
  composeMiddleware,
  MiddlewareTypes,
  sessionAuth,
} from 'lib/middleware';
import axios from 'lib/axios';
import { QUERY } from './utils';

const handler = async ({
  req,
  context,
}: MiddlewareTypes): Promise<Response> => {
  const params = new URLSearchParams(req.url.split('?')[1]);

  const { data } = await axios.post(process.env.NEXT_PUBLIC_GRAPHQL_URL!, {
    query: QUERY,
    variables: {
      where: {
        users: { some: { id: { equals: context?.user?.id } } }, // User ID owning items
      },
      take: params.get('take') || undefined, // take: number of items to fetch per page
      skip: params.get('skip') || undefined, // skip: 0,
      orderBy: { id: 'desc' },
    },
  });

  return Response.json({ data: data?.data?.orders });
};

export const GET = composeMiddleware([sessionAuth, handler]);
