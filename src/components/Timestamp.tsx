import { useState } from 'react';
import { Typography } from '@mui/material';
import { format, getTime } from 'date-fns';
import { TimerOutlined, CalendarMonthOutlined } from '@mui/icons-material';
import { Stack } from '@mui/system';

interface TimestampProps {
  date: Date;
  defaultToTimer?: boolean;
}

function dhms(t: number) {
  const d = Math.floor(t / (1000 * 60 * 60 * 24)),
    h = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    m = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60)),
    s = Math.floor((t % (1000 * 60)) / 1000);
  return { d, h, m, s };
}

const Timestamp = ({ date, defaultToTimer = true }: TimestampProps) => {
  const [showTimer, setShowTimer] = useState<boolean>(defaultToTimer);
  const dateFormatted = format(date, 'PPPpp');

  const then = getTime(date);
  const now = getTime(new Date());
  const timeDifference = now - then;
  const timer = dhms(timeDifference);

  const timeValues: string[] = [];

  Object.entries(timer).forEach((time) => {
    const [key, value] = time;
    if (value > 0) {
      timeValues.push(`${value}${key}`);
    }
  });

  const timeSinceEdit = timeValues[0];

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
      sx={{ color: (theme) => theme.palette.text.secondary }}
    >
      <Typography variant="subtitle2" color="inherit">
        Last updated: {showTimer ? timeSinceEdit : dateFormatted}
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
