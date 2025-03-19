import { createYoga } from 'graphql-yoga';
import { keystoneContext } from '../../../keystone/context'; // Adjust the path as needed

const { handleRequest } = createYoga({
  schema: keystoneContext.graphql.schema,
  graphqlEndpoint: '/api/graphql',
  fetchAPI: { Response },
  context: async ({ request }) => ({
    keystoneContext,
    request,
  }),
});

export const GET = handleRequest;
export const POST = handleRequest;
export const OPTIONS = handleRequest;
