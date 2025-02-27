import {
  composeMiddleware,
  sessionAuth,
  MiddlewareTypes,
} from 'lib/middleware';
import axios from 'axios';

const MUTATION = `
  mutation M($data: UserCreateInput!) {
    createUser(data: $data) {
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
  console.log('🤖 user created:', data);

  return Response.json({ data: data?.data?.createUser });
};

export const POST = composeMiddleware([sessionAuth, handler]);
