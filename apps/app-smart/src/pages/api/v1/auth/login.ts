import type { NextApiRequest, NextApiResponse } from 'next';
import { composeMiddleware, allowedMethods } from 'lib/middleware';
import { cmsRootUserLogin, getSession, maxAge } from 'server/auth';

type ResponseData = {
  message?: string;
  data?: object;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  const { session } = await getSession({ req });

  if (!session) {
    console.log('🚧 No session found. Login in as app root user!');
    const { sessionToken } = await cmsRootUserLogin();
    console.log('SESSION TOKEN', sessionToken);
    const sessionMaxAge = maxAge(1, 'hours');
    res.setHeader(
      'Set-Cookie',
      `${process.env.AUTH_SESSION_NAME}=${sessionToken}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${sessionMaxAge}`
    );
  } else {
    console.log('🚀 Session found! Continuing with current session!');
  }

  res.status(200).json({ message: 'OK' });
};

export default composeMiddleware([allowedMethods(['POST']), handler]);
