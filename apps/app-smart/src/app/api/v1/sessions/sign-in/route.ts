import {
  composeMiddleware,
  getUserByClerkId,
  MiddlewareTypes,
  sessionAuth,
} from 'lib/middleware';
import { currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import axios from 'axios';

const handler = async ({ context }: MiddlewareTypes): Promise<Response> => {
  console.log('🤖 auth logon action. Clerk ID:', context);
  const { user } = await getUserByClerkId(context?.userId);

  if (!user && context?.userId) {
    console.log('❌ sing-in auth handler - user not found!');
    console.log('🤖 creating user from clerk user:', context?.userId);

    const clerkUser = await currentUser();
    await axios.post(`${process.env.NEXT_PUBLIC_APP_URL}/api/v1/users/create`, {
      clerkId: clerkUser?.id,
      firstName: clerkUser?.firstName,
      lastName: clerkUser?.lastName,
      role: 'USER',
      permissions: 'ALL',
      email: clerkUser?.emailAddresses?.[0]?.emailAddress,
      phoneNumbers: clerkUser?.phoneNumbers?.[0]?.phoneNumber,
      password: Math.random().toString(36).slice(-12), // random password
    });
  }

  return NextResponse.redirect(
    new URL('/dashboard', process.env.NEXT_PUBLIC_APP_URL)
  );
};

const cSessionCheck = async ({
  next,
  ...rest
}: MiddlewareTypes): Promise<void> => {
  await sessionAuth({ ...rest, next, validateDbUser: false });
};

export const GET = composeMiddleware([cSessionCheck, handler]);
