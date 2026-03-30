import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi, LoginRequest, RegisterRequest } from '../../shared/api/auth';
import { userApi } from '../../shared/api/user';
import { apiClient } from '../../shared/api/apiClient';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  roles: string[];
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const token = apiClient.getToken();
      if (token) {
        try {
          const profile = await userApi.getProfile();
          setUser({
            id: profile.id,
            name: profile.name,
            email: profile.email,
            roles: profile.roles,
          });
        } catch (error) {
          console.error('Failed to load user:', error);
          apiClient.clearToken();
        }
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await authApi.login({ email, password });
      apiClient.setToken(response.token);
      setUser(response.user);
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      apiClient.clearToken();
      setUser(null);
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      const response = await authApi.register({ name, email, password });
      apiClient.setToken(response.token);
      setUser(response.user);
      return true;
    } catch (error) {
      console.error('Registration failed:', error);
      return false;
    }
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontFamily: 'Inter, sans-serif',
        fontSize: '18px',
        color: '#333'
      }}>
        Загрузка...
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      loading,
      login,
      logout,
      register
    }}>
      {children}
    </AuthContext.Provider>
  );
};