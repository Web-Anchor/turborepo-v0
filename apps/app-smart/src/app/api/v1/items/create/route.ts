import {
  composeMiddleware,
  MiddlewareTypes,
  sessionAuth,
} from 'lib/middleware';
import axios from 'axios';

const MUTATION = `
  mutation CreateItem($data: ItemCreateInput!) {
    createItem(data: $data) {
      id
    }
  }
`;

const handler = async ({
  req,
  context,
}: MiddlewareTypes): Promise<Response> => {
  const body = await req.json();
  const { data } = await axios.post(process.env.NEXT_PUBLIC_GRAPHQL_URL!, {
    query: MUTATION,
    variables: {
      data: {
        ...body,
        users: { connect: [{ id: context?.user?.id }] }, // User ID owning the item
      },
    },
  });

  return Response.json({ data: data?.data?.createItem });
};

export const POST = composeMiddleware([sessionAuth, handler]);
