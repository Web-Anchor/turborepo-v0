import { composeMiddleware, sessionCheck } from 'lib/middleware';
import { auth } from '@clerk/nextjs/server';

const handler = async () => {
  const { userId } = await auth();
  console.log('✅ sing-in auth handler triggered');

  if (!userId) {
    console.log('❌ sing-in auth handler userId:', userId);
    return res.redirect(303, '/sign-in').end();
  }
  console.log('✅ sing-in auth handler userId:', userId);

  res.redirect(303, '/dashboard').end();
};

export default composeMiddleware([sessionCheck, handler]);
