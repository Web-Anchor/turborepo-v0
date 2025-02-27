import { composeMiddleware } from 'lib/middleware';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const handler = async (): Promise<Response> => {
  const { userId } = await auth();
  console.log('🤖 auth user logon action checks');

  if (!userId) {
    console.log('❌ sing-in auth handler userId:', userId);
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.redirect(
    new URL('/dashboard', process.env.NEXT_PUBLIC_APP_URL)
  );
};

export const GET = composeMiddleware([handler]);
