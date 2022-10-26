import ArrowBackIosNew from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';
import { Grid, Paper, Typography, IconButton } from '@mui/material';
import { format, isToday } from 'date-fns';

interface DayNavigationProps {
  selectedDate: Date;
  hitPrevLimit: boolean;
  hitNextLimit: boolean;
  prevCallback: () => void;
  nextCallback: () => void;
}

const DayNavigation = ({
  selectedDate = new Date(),
  hitPrevLimit,
  hitNextLimit,
  prevCallback,
  nextCallback,
}: DayNavigationProps) => {
  const isDateToday = isToday(selectedDate);
  const day = isDateToday ? 'Today' : format(selectedDate, 'eeee');
  const title = format(selectedDate, 'PPP');

  return (
    <Paper
      elevation={3}
      sx={{
        backgroundColor: (theme) => theme.palette.primary.main,
        borderRadius: 100,
      }}
    >
      <Grid container justifyContent="space-between">
        <Grid item>
          <IconButton
            aria-label="Previous day"
            onClick={prevCallback}
            disabled={hitPrevLimit}
            sx={{ padding: '14px' }}
          >
            <ArrowBackIosNew />
          </IconButton>
        </Grid>
        <Grid
          item
          xs
          padding={1}
          sx={{
            lineHeight: 1,
            backgroundColor: (theme) => theme.palette.primary.dark,
          }}
        >
          <Typography
            variant="overline"
            display="block"
            sx={{ lineHeight: 1.8 }}
          >
            {day}
          </Typography>
          <Typography variant="caption" sx={{ lineHeight: 1 }}>
            {title}
          </Typography>
        </Grid>
        <Grid item>
          <IconButton
            aria-label="Next day"
            onClick={nextCallback}
            disabled={hitNextLimit}
            sx={{ padding: '14px' }}
          >
            <ArrowForwardIos />
          </IconButton>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default DayNavigation;
