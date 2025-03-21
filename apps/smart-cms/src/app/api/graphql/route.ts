import { createYoga } from 'graphql-yoga';
import { keystoneContext } from '@/keystone/context';

const { handleRequest } = createYoga({
  schema: async () => (await keystoneContext).graphql.schema,
  graphqlEndpoint: '/api/graphql',
  fetchAPI: { Response },
  context: async ({ request }) => {
    const context = await keystoneContext;
    return { context, request };
  },
  graphiql: true,
  plugins: [
    {
      onRequest({ request, fetchAPI }) {
        const authHeader = request.headers.get('authorization');
        // Check authentication if enabled and token is missing.
        console.log(`🤖 Auth: ${authHeader}`);

        if (
          process.env.NEXT_PUBLIC_AUTH_CHECK_ENABLED !== 'false' &&
          request.method === 'POST' &&
          (!authHeader || !authHeader.startsWith('Bearer '))
        ) {
          return new fetchAPI.Response(
            JSON.stringify({
              errors: [{ message: 'Authentication token is required' }],
            }),
            { status: 401, headers: { 'Content-Type': 'application/json' } }
          );
        }
      },
    },
  ],
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  },
});

export const GET = handleRequest;
export const POST = handleRequest;
export const OPTIONS = handleRequest;
