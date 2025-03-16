import {
  composeMiddleware,
  MiddlewareTypes,
  sessionAuth,
} from 'lib/middleware';
import axios from 'lib/axios';
import { QUERY, MUTATION_DELETE } from '../utils';

const getHandler = async ({
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

export const GET = composeMiddleware([sessionAuth, getHandler]);

const validation = async ({
  req,
  next,
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
  const hasProduct = data?.data?.orders?.[0]?.id;
  if (!hasProduct) {
    throw new Error('You do not have permission to delete this product.');
  }
  context.id = id; // Set product ID to the context

  return next();
};

const deleteHandler = async ({ req }: MiddlewareTypes): Promise<Response> => {
  const id = req.url.split('/').pop();

  const { data } = await axios.post(process.env.NEXT_PUBLIC_GRAPHQL_URL!, {
    query: MUTATION_DELETE,
    variables: {
      where: {
        id,
      },
    },
  });

  return Response.json({ data: data?.data?.deleteProduct });
};

export const DELETE = composeMiddleware([
  sessionAuth,
  validation,
  deleteHandler,
]);
