import { composeMiddleware, getUserByClerkId } from 'lib/middleware';
import { auth, currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import axios from 'axios';

const handler = async (): Promise<Response> => {
  const { userId } = await auth();
  console.log('🤖 auth user logon action checks');
  const { user } = await getUserByClerkId(userId);

  if (user) {
    console.log(
      '❌ sing-in auth handler could not find uer with clerkId:',
      userId
    );
    const clerkUser = await currentUser();
    const { data } = await axios.post(process.env.NEXT_PUBLIC_GRAPHQL_URL!, {
      data: {
        clerkId: clerkUser?.id,
        firstName: clerkUser?.firstName,
        lastName: clerkUser?.lastName,
        role: 'USER',
        permissions: 'ALL',
        email: clerkUser?.emailAddresses?.[0]?.emailAddress,
        phoneNumbers: clerkUser?.phoneNumbers?.[0]?.phoneNumber,
      },
    });
    console.log('🤖 user created:', data);
  }

  return NextResponse.redirect(
    new URL('/dashboard', process.env.NEXT_PUBLIC_APP_URL)
  );
};

export const GET = composeMiddleware([handler]);
