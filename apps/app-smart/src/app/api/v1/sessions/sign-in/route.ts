import { composeMiddleware, sessionAuth } from 'lib/middleware';
import { auth } from '@clerk/nextjs/server';

const handler = async () => {
  const { userId } = await auth();
  console.log('✅ sing-in auth handler triggered');

  if (!userId) {
    console.log('❌ sing-in auth handler userId:', userId);
    return Response.redirect('/sign-in');
  }
  console.log('✅ sing-in auth handler userId:', userId);

  return Response.redirect('/dashboard');
};

export default composeMiddleware([sessionAuth, handler]);
