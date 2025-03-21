'use client';

import LoginForm from '../components/LoginForm';
import Dashboard from '../components/Dashboard';
import { deleteSession } from '@/lib/actions';

type ComponentTypes = {
  token?: string;
};

export default function Controller({ token }: ComponentTypes) {
  // if (!token) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen bg-gray-100">
  //       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
  //     </div>
  //   );
  // }
  // graphql playground url is http://localhost:3001/api/graphql

  async function logout() {
    try {
      await deleteSession();
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6">
      <div className="w-full max-w-5xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2">
            Next.js with Keystone Integration
          </h1>
          <p className="text-bold">
            A boilerplate application with Next.js, Tailwind CSS, and
            Keystone.js
          </p>
          <button
            onClick={logout}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Logout
          </button>
          <p className="mt-4">
            GraphQL Playground:{' '}
            <a
              href={`http://localhost:${process.env.NEXT_PUBLIC_PORT}/api/graphql`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              Open Playground
            </a>
          </p>
        </div>

        {token && <Dashboard />}
        {!token && (
          <div className="flex justify-center">
            <LoginForm />
          </div>
        )}
      </div>
    </main>
  );
}
