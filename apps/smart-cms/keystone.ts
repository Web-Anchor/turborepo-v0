import { config } from '@keystone-6/core';
import { statelessSessions } from '@keystone-6/core/session';
import { createAuth } from '@keystone-6/auth';
import { lists } from './src/keystone/schema';

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
      provider: 'sqlite',
      url: `file:${process.cwd()}/keystone.db`,
    },
    lists,
    session,
    // Optional: Set to false to disable Admin UI
    ui: {
      // basePath: '/admin',
      isDisabled: true, // Disable Admin UI. Next JS do not support it
    },
    // Server configuration
    server: {
      cors: {
        origin: ['http://localhost:3000'],
        credentials: true,
      },
      port: 3001,
    },
  })
);
