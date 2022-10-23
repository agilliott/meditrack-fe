import { createContext, useState } from 'react';
import apiClient from '../api/client';
import { LoginInputs } from '../pages/Login';

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContextValue {
  loggedIn: boolean;
  loading: boolean;
  authError: boolean;
  unknownError: boolean;
  logoutError: boolean;
  onLogin: (data: LoginInputs) => void;
  onLogout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loggedIn, setLoggedIn] = useState(
    sessionStorage.getItem('loggedIn') === 'true' || false
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [authError, setAuthError] = useState<boolean>(false);
  const [unknownError, setUnknownError] = useState<boolean>(false);
  const [logoutError, setLogoutError] = useState<boolean>(false);

  const handleLogin = (data: LoginInputs) => {
    setAuthError(false);
    setUnknownError(false);
    setLoading(true);

    apiClient.get('sanctum/csrf-cookie').then(() => {
      apiClient
        .post('/login', {
          email: data.email,
          password: data.password,
        })
        .then((response) => {
          if (response.status === 204) {
            setLoggedIn(true);
            sessionStorage.setItem('loggedIn', 'true');
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 422) {
            setAuthError(true);
          } else {
            setUnknownError(true);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    });
  };

  const handleLogout = () => {
    setLogoutError(false);
    setLoading(true);

    apiClient.get('sanctum/csrf-cookie').then(() => {
      apiClient
        .post('/logout')
        .then((response) => {
          if (response.status === 204) {
            setLoggedIn(false);
            sessionStorage.setItem('loggedIn', 'false');
          }
        })
        .catch((err) => setLogoutError(true))
        .finally(() => {
          setLoading(false);
        });
    });
  };

  const value = {
    loggedIn,
    loading,
    authError,
    unknownError,
    logoutError,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider, AuthContext };
