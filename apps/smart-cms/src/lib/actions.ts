'use server';

import { cookies } from 'next/headers';

type CookieOptions = {
  name?: string;
  value: string;
  httpOnly?: boolean;
  secure?: boolean;
  path?: string;
  maxAge?: number;
  expires?: Date;
  sameSite?: 'Strict' | 'Lax' | 'None'; // Default is 'Lax'
};

export async function setSession({ value, ...rest }: CookieOptions) {
  try {
    const cookieStore = await cookies();
    const name = rest.name || process.env.SESSION_TOKEN || '__user_session';
    console.log('🍪 Setting session:', name, value);

    cookieStore.set({
      name,
      value,
      httpOnly: rest.httpOnly || true,
      secure: rest.secure || true,
      path: rest.path || '/',
      maxAge: rest.maxAge, // in seconds
      expires: rest.expires || new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days
    });
  } catch (error) {
    console.error('Error setting session:', error);
    throw new Error('Failed to set session');
  }
}

export async function deleteSession(name?: string) {
  (await cookies()).delete(name || process.env.SESSION_TOKEN!);
}
