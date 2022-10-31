import { createContext, useState } from 'react';
import { useCookies } from 'react-cookie';
import { addDays, addHours } from 'date-fns';
import apiClient from '../api/client';
import { LoginInputs } from '../pages/Login';

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContextValue {
  loggedIn: boolean;
  loading: boolean;
  authError: AuthError;
  unknownError: boolean;
  logoutError: boolean;
  onLogin: (data: LoginInputs) => void;
  onLogout: () => void;
  handleSetAuthError: (authErrors: AuthError) => void;
}

interface AuthError {
  expired: boolean;
  unauthorised: boolean;
}

const COOKIE = 'auth';
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [cookies, setCookie, removeCookie] = useCookies([COOKIE]);
  const [loggedIn, setLoggedIn] = useState(cookies[COOKIE] || false);
  const [loading, setLoading] = useState<boolean>(false);
  const [authError, setAuthError] = useState<AuthError>({
    expired: false,
    unauthorised: false,
  });
  const [unknownError, setUnknownError] = useState<boolean>(false);
  const [logoutError, setLogoutError] = useState<boolean>(false);

  const handleLogin = (data: LoginInputs) => {
    setAuthError({
      expired: false,
      unauthorised: false,
    });
    setUnknownError(false);
    setLoading(true);

    apiClient.get('sanctum/csrf-cookie').then(() => {
      apiClient
        .post('/login', {
          email: data.email,
          password: data.password,
          remember: data.rememberMe,
        })
        .then((response) => {
          if (response.status === 204) {
            setLoggedIn(true);
            setCookie(COOKIE, 'loggedIn', {
              expires: data.rememberMe
                ? addDays(new Date(), 31)
                : addHours(new Date(), 3),
            });
          }
        })
        .catch((error) => {
          console.log({ authError: error });
          if (error.response && error.response.status === 422) {
            setAuthError({
              expired: false,
              unauthorised: true,
            });
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
            removeCookie(COOKIE);
          }
        })
        .catch((err) => setLogoutError(true))
        .finally(() => {
          setLoading(false);
        });
    });
  };

  const handleSetAuthError = (authErrors: AuthError) => {
    setAuthError(authErrors);
  };

  const value = {
    loggedIn,
    loading,
    authError,
    unknownError,
    logoutError,
    onLogin: handleLogin,
    onLogout: handleLogout,
    handleSetAuthError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider, AuthContext };
