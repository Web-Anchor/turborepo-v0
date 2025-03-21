import type { Context } from '.keystone/types';

export async function createInitialData(context: Context) {
  try {
    console.log('Context:', context);
    const users = await context.query.User.findMany();

    if (!users) {
      console.log('Creating initial admin user...');
      const admin = await context.query.User.createOne({
        data: {
          name: 'Admin User',
          email: 'admin@example.com',
          password: 'admin123',
        },
      });
      console.log('Admin user created successfully!');

      console.log('Creating Other initial data...');
    } else {
      console.log('Admin user already exists, skipping creation.');
    }
  } catch (error) {
    console.error('Error creating initial data:', error);
  }
}
