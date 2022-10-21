import {
  Palette as MuiPallete,
  PaletteOptions as MuiPaletteOptions,
} from '@mui/material/styles/createPalette';

declare module '@mui/material/styles/createPalette' {
  interface Palette extends MuiPallete {
    colorOptions: {
      red1: string;
      red2: string;
      blue1: string;
      blue2: string;
      green1: string;
      green2: string;
      yellow1: string;
      yellow2: string;
      purple1: string;
      purple2: string;
      orange1: string;
      orange2: string;
    };
  }

  interface PaletteOptions extends MuiPaletteOptions {
    colorOptions?: {
      red1: string;
      red2: string;
      blue1: string;
      blue2: string;
      green1: string;
      green2: string;
      yellow1: string;
      yellow2: string;
      purple1: string;
      purple2: string;
      orange1: string;
      orange2: string;
    };
  }
}

declare module '@mui/material/SVG' {
  export interface ChipPropsColorOverrides {
    facebook: true;
    twitter: true;
  }
}
