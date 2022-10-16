import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import { Grid, Paper, Typography, IconButton } from '@mui/material';
import { format, isToday } from 'date-fns';

interface DayNavgationProps {
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
}: DayNavgationProps) => {
  const isDateToday = isToday(selectedDate);
  const day = isDateToday ? 'Today' : format(selectedDate, 'eeee');
  const title = format(selectedDate, 'PPP');

  console.log({ hitPrevLimit, hitNextLimit });

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
          >
            <ArrowBackIosNew fontSize="large" />
          </IconButton>
        </Grid>
        <Grid
          item
          xs={8}
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
          >
            <ArrowForwardIos fontSize="large" />
          </IconButton>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default DayNavigation;
