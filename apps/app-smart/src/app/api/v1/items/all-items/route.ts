import {
  composeMiddleware,
  MiddlewareTypes,
  sessionAuth,
} from 'lib/middleware';
import axios from 'axios';
import { QUERY } from '../items/utils';

const handler = async ({
  req,
  context,
}: MiddlewareTypes): Promise<Response> => {
  // You can still allow orderBy to be passed from the request.
  const body = await req.json();
  const take = body.take || 100; // number of items to fetch per page
  let skip = 0;
  let allItems: any[] = [];

  try {
    while (true) {
      // Post a paginated GraphQL query.
      const { data } = await axios.post(process.env.NEXT_PUBLIC_GRAPHQL_URL!, {
        query: QUERY,
        variables: {
          where: {
            users: { some: { id: { equals: context?.user?.id } } },
          },
          take,
          skip,
          orderBy: body.orderBy || { id: 'desc' },
        },
      });

      const items = data?.data?.items || [];
      allItems = allItems.concat(items);

      // If fewer items were returned than requested, we are done.
      if (items.length < take) break;

      skip += take;
    }

    return Response.json({ data: allItems, total: allItems.length });
  } catch (error: any) {
    console.error('Error fetching items:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
};

export const POST = composeMiddleware([sessionAuth, handler]);
