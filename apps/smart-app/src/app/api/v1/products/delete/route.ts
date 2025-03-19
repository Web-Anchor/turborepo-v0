import {
  composeMiddleware,
  MiddlewareTypes,
  sessionAuth,
} from 'lib/middleware';
import axios from 'lib/axios';
import { QUERY } from '../products/utils';

const MUTATION = `
  mutation DeleteProduct($where: ProductWhereUniqueInput!) {
    deleteProduct(where: $where) {
        id
    }
  }`;

const validation = async ({
  req,
  next,
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
  const hasProduct = data?.data?.products?.[0]?.id;
  if (!hasProduct) {
    throw new Error('You do not have permission to delete this product.');
  }
  context.id = id; // Set product ID to the context

  return next();
};

const handler = async ({ context }: MiddlewareTypes): Promise<Response> => {
  const { id } = context;
  const { data } = await axios.post(process.env.NEXT_PUBLIC_GRAPHQL_URL!, {
    query: MUTATION,
    variables: {
      where: {
        id,
      },
    },
  });
  console.log(data);

  return Response.json({ data: data?.data?.deleteProduct });
};

export const POST = composeMiddleware([sessionAuth, validation, handler]);
