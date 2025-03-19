import { composeMiddleware, MiddlewareTypes } from 'lib/middleware';
import axios from 'lib/axios';

const MUTATION = `
  mutation M($data: UserCreateInput!) {
    createUser(data: $data) {
      id
    }
  }
`;

const handler = async ({ req }: MiddlewareTypes): Promise<Response> => {
  const body = await req.json();
  console.log('🤖 adding new User record to db', body);

  const { data } = await axios.post(process.env.NEXT_PUBLIC_GRAPHQL_URL!, {
    query: MUTATION,
    variables: {
      data: body,
    },
  });

  return Response.json({ data: data?.data?.createUser });
};

export const POST = composeMiddleware([handler]);
