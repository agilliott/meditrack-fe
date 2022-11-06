import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './main.css';

import {
  PATH_TRACKER,
  PATH_ANALYSE,
  PATH_MEDICATION,
  PATH_PROFILE,
  PATH_LOGIN,
  PATH_HOME,
  PATH_ADD_MEDICATION,
  PATH_EDIT_MEDICATION,
} from './routing/routes';
import {
  Analyse,
  ErrorPage,
  Login,
  Medication,
  Profile,
  Tracker,
  Home,
  UpdateMedication,
} from './pages';

import { AuthProvider } from './context/AuthProvider';
import App from './App';
import { theme } from './theme';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: PATH_HOME,
        element: <Home />,
      },
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
      {
        path: PATH_ADD_MEDICATION,
        element: <UpdateMedication add />,
      },
      {
        path: PATH_EDIT_MEDICATION,
        element: <UpdateMedication />,
      },
    ],
  },
  {
    path: PATH_LOGIN,
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CookiesProvider>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <RouterProvider router={router} />
          <ToastContainer limit={1} autoClose={3000} closeButton={false} />
        </ThemeProvider>
      </AuthProvider>
    </CookiesProvider>
  </React.StrictMode>
);
