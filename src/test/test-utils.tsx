import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@mui/material/styles';

import { theme } from '../theme';

const AllTheProviders = ({ children }: any) => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>{children}</BrowserRouter>
    </ThemeProvider>
  );
};

const customRender = (ui: React.ReactElement<any>, options = {}) => {
  return {
    user: userEvent.setup(),
    ...render(ui, {
      wrapper: AllTheProviders,
      ...options,
    }),
  };
};

export * from '@testing-library/react';

export { customRender as render };
