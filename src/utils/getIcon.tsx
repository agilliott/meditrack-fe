import { SvgIconProps } from '@mui/material';
import {
  Medication,
  PushPinOutlined,
  Battery0BarOutlined,
} from '@mui/icons-material';

export type IconChoices = 'INSULIN' | 'TEST_STRIP' | 'NEEDLE';
export type ColorChoices =
  | 'red1'
  | 'red2'
  | 'blue1'
  | 'blue2'
  | 'green1'
  | 'green2'
  | 'yellow1'
  | 'yellow2'
  | 'purple1'
  | 'purple2'
  | 'orange1'
  | 'orange2';

export interface IconProps {
  name: string;
  color: string;
  fontSize?: 'small' | 'inherit' | 'medium' | 'large' | undefined;
}

export const iconMap: {
  [index: string]: (props: SvgIconProps) => JSX.Element;
} = {
  INSULIN: Medication,
  TEST_STRIP: Battery0BarOutlined,
  NEEDLE: PushPinOutlined,
};

export const getIcon = ({ name, color, fontSize = 'medium' }: IconProps) => {
  const Component = iconMap[name] || Medication;
  return (
    <Component
      fontSize={fontSize}
      sx={{ color: (theme: any) => theme.palette.colorOptions[color] }}
    />
  );
};
