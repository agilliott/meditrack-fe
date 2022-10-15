import { createTheme, ThemeOptions } from '@mui/material';

const themeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#009a8a',
      dark: '#008D7F',
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
  typography: {
    h1: {
      fontSize: '2.5rem',
    },
    h2: {
      fontSize: '2rem',
    },
    h3: {
      fontSize: '1.5rem',
    },
    h4: {
      fontSize: '1.2rem',
    },
    h5: {
      fontSize: '1rem',
    },
  },
};

export const theme = createTheme(themeOptions);
