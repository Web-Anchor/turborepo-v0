import { config } from '@keystone-6/core';
import { statelessSessions } from '@keystone-6/core/session';
import { createAuth } from '@keystone-6/auth';
import { lists } from './src/keystone/schema';
import { DatabaseProvider } from '@keystone-6/core/types';

// Authentication configuration
const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  sessionData: 'id name',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
  },
});

// Define session secret min 32 characters long
const sessionSecret =
  process.env.SESSION_SECRET || Math.pow(32, 2).toString(36).substring(2, 34);

// Session configuration
const session = statelessSessions({
  secret: sessionSecret,
  maxAge: 60 * 60 * 24 * 30, // 30 days
});

// Keystone configuration
export default withAuth(
  config({
    db: {
      provider: (process.env.DATABASE_PROVIDER || 'sqlite') as DatabaseProvider, // or 'postgresql' or 'mysql'
      url: process.env.DATABASE_URL || `file:${process.cwd()}/keystone.db`,
    },
    lists,
    session,
    ui: {
      // Optional: Set to false to disable Admin UI
      // basePath: '/admin',
      isDisabled: true, // Disable Admin UI. Next JS do not support it
    },
    // Server configuration
    server: {
      cors: {
        origin: ['http://localhost:3000'],
        credentials: true,
      },
      port: getPrtNumber(),
    },
  })
);

function getPrtNumber(): number {
  /**
   * @description Get the port number from the environment variable or return 3001 if not set
   * @returns {number} The port number
   * @date 2025-03-22
   * @author Ed Ancerys
   */
  const port = process.env.PORT;
  if (Number.isNaN(Number(port))) {
    return 3001;
  }
  return Number(port);
}
