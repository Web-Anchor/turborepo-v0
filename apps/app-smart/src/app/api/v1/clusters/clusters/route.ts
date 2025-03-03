import { composeMiddleware, sessionAuth } from 'lib/middleware';
import axios from 'lib/axios';

const QUERY = `
  query Clusters {
    clusters {
      id
      name
      description
      updatedAt
      createdAt
      listsCount
    }
  }
`;

interface Cluster {
  id: string;
  name: string;
  description: string;
  updatedAt: string;
  createdAt: string;
  listsCount: number;
}

interface GraphQLResponse<T> {
  data: T;
}

interface ClustersResponse {
  clusters: Cluster[];
}

const handler = async (): Promise<Response> => {
  const { data } = await axios.post<GraphQLResponse<ClustersResponse>>(
    process.env.NEXT_PUBLIC_GRAPHQL_URL!,
    { query: QUERY }
  );

  return Response.json({ data: data?.data?.clusters });
};

export const POST = composeMiddleware([sessionAuth, handler]);
