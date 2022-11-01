import { SvgIconProps } from '@mui/material';
import {
  Medication,
  PushPinOutlined,
  Battery0BarOutlined,
} from '@mui/icons-material';

export interface IconProps {
  name: string;
  color: string;
}

export const iconMap: {
  [index: string]: (props: SvgIconProps) => JSX.Element;
} = {
  INSULIN: Medication,
  TEST_STRIP: Battery0BarOutlined,
  NEEDLE: PushPinOutlined,
};

export const getIcon = (icon: IconProps) => {
  const Component = iconMap[icon.name] || Medication;
  return (
    <Component
      sx={{ color: (theme: any) => theme.palette.colorOptions[icon.color] }}
    />
  );
};
