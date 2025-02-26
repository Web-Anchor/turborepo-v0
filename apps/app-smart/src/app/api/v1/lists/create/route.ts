import {
  composeMiddleware,
  MiddlewareTypes,
  sessionAuth,
} from 'lib/middleware';
import axios from 'axios';

const MUTATION = `
  mutation CreateList($data: ListCreateInput!)  {
    createList(data: $data) {
      id
    }
  }
`;

const handler = async ({ req }: MiddlewareTypes): Promise<Response> => {
  const body = await req.json();
  const { data } = await axios.post(process.env.NEXT_PUBLIC_GRAPHQL_URL!, {
    query: MUTATION,
    variables: {
      data: body,
    },
  });

  return Response.json({ data: data?.data?.createList });
};

export const POST = composeMiddleware([sessionAuth, handler]);
