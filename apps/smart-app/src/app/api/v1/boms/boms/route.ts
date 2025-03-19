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
  const { take, skip, orderBy } = await req.json();

  const { data } = await axios.post(process.env.NEXT_PUBLIC_GRAPHQL_URL!, {
    query: QUERY,
    variables: {
      where: {
        users: { some: { id: { equals: context?.user?.id } } }, // User ID owning items
      },
      take,
      skip,
      orderBy: orderBy || { id: 'desc' },
    },
  });

  return Response.json({ data: data?.data?.bOMS });
};

export const POST = composeMiddleware([sessionAuth, handler]);
