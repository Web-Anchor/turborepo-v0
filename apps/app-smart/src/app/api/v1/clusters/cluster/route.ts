import {
  composeMiddleware,
  MiddlewareTypes,
  sessionAuth,
} from 'lib/middleware';
import axios from 'axios';

const QUERY = `
  query Q($where: ClusterWhereUniqueInput!) {
    cluster(where: $where) {
      id
      name
      description
      updatedAt
      listsCount
    }
  }
`;

const handler = async ({ req }: MiddlewareTypes): Promise<Response> => {
  const { id } = await req.json();
  const { data } = await axios.post(process.env.NEXT_PUBLIC_GRAPHQL_URL!, {
    query: QUERY,
    variables: {
      where: { id },
    },
  });

  return Response.json({ data: data?.data?.cluster });
};

export const POST = composeMiddleware([sessionAuth, handler]);
