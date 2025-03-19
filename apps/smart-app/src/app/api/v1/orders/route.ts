import {
  composeMiddleware,
  MiddlewareTypes,
  sessionAuth,
} from 'lib/middleware';
import axios from 'lib/axios';
import { QUERY, MUTATION_CREATE, MUTATION_UPDATE } from './utils';

const getHandler = async ({
  req,
  context,
}: MiddlewareTypes): Promise<Response> => {
  const params = new URLSearchParams(req.url.split('?')[1]);

  const { data } = await axios.post(process.env.NEXT_PUBLIC_GRAPHQL_URL!, {
    query: QUERY,
    variables: {
      where: {
        users: { some: { id: { equals: context?.user?.id } } }, // User ID owning items
        source: { equals: params.get('type') || undefined },
      },
      take: params.get('take') || undefined, // take: number of items to fetch per page
      skip: params.get('skip') || undefined, // skip: 0,
      orderBy: { id: 'desc' },
    },
  });

  return Response.json({ data: data?.data?.orders });
};

export const GET = composeMiddleware([sessionAuth, getHandler]);

const postHandler = async ({
  req,
  context,
}: MiddlewareTypes): Promise<Response> => {
  const body = await req.json();

  const { data } = await axios.post(process.env.NEXT_PUBLIC_GRAPHQL_URL!, {
    query: MUTATION_CREATE,
    variables: {
      data: {
        ...body,
        users: { connect: [{ id: context?.user?.id }] }, // User ID owning the item
      },
    },
  });

  return Response.json({ data: data?.data?.createOrder });
};

export const POST = composeMiddleware([sessionAuth, postHandler]);

const putHandler = async ({ req }: MiddlewareTypes): Promise<Response> => {
  const { id, ...body } = await req.json();

  const { data } = await axios.post(process.env.NEXT_PUBLIC_GRAPHQL_URL!, {
    query: MUTATION_UPDATE,
    variables: {
      where: { id },
      data: body,
    },
  });

  return Response.json({ data: data?.data?.updateProduct });
};

export const PUT = composeMiddleware([sessionAuth, putHandler]);
