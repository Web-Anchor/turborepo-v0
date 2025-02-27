import { auth } from '@clerk/nextjs/server';
import axios from 'axios';

interface CacheEntry<T> {
  data: T;
  expires: number;
}
const localCache = new Map<string, CacheEntry<any>>();

type ContextType = Record<string, any>;
export type MiddlewareTypes = {
  req: Request;
  res: Response;
  next: () => Promise<Response>;
  context: ContextType; // middleware context
  validateDbUser?: boolean;
};
export type Middleware = (params: MiddlewareTypes) => Promise<Response | void>;

export function composeMiddleware(handlers: Middleware[]) {
  return async (req: Request): Promise<Response> => {
    const context: ContextType = {};
    let index = -1;

    const dispatch = async (i: number): Promise<Response> => {
      if (i <= index) {
        throw new Error('next() called multiple times');
      }
      index = i;

      // When all middleware have been called, return a default response:
      if (i === handlers.length) {
        return new Response('Not Found', {
          status: 404,
        }) as Response;
      }

      const res = new Response() as Response;
      const handler = handlers[i];
      const params: MiddlewareTypes = {
        req,
        res,
        next: () => dispatch(i + 1),
        context,
      };

      const result = await handler(params);
      return result || new Response('Not Found', { status: 404 });
    };

    try {
      return await dispatch(0);
    } catch (error) {
      console.error(`❌ Error in middleware:`, (error as Error).message);
      const msgs = (error as any)?.response?.data?.errors?.map(
        (e: { message: string }) => e.message
      );
      console.log(msgs);

      return Response.json({ error }, { status: 500 });
    }
  };
}

export const sessionAuth = async ({
  next,
  context,
  validateDbUser = true,
}: MiddlewareTypes) => {
  const { userId } = await auth();

  if (validateDbUser) {
    const { user } = await getUserByClerkId(userId);

    if (!user) {
      console.log('❌ auth handler - user not found!');
      return Response.json({ message: 'Unauthorized' }, { status: 401 });
    }
    context.user = user;
  }

  context.clerkId = userId;

  return await next();
};

export async function getUserByClerkId(clerkId: string | null) {
  const QUERY = `
    query Users($where: UserWhereInput!) {
      users(where: $where) {
        id
        email
        firstName
        lastName
        role
        clerkId
        createdAt
        updatedAt
      }
    }
  `;
  const cache = getCache(clerkId!);
  if (cache) {
    console.log('🚧 sore data served from cache!');

    return { user: cache };
  }

  const { data } = await axios.post(process.env.NEXT_PUBLIC_GRAPHQL_URL!, {
    query: QUERY,
    variables: {
      where: { clerkId: { equals: clerkId } },
    },
  });
  const user = data?.data?.users?.[0];
  if (!user) {
    throw new Error('User not found with clerkId: ' + clerkId);
  }

  setCache(
    clerkId,
    user,
    60 * 60 * 1000 // 1 hour
  );

  return { user: data?.data?.users?.[0] };
}

// parseCookies . takes in req : Request type and session name
export function parseCookies(req: Request): Record<string, string> {
  const cookies = req.headers.get('cookie')?.split('; ') || [];
  const parsedCookies: Record<string, string> = {};

  cookies.forEach((cookie) => {
    const [key, value] = cookie.split('=');
    parsedCookies[key] = decodeURIComponent(value);
  });

  return parsedCookies;
}

function setCache<T>(key: string | null, data: T, ttl: number): void {
  if (typeof key === 'string' && ttl > 0) {
    // Create a new cache entry with the provided data and expiration time
    // Add the entry to the local cache with the provided key and expiration time
    // If the key already exists, update its data and expiration time with the new data and expiration time
    // If the key does not exist, create a new entry with the provided key, data, and expiration time
    // The cache entries will be automatically removed when their expiration time is reached
    console.log('📦 caching data to store:', data);

    const expires = Date.now() + ttl;
    localCache.set(key, { data, expires });
  }
}

// Function to get a cache entry if it's still valid
function getCache<T>(key: string): T | null {
  // First, clean up all expired entries
  revalidateCache();

  // Then, check for the requested key
  const entry = localCache.get(key);
  return entry ? entry.data : null;
}

// Revalidate the entire cache by removing expired entries
function revalidateCache() {
  const now = Date.now();
  for (const [key, entry] of localCache.entries()) {
    if (now > entry.expires) {
      localCache.delete(key);
    }
  }
}

export const requireAuth = async ({ next, context }: MiddlewareTypes) => {
  const { userId } = await auth();

  if (!userId) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 });
  }

  context.clerkId = userId;

  return await next();
};
