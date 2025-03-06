import {
  composeMiddleware,
  MiddlewareTypes,
  sessionAuth,
} from 'lib/middleware';
import axios from 'lib/axios';
import { MUTATION } from './utils';

const handler = async ({
  req,
  context,
}: MiddlewareTypes): Promise<Response> => {
  const body = await req.json();
  const { data } = await axios.post(process.env.NEXT_PUBLIC_GRAPHQL_URL!, {
    query: MUTATION,
    variables: {
      data: {
        ...body,
        users: { connect: [{ id: context?.user?.id }] }, // User ID owning the item
      },
    },
  });
  console.log('crete inventory DATA', body, data);

  return Response.json({ data: data?.data?.createProduct });
};

export const POST = composeMiddleware([sessionAuth, handler]);
