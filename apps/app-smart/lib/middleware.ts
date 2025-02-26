import { auth } from '@clerk/nextjs/server';

type ContextType = Record<string, any>;
export type MiddlewareTypes = {
  request: Request;
  response: Response;
  next: () => Promise<Response>;
  context: ContextType; // middleware context
};
export type Middleware = (params: MiddlewareTypes) => Promise<Response>;

export function composeMiddleware(handlers: Middleware[]) {
  return async (request: Request): Promise<Response> => {
    const context: ContextType = {};
    let index = -1;

    const dispatch = async (i: number): Promise<Response> => {
      if (i <= index) {
        throw new Error('next() called multiple times');
      }
      index = i;

      // When all middleware have been called, return a default response:
      if (i === handlers.length) {
        return new Response('Not Found', {
          status: 404,
        }) as Response;
      }

      const response = new Response() as Response;
      const handler = handlers[i];
      const params: MiddlewareTypes = {
        request,
        response,
        next: () => dispatch(i + 1),
        context,
      };

      return handler(params);
    };

    try {
      return await dispatch(0);
    } catch (error) {
      console.error('❌ Error in middleware:', (error as Error).message);
      return Response.json({ error }, { status: 500 });
    }
  };
}

// sessionCheck middleware
export const sessionCheck = async ({ next, context }: MiddlewareTypes) => {
  const { userId } = await auth();

  if (!userId) {
    console.log('❌ auth handler - user session not fount!');
    return Response.json({ message: 'Unauthorized' }, { status: 401 });
  }
  context.clerkId = userId;

  return await next();
};
