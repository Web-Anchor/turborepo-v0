import {
  composeMiddleware,
  MiddlewareTypes,
  sessionAuth,
} from 'lib/middleware';
import axios from 'axios';

const MUTATION = `
  mutation M($where: ItemWhereUniqueInput!, $data: ItemUpdateInput!) {
    updateItem(where: $where, data: $data) {
      id
    }
  }
`;

const handler = async ({ req }: MiddlewareTypes): Promise<Response> => {
  const { id } = await req.json();
  const { data } = await axios.post(process.env.NEXT_PUBLIC_GRAPHQL_URL!, {
    query: MUTATION,
    variables: {
      where: { id },
    },
  });

  return Response.json({ data: data?.data?.cluster });
};

export const POST = composeMiddleware([sessionAuth, handler]);
