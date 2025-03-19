import {
  composeMiddleware,
  MiddlewareTypes,
  sessionAuth,
} from 'lib/middleware';
import { currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import axios from 'lib/axios';

const handler = async ({ context }: MiddlewareTypes): Promise<Response> => {
  console.log('🤖 auth logon action. Clerk ID:', context);

  if (!context?.user && context?.clerkId) {
    console.log('❌ sing-in auth handler - user not found!');
    console.log('🤖 creating user from clerk user:', context?.clerkId);

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

export const GET = composeMiddleware([sessionAuth, handler]);
