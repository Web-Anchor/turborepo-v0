import {
  composeMiddleware,
  MiddlewareTypes,
  sessionAuth,
} from 'lib/middleware';
import axios from 'axios';

const MUTATION = `
  mutation UpdateCluster($where: ClusterWhereUniqueInput!, $data: ClusterUpdateInput!) {
    updateCluster(where: $where, data: $data) {
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

  return Response.json({ data: data?.data?.updateCluster });
};

export const POST = composeMiddleware([sessionAuth, handler]);
