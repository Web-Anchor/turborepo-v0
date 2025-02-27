import { composeMiddleware, requireAuth } from 'lib/middleware';
import { currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import axios from 'axios';

const handler = async (): Promise<Response> => {
  console.log('🤖 auth User sing-up');
  const clerkUser = await currentUser();

  if (clerkUser) {
    console.log('🤖 creating user from clerk user:', clerkUser);

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

export const GET = composeMiddleware([requireAuth, handler]);
