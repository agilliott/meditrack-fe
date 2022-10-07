import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { PATH_TRACKER, PATH_ANALYSE, PATH_MEDICATION } from './routing/routes';
import { Analyse, ErrorPage, Medication, Tracker } from './pages';

import App from './App'


const theme = createTheme({
  palette: {
    mode: 'dark'
  }
});

const router = createBrowserRouter([
  {
    path: "/",
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
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
)
