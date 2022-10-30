import { createTheme, ThemeOptions } from '@mui/material';
import {
  purple,
  red,
  blue,
  green,
  yellow,
  indigo,
  orange,
} from '@mui/material/colors';

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
    colorOptions: {
      red1: red[500],
      red2: red[700],
      blue1: blue[400],
      blue2: blue[700],
      green1: green[400],
      green2: green[700],
      yellow1: yellow[500],
      yellow2: yellow[700],
      purple1: purple[400],
      purple2: indigo[400],
      orange1: orange[400],
      orange2: orange[700],
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
    fontFamily: '"Jost", "Roboto","Helvetica","Arial",sans-serif',
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
