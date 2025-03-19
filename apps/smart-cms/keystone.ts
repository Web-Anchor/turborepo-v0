import { config } from '@keystone-6/core';
import { lists } from './src/keystone/schema';
import { seedDemoData } from './src/keystone/seed';
import type { Context } from '.keystone/types';
const url = process.env.DATABASE_URL || `file:${process.cwd()}/keystone.db`; // next.js requires an absolute path for sqlite
console.log(`DATABASE_URL: ${url}`);

export default config({
  db: {
    provider: 'sqlite',
    url,
    onConnect: async (context: Context) => {
      await seedDemoData(context);
    },
  },
  lists,
});
