import { Button, Typography } from '@mui/material';

interface NumberSelectProps {
  value: number;
  selected: boolean;
  callback: (value: number) => void;
}

const NumberIncrementer = ({
  value,
  selected,
  callback,
}: NumberSelectProps) => {
  return (
    <Button
      size="large"
      onClick={() => callback(value)}
      sx={{
        background: (theme) => theme.palette.background.default,
        ':hover': {
          backgroundColor: (theme) => theme.palette.background.default,
        },
        border: '2px solid',
        borderColor: (theme) =>
          selected ? theme.palette.primary.main : 'transparent',
        color: (theme) =>
          selected ? theme.palette.primary.main : theme.palette.text.primary,
      }}
    >
      <Typography textAlign="center">{value}</Typography>
    </Button>
  );
};

export default NumberIncrementer;
