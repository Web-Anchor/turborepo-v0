import type { NextApiRequest, NextApiResponse } from 'next';
import {
  composeMiddleware,
  allowedMethods,
  sessionCheck,
} from 'lib/middleware';
import axios from 'axios';
import { errorCather } from 'server/utils';

type ResponseData = {
  message?: string;
  data?: object;
};

const QUERY = `
  query Lists {
    lists {
      id
      name
      description
      invitations {
        id
        email
        status
      }
      tags {
        name
      }
      clusters {
        id
        name
      }
      createdAt
      updatedAt
      accessesCount
      itemsCount
      invitationsCount
    }
  }
`;

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  const { data } = await axios.post(process.env.NEXT_PUBLIC_GRAPHQL_URL!, {
    query: QUERY,
  });
  await errorCather({ data, res });

  res.status(200).json({ data: data?.data?.lists });
};

export default composeMiddleware([
  allowedMethods(['POST']),
  sessionCheck(),
  handler,
]);
