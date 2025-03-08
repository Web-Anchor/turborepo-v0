import {
  composeMiddleware,
  MiddlewareTypes,
  sessionAuth,
} from 'lib/middleware';
import axios from 'lib/axios';
import { QUERY } from './utils';
import { returnIfTruthy } from 'lib/utils';

const handler = async ({
  req,
  context,
}: MiddlewareTypes): Promise<Response> => {
  const { take, skip, orderBy, input } = await req.json();

  const { data } = await axios.post(process.env.NEXT_PUBLIC_GRAPHQL_URL!, {
    query: QUERY,
    variables: {
      where: {
        users: { some: { id: { equals: context?.user?.id } } }, // User ID owning items
        OR: returnIfTruthy(input, [
          {
            name: {
              contains: input,
            },
          },
          {
            sku: {
              contains: input,
            },
          },
          {
            barcode: {
              contains: input,
            },
          },
        ]),
      },
      take,
      skip,
      orderBy: orderBy || { id: 'desc' },
    },
  });
  console.log('🚨 API data', input);

  return Response.json({ data: data?.data?.products });
};

export const POST = composeMiddleware([sessionAuth, handler]);
