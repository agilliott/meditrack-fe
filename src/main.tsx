import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import {
  PATH_TRACKER,
  PATH_ANALYSE,
  PATH_MEDICATION,
  PATH_PROFILE,
} from './routing/routes';
import {
  Analyse,
  ErrorPage,
  Login,
  Medication,
  Profile,
  Tracker,
} from './pages';

import AuthProvider from './context/AuthProvider';
import App from './App';
import { theme } from './theme';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: PATH_TRACKER,
        element: <Tracker />,
      },
      {
        path: PATH_ANALYSE,
        element: <Analyse />,
      },
      {
        path: PATH_MEDICATION,
        element: <Medication />,
      },
      {
        path: PATH_PROFILE,
        element: <Profile />,
      },
    ],
  },
  {
    path: 'login',
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);
