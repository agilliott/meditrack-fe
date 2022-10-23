import { useState } from 'react';
import { Typography } from '@mui/material';
import { format } from 'date-fns';
import TimerOutlined from '@mui/icons-material/TimerOutlined';
import CalendarMonthOutlined from '@mui/icons-material/CalendarMonthOutlined';
import { Stack } from '@mui/system';

interface TimestampProps {
  date: Date;
  defaultToTimer?: boolean;
  timeLapsed: string;
}

const Timestamp = ({
  date,
  defaultToTimer = true,
  timeLapsed,
}: TimestampProps) => {
  const [showTimer, setShowTimer] = useState<boolean>(defaultToTimer);
  const dateFormatted = format(date, 'dd/MM/y HH:mm');

  const handleClick = () => {
    setShowTimer(!showTimer);
  };

  return (
    <Stack
      direction="row"
      spacing={1}
      justifyContent="flex-end"
      alignItems="center"
      role="button"
      aria-label={showTimer ? 'View date' : 'View time'}
      textAlign="right"
      pt={2}
      onClick={handleClick}
      sx={{ color: (theme) => theme.palette.text.secondary, cursor: 'pointer' }}
    >
      <Typography variant="subtitle2" color="inherit">
        Last updated {showTimer ? timeLapsed : dateFormatted}
      </Typography>
      {showTimer ? (
        <TimerOutlined fontSize="small" color="inherit" />
      ) : (
        <CalendarMonthOutlined fontSize="small" color="inherit" />
      )}
    </Stack>
  );
};

export default Timestamp;
