import { createContext, useState } from 'react';

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContextValue {
  isAuthenticated: boolean;
  onLogin?: () => void;
  onLogout?: () => void;
}

export const AuthContext = createContext<AuthContextValue>({
  isAuthenticated: false,
});

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const value = {
    isAuthenticated,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
