import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'user' | 'brand_admin' | 'admin';
  brandId?: string;
  shopId?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isBrandAdmin: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const getRoleByEmail = (email: string): { role: 'user' | 'brand_admin' | 'admin', brandId?: string } => {
    if (email === 'admin@finds.com') return { role: 'admin' };
    if (email === 'kodex@finds.com') return { role: 'brand_admin', brandId: 'kodex' };
    if (email === 'frags@finds.com') return { role: 'brand_admin', brandId: 'frags' };
    if (email === 'omnia@finds.com') return { role: 'brand_admin', brandId: 'omnia' };
    return { role: 'user' };
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    const roleData = getRoleByEmail(email);
    const newUser: User = {
      id: Date.now().toString(),
      name: email.split('@')[0],
      email: email,
      role: roleData.role,
      brandId: roleData.brandId,
      avatar: '/images/default-avatar.jpg'
    };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    const newUser: User = {
      id: Date.now().toString(),
      name: name,
      email: email,
      role: 'user',
      avatar: '/images/default-avatar.jpg'
    };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    return true;
  };

  if (isLoading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Загрузка...</div>;
  }

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      isBrandAdmin: user?.role === 'brand_admin' || user?.role === 'admin',
      isAdmin: user?.role === 'admin',
      login,
      logout,
      register
    }}>
      {children}
    </AuthContext.Provider>
  );
};