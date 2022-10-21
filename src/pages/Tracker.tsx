import { Fab, Grid, Skeleton, Typography, Box } from '@mui/material';
import { format, add, sub, isToday, isSameDay } from 'date-fns';
import { Vaccines, LastPage, ErrorOutline } from '@mui/icons-material';

import useFetchData from '../hooks/useFetchData';
import { DayNavigation, MedicationCard } from '../components';
import { useEffect, useState } from 'react';
import { useUpdateMedication } from '../hooks';
import { API_DATE_FORMAT } from '../utils/formatting';

interface TrackerData {
  id?: number;
  medicine_id: number;
  medicine_category_id: number;
  user_id: number;
  user_medicine_id: number;
  icon_color: string;
  icon_key: string;
  increments: [number];
  quantity: number;
  title: string;
  meta?: {
    created_at?: string;
    updated_at?: string;
    time_since_last_update?: string;
  };
}

const Tracker = () => {
  const [selectedDay, setSelectedDay] = useState<string>(
    format(new Date(), API_DATE_FORMAT)
  );
  const [isNextLimit, setIsNextLimit] = useState<boolean>(false);
  const [isPrevLimit, setIsPrevLimit] = useState<boolean>(false);
  const [medicationsForToday, setMedicationsForToday] = useState<
    TrackerData[] | null
  >(null);

  const { data, loading, error } = useFetchData('/tracker');
  const {
    updateMedication,
    response,
    submitting,
    error: updateError,
  } = useUpdateMedication();

  const handleMedicationUpdate = ({
    quantity,
    medicineId,
    id,
  }: {
    quantity: number;
    medicineId: number;
    id?: number;
  }) => {
    const updatedMedication = medicationsForToday?.find(
      (med) => med.medicine_id === medicineId
    );

    // handle if no meds found or no id
    if (updatedMedication) {
      if (id) {
        updateMedication({
          id,
          quantity: quantity || 0,
          date: selectedDay,
          medicine_id: updatedMedication.medicine_id,
        });
      } else {
        updateMedication({
          quantity: quantity || 0,
          date: selectedDay,
          user_id: updatedMedication.user_id,
          medicine_id: updatedMedication.medicine_id,
          user_medicine_id: updatedMedication.user_medicine_id,
        });
      }
    }
  };

  const prevDayClick = () => {
    const prevDay = sub(new Date(selectedDay), { days: 1 });
    setSelectedDay(format(prevDay, API_DATE_FORMAT));
  };
  const nextDayClick = () => {
    const nextDay = add(new Date(selectedDay), { days: 1 });
    setSelectedDay(format(nextDay, API_DATE_FORMAT));
  };

  const skipToTodayClick = () => {
    setSelectedDay(format(new Date(), API_DATE_FORMAT));
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
      setMedicationsForToday(data[selectedDay]);
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
        medicationsForToday.map((item) => {
          console.log(response?.[selectedDay]?.[item.medicine_id]?.data);

          return (
            <Grid
              item
              xs={12}
              key={item.id ? item.id : `${selectedDay}-${item.title}`}
            >
              <MedicationCard
                name={item.title}
                // icon={}
                amount={item.quantity}
                id={item.id}
                medicineId={item.medicine_id}
                incrementSettings={{
                  selectValues: item.increments,
                  defaultSelectedValue: item.increments[0],
                }}
                updated={
                  response?.[selectedDay]?.[item.medicine_id]?.data?.meta
                    ?.updated_at || item.meta?.updated_at
                }
                timeSinceUpdate={
                  response?.[selectedDay]?.[item.medicine_id]?.data?.meta
                    ?.time_since_last_update ||
                  item.meta?.time_since_last_update
                }
                updateError={updateError?.[selectedDay] === item.medicine_id}
                updateSubmitting={
                  submitting?.[selectedDay] === item.medicine_id
                }
                updateSuccess={!!response?.[selectedDay]?.[item.medicine_id]}
                handleUpdate={handleMedicationUpdate}
              />
            </Grid>
          );
        })}
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
