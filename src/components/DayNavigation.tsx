import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { format, isToday } from 'date-fns';

interface DayNavgationProps {
  selectedDate: Date;
  prevCallback: () => void;
  nextCallback: () => void;
}

const DayNavigation = ({
  selectedDate = new Date(),
  prevCallback,
  nextCallback,
}: DayNavgationProps) => {
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
        <Grid item padding={1}>
          <Box
            height={35}
            mt="1px"
            role="button"
            aria-label="Previous day"
            onClick={prevCallback}
          >
            <ArrowBackIosNew
              fontSize="large"
              sx={{ color: (theme) => theme.palette.primary.dark }}
            />
          </Box>
        </Grid>
        <Grid
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
        <Grid item padding={1}>
          <Box
            height={35}
            role="button"
            aria-label="Next day"
            onClick={nextCallback}
          >
            <ArrowForwardIos
              fontSize="large"
              sx={{ color: (theme) => theme.palette.primary.dark }}
            />
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default DayNavigation;