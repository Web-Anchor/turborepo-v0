import { printSchema } from 'graphql';
import { keystoneContext } from '../../../keystone/context'; // Adjust the path as needed

export const GET = async () => {
  const schemaSDL = printSchema(keystoneContext.graphql.schema);
  return new Response(schemaSDL, {
    headers: {
      'Content-Type': 'application/graphql',
      'Content-Disposition': 'attachment; filename=schema.graphql',
    },
  });
};
