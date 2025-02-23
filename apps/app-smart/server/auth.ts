'use server';

import axios from 'axios';

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
