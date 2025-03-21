import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth';

type DatabaseStats = {
  userCount: number;
  postCount: number;
  dbSize?: string;
};

export default function Dashboard() {
  const { user, token, logout } = useAuth();
  const [stats, setStats] = useState<DatabaseStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({
            query: `
              query GetDatabaseStats {
                usersCount: users { id }
                postsCount: posts { id }
              }
            `,
          }),
        });

        const data = await response.json();

        if (data.errors) {
          throw new Error(data.errors[0].message);
        }

        setStats({
          userCount: data.data.usersCount.length,
          postCount: data.data.postsCount.length,
        });
      } catch (err) {
        console.error('Error fetching stats:', err);
        setError('Failed to load database statistics');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchStats();
    }
  }, [token]);

  if (!user) {
    return null;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">Welcome, {user.name}</span>
          <button
            onClick={logout}
            className="px-4 py-2 text-sm text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Logout
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : error ? (
        <div className="p-4 text-red-700 bg-red-100 rounded-md">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 bg-indigo-50 rounded-lg">
            <h3 className="text-lg font-medium text-indigo-800">Users</h3>
            <p className="mt-2 text-3xl font-bold text-indigo-600">
              {stats?.userCount || 0}
            </p>
            <p className="mt-1 text-sm text-indigo-400">
              Total registered users
            </p>
          </div>

          <div className="p-6 bg-green-50 rounded-lg">
            <h3 className="text-lg font-medium text-green-800">Posts</h3>
            <p className="mt-2 text-3xl font-bold text-green-600">
              {stats?.postCount || 0}
            </p>
            <p className="mt-1 text-sm text-green-400">Total published posts</p>
          </div>

          {stats?.dbSize && (
            <div className="p-6 bg-purple-50 rounded-lg">
              <h3 className="text-lg font-medium text-purple-800">
                Database Size
              </h3>
              <p className="mt-2 text-3xl font-bold text-purple-600">
                {stats.dbSize}
              </p>
              <p className="mt-1 text-sm text-purple-400">
                Current storage usage
              </p>
            </div>
          )}
        </div>
      )}

      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-medium text-gray-800 mb-2">
          API Information
        </h3>
        <p className="text-gray-600 mb-2">
          GraphQL API is available at:{' '}
          <code className="bg-gray-100 px-2 py-1 rounded">/api/graphql</code>
        </p>
        <p className="text-gray-600">
          Authentication is required via Bearer token in the Authorization
          header.
        </p>
      </div>
    </div>
  );
}
