'use server';

import { parseCookies } from 'lib/middleware';
import axios from 'axios';
import { NextApiRequest } from 'next';

const QUERY = `
mutation UserLogin($email: String!, $password: String!) {
  authenticateUserWithPassword(email: $email, password: $password) {
    ... on UserAuthenticationWithPasswordSuccess {
      sessionToken
    }
  }
}
`;

export async function cmsRootUserLogin() {
  const { data } = await axios.post(process.env.NEXT_PUBLIC_GRAPHQL_URL!, {
    query: QUERY,
    variables: {
      email: process.env.CMS_USER_EMAIL,
      password: process.env.CMS_USER_PASSWORD,
    },
  });

  return {
    sessionToken: data?.data?.authenticateUserWithPassword?.sessionToken,
  };
}

export async function getSession(props: {
  req: NextApiRequest;
  session?: string;
}) {
  try {
    const sessionName =
      props.session || process.env.AUTH_SESSION_NAME || 'session'; // Default to 'session'
    const session =
      props.req.cookies?.[sessionName] ||
      parseCookies(props.req.headers.cookie)[sessionName];

    return { session };
  } catch (error) {
    return { error: (error as Error).message };
  }
}

// max age for session handler. takes in days or hours
export function maxAge(time: number, unit: 'days' | 'hours') {
  return time * (unit === 'days' ? 60 * 60 * 24 : 60 * 60);
}
