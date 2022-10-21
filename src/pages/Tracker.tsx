import { Fab, Grid, Skeleton, Typography } from '@mui/material';
import { format, add, sub, isToday, isSameDay } from 'date-fns';
import { Vaccines, LastPage, ErrorOutline } from '@mui/icons-material';

import useFetchData from '../hooks/useFetchData';
import { DayNavigation, MedicationCard } from '../components';
import { MedicationCardProps } from '../components/MedicationCard';
import { useEffect, useState } from 'react';
import { Box } from '@mui/system';

interface TrackerData {
  icon_color: string;
  icon_key: string;
  id?: number;
  increments: [number];
  quantity: number;
  medicine_category_id: number;
  medicine_id: number;
  title: string;
  updated?: string;
}

const transformTrackerData = (data: TrackerData): MedicationCardProps => {
  // TODO Figure out the icon symantics. Icon name + icon color 'blue1' etc.
  return {
    name: data.title,
    amount: data.quantity,
    id: data.id || undefined,
    incrementSettings: {
      selectValues: data.increments,
      defaultSelectedValue: data.increments[0], // TODO
    },
    updated: data.updated || undefined,
  };
};

const Tracker = () => {
  const [selectedDay, setSelectedDay] = useState<string>(
    format(new Date(), 'yyyy-MM-dd')
  );
  const [isNextLimit, setIsNextLimit] = useState<boolean>(false);
  const [isPrevLimit, setIsPrevLimit] = useState<boolean>(false);

  const { data, loading, error } = useFetchData('/tracker');
  const [medicationsForToday, setMedicationsForToday] = useState<
    MedicationCardProps[] | null
  >(null);

  const prevDayClick = () => {
    const prevDay = sub(new Date(selectedDay), { days: 1 });
    setSelectedDay(format(prevDay, 'yyyy-MM-dd'));
  };
  const nextDayClick = () => {
    const nextDay = add(new Date(selectedDay), { days: 1 });
    setSelectedDay(format(nextDay, 'yyyy-MM-dd'));
  };

  const skipToTodayClick = () => {
    setSelectedDay(format(new Date(), 'yyyy-MM-dd'));
  };

  const isDateToday = isToday(new Date(selectedDay));
  const lastWeek = sub(new Date(), { days: 7 });
  const is7DaysAgo = isSameDay(lastWeek, new Date(selectedDay));
  useEffect(() => {
    setIsNextLimit(isDateToday);
    setIsPrevLimit(is7DaysAgo);
  }, [selectedDay]);

  useEffect(() => {
    if (data?.[selectedDay]) {
      const transformedData = data[selectedDay].map((medication: TrackerData) =>
        transformTrackerData(medication)
      );
      setMedicationsForToday(transformedData);
    }
  }, [data, selectedDay]);

  return (
    <Grid container spacing={2} padding={2} mb={isDateToday ? '55px' : '120px'}>
      <Grid item xs={12} textAlign="center">
        <DayNavigation
          selectedDate={new Date(selectedDay)}
          hitPrevLimit={isPrevLimit}
          hitNextLimit={isNextLimit}
          prevCallback={prevDayClick}
          nextCallback={nextDayClick}
        />
      </Grid>
      {loading && !error && (
        <Grid item xs={12}>
          <Skeleton height={120} />
          <Skeleton height={120} />
          <Skeleton height={120} />
        </Grid>
      )}
      {error && (
        <Grid item xs={12} textAlign="center" sx={{ marginTop: '30vh' }}>
          <Box>
            <ErrorOutline fontSize="large" />
          </Box>
          <Typography variant="caption">
            There has been a problem loading medications
          </Typography>
        </Grid>
      )}
      {!medicationsForToday && !loading && !error && (
        <Grid item xs={12} textAlign="center" sx={{ marginTop: '30vh' }}>
          <Box>
            <Vaccines fontSize="large" />
          </Box>
          <Typography variant="caption">
            No medications listed for today
          </Typography>
        </Grid>
      )}
      {!loading &&
        !error &&
        medicationsForToday &&
        medicationsForToday.map((item) => (
          <Grid
            item
            xs={12}
            key={item.id ? item.id : `${selectedDay}-${item.name}`}
          >
            <MedicationCard {...item} />
          </Grid>
        ))}
      {!isDateToday && (
        <Grid item xs={12}>
          <Fab
            onClick={skipToTodayClick}
            color="primary"
            aria-label="Skip to today"
            sx={{ position: 'fixed', bottom: '70px', right: '20px' }}
          >
            <LastPage />
          </Fab>
        </Grid>
      )}
    </Grid>
  );
};

export default Tracker;
