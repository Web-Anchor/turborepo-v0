import { keystoneContext } from '@/keystone/context';
import { NextRequest, NextResponse } from 'next/server';

// This endpoint provides the GraphQL schema for tools like Postman
export async function GET(request: NextRequest) {
  try {
    // Check if auth is enabled (can be toggled via environment variable)
    const AUTH_CHECK_ENABLED =
      process.env.NEXT_PUBLIC_AUTH_CHECK_ENABLED !== 'false';

    // Get the authorization header from the request
    const authHeader = request.headers.get('authorization');

    // Check authentication if enabled
    if (
      AUTH_CHECK_ENABLED &&
      (!authHeader || !authHeader.startsWith('Bearer '))
    ) {
      return NextResponse.json(
        { error: 'Unauthorized', message: 'Authentication token is required' },
        { status: 401 }
      );
    }

    // Get the schema introspection
    const schema = keystoneContext.graphql.schema;

    // Return the schema
    return NextResponse.json(
      { schema },
      {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      }
    );
  } catch (error) {
    console.error('Schema introspection error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', message: (error as Error).message },
      { status: 500 }
    );
  }
}

// Handle OPTIONS requests for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
