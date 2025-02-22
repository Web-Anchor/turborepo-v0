import type { NextApiRequest, NextApiResponse } from 'next';

export type NextApiMiddleware = (
  req: NextApiRequest,
  res: NextApiResponse,
  next: (error?: any) => void
) => void;

/**
 * Compose an array of Express-style middleware functions into a single Next.js API handler.
 * If any middleware passes an error to next() or throws an error,
 * a 500 response is sent (unless the response is already finished).
 */
export function composeMiddleware(handlers: NextApiMiddleware[]) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    let index = 0;

    const next = (error?: any): Promise<void> => {
      if (error) {
        return Promise.reject(error);
      }
      // If the response is already finished, stop processing.
      if (res.writableEnded) return Promise.resolve();
      if (index >= handlers.length) return Promise.resolve();

      const handler = handlers[index++];
      return new Promise<void>((resolve, reject) => {
        try {
          handler(req, res, (err?: any) => {
            if (err) {
              reject(err);
            } else {
              resolve(next());
            }
          });
        } catch (err) {
          reject(err);
        }
      });
    };

    try {
      await next();
    } catch (error: any) {
      if (!res.writableEnded) {
        res
          .status(500)
          .json({ error: error.message || 'Internal Server Error' });
      }
    }
  };
}

/**
 * Checks if the request's method is one of the allowed methods.
 * If not, returns a 405 response with an 'Allow' header.
 */
export function allowedMethods(methods: string[]) {
  return (
    req: NextApiRequest,
    res: NextApiResponse,
    next: (error?: any) => void
  ) => {
    if (req.method && methods.includes(req.method)) {
      return next();
    }
    res.setHeader('Allow', methods.join(', '));
    res.status(405).end(`Method ${req.method} Not Allowed`);
  };
}

/**
 * A simple cookie parser that converts a cookie header string into an object.
 */
function parseCookies(cookieHeader?: string): Record<string, string> {
  const list: Record<string, string> = {};
  if (!cookieHeader) return list;
  cookieHeader.split(';').forEach((cookie) => {
    let [name, ...rest] = cookie.split('=');
    name = name?.trim();
    if (!name) return;
    const value = rest.join('=').trim();
    if (value) {
      list[name] = decodeURIComponent(value);
    }
  });
  return list;
}

/**
 * Checks that a session cookie exists.
 * The cookie name is taken from process.env.SESSION_NAME (defaulting to 'session').
 * If the session cookie is missing, a 401 Unauthorized response is returned.
 */
export function sessionCheck(session?: string) {
  return (
    req: NextApiRequest,
    res: NextApiResponse,
    next: (error?: any) => void
  ) => {
    // Use parsed cookies if available, otherwise parse the header.
    const cookies = req.cookies || parseCookies(req.headers.cookie);
    const sessionName = session || process.env.SESSION_NAME || 'session';
    if (!cookies[sessionName]) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
    // Optionally, you could add additional session validation logic here.
    return next();
  };
}
