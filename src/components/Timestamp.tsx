import { useState } from 'react';
import { Button } from '@mui/material';
import { format } from 'date-fns';
import TimerOutlined from '@mui/icons-material/TimerOutlined';
import CalendarMonthOutlined from '@mui/icons-material/CalendarMonthOutlined';

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
    <Button
      variant="text"
      onClick={handleClick}
      endIcon={
        showTimer ? (
          <TimerOutlined fontSize="small" color="inherit" />
        ) : (
          <CalendarMonthOutlined fontSize="small" color="inherit" />
        )
      }
      sx={{
        color: (theme) => theme.palette.text.secondary,
        cursor: 'pointer',
        textTransform: 'none',
      }}
    >
      Last updated {showTimer ? timeLapsed : dateFormatted}
    </Button>
  );
};

export default Timestamp;
