import {
  composeMiddleware,
  MiddlewareTypes,
  sessionAuth,
} from 'lib/middleware';

const handler = async ({ context }: MiddlewareTypes): Promise<Response> => {
  console.log('🤖 Who i am check! User:', context?.user.id);

  return Response.json({ data: context?.user });
};

export const POST = composeMiddleware([sessionAuth, handler]);
