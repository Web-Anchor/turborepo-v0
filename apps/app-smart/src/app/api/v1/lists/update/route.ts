import {
  composeMiddleware,
  MiddlewareTypes,
  sessionAuth,
} from 'lib/middleware';
import axios from 'axios';

const MUTATION = `
  mutation UpdateList($where: ListWhereUniqueInput!, $data: ListUpdateInput!) {
    updateList(where: $where, data: $data) {
      id
    }
  }
`;

const handler = async ({ req }: MiddlewareTypes): Promise<Response> => {
  const { id, ...rest } = await req.json();
  const { data } = await axios.post(process.env.NEXT_PUBLIC_GRAPHQL_URL!, {
    query: MUTATION,
    variables: {
      where: { id },
      data: rest,
    },
  });

  return Response.json({ data: data?.data?.cluster });
};

export const POST = composeMiddleware([sessionAuth, handler]);
