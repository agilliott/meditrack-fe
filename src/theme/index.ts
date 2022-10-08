import { createTheme, ThemeOptions } from '@mui/material';

const themeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#009a8a',
    },
    secondary: {
      main: '#00f5ac',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          minWidth: '45px',
        },
      },
    },
  },
};

export const theme = createTheme(themeOptions);
