import { createContext, useContext, useState, useEffect } from 'react';

type User = {
  id: string;
  name: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  login: async () => false,
  logout: () => {},
  isLoading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for token in localStorage on initial load
    const storedToken = localStorage.getItem('keystoneToken');
    const storedUser = localStorage.getItem('keystoneUser');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }

    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch('http://localhost:3001/api/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            mutation Login($email: String!, $password: String!)  {
              authenticateUserWithPassword(email: $email, password: $password) {
                ... on UserAuthenticationWithPasswordSuccess {
                  sessionToken
                  item {
                    id
                    name
                  }
                }
                ... on UserAuthenticationWithPasswordFailure {
                  message
                }
              }
            }
          `,
          variables: { email, password },
        }),
      });

      const { data } = await response.json();

      if (data?.authenticateUserWithPassword?.sessionToken) {
        const { sessionToken, item } = data.authenticateUserWithPassword;
        setToken(sessionToken);
        setUser(item);

        // Store in localStorage
        localStorage.setItem('keystoneToken', sessionToken);
        localStorage.setItem('keystoneUser', JSON.stringify(item));

        return true;
      }

      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('keystoneToken');
    localStorage.removeItem('keystoneUser');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

// Custom fetch function that includes the auth token
export async function fetchWithAuth(query: string, variables = {}) {
  // const { token } = useAuth();
  const token = localStorage.getItem('keystoneToken');

  const response = await fetch('http://localhost:3001/api/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  return response.json();
}
