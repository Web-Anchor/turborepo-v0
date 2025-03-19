import {
  composeMiddleware,
  MiddlewareTypes,
  sessionAuth,
} from 'lib/middleware';
import axios from 'lib/axios';

const MUTATION = `
  mutation UpdateInventory($where: InventoryWhereUniqueInput!, $data: InventoryUpdateInput!) {
   updateInventory(where: $where, data: $data) {
      id
    }
  }
`;

const handler = async ({ req }: MiddlewareTypes): Promise<Response> => {
  const { id, ...body } = await req.json();
  const { data } = await axios.post(process.env.NEXT_PUBLIC_GRAPHQL_URL!, {
    query: MUTATION,
    variables: {
      where: { id },
      data: body,
    },
  });

  return Response.json({ data: data?.data?.updateProduct });
};

export const POST = composeMiddleware([sessionAuth, handler]);
