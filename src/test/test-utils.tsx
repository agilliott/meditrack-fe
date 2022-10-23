import { ThemeProvider } from '@mui/material/styles';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { theme } from '../theme';

const AllTheProviders = ({ children }: any) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
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
