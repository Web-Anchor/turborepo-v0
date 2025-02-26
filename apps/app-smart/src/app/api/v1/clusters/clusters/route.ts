import {
  composeMiddleware,
  sessionCheck,
  MiddlewareTypes,
} from 'lib/middleware';
import axios from 'axios';

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

const handler = async ({ context }: MiddlewareTypes): Promise<Response> => {
  context = context || {};
  const { data } = await axios.post<GraphQLResponse<ClustersResponse>>(
    process.env.NEXT_PUBLIC_GRAPHQL_URL!,
    {
      query: QUERY,
    }
  );
  console.log('✅ RESPONSE', context);

  return Response.json({ data: data?.data?.clusters });
};

export const POST = composeMiddleware([sessionCheck, handler]);
