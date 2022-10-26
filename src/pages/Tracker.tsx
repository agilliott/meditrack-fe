import { useEffect, useState } from 'react';
import { Fab, Grid, Skeleton, Typography, Box } from '@mui/material';
import { format, add, sub, isToday, isSameDay } from 'date-fns';
import { Vaccines, LastPage, ErrorOutline } from '@mui/icons-material';

import { useUpdateMedicatonLog, useFetchData, MedicationLog } from '../hooks';
import { DayNavigation, MedicationLogCard } from '../components';
import { API_DATE_FORMAT } from '../utils/formatting';

interface WeekData {
  [key: string]: MedicationLog[];
}

type ExpandedCard = {
  [key: string]: {
    [key: number]: boolean;
  };
};

const Tracker = () => {
  const [selectedDay, setSelectedDay] = useState<string>(
    format(new Date(), API_DATE_FORMAT)
  );
  const [expanded, setExpanded] = useState<ExpandedCard | null>(null);
  const [isNextLimit, setIsNextLimit] = useState<boolean>(false);
  const [isPrevLimit, setIsPrevLimit] = useState<boolean>(false);
  const [medicationsForTheWeek, setMedicationsForTheWeek] =
    useState<WeekData | null>(null);
  const [medicationsForToday, setMedicationsForToday] = useState<
    MedicationLog[] | null
  >(null);

  const { data, loading, error } = useFetchData(`/tracker?date=${selectedDay}`);
  const {
    updateMedicationLog,
    response,
    submitting,
    error: updateError,
  } = useUpdateMedicatonLog();

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
      (med) => med.user_medicine_id === medicineId
    );

    // handle if no meds found or no id
    if (updatedMedication) {
      if (id) {
        updateMedicationLog({
          id,
          quantity: quantity || 0,
          date: selectedDay,
          user_medicine_id: updatedMedication.user_medicine_id,
        });
      } else {
        updateMedicationLog({
          quantity: quantity || 0,
          date: selectedDay,
          user_id: updatedMedication.user_id,
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

  const handleExpand = (medicineId: number, expandedStatus: boolean) => {
    const updatedExpandedStatus = { ...expanded };
    updatedExpandedStatus[selectedDay][medicineId] = !expandedStatus;
    setExpanded(updatedExpandedStatus);
  };

  const isDateToday = isToday(new Date(selectedDay));
  const lastWeek = sub(new Date(), { days: 7 });
  const is7DaysAgo = isSameDay(lastWeek, new Date(selectedDay));

  useEffect(() => {
    setIsNextLimit(isDateToday);
    setIsPrevLimit(is7DaysAgo);
  }, [selectedDay]);

  useEffect(() => {
    if (data) {
      setMedicationsForTheWeek(data);
    }
  }, [data]);

  useEffect(() => {
    if (medicationsForTheWeek?.[selectedDay]) {
      setMedicationsForToday(medicationsForTheWeek[selectedDay]);

      if (!expanded?.[selectedDay]) {
        const expandedStatus: ExpandedCard = { [selectedDay]: {} };
        medicationsForTheWeek[selectedDay].forEach((med: MedicationLog) => {
          expandedStatus[selectedDay][med.user_medicine_id] = false;
        });
        setExpanded({ ...expanded, ...expandedStatus });
      }
    }
  }, [medicationsForTheWeek, selectedDay, medicationsForToday]);

  useEffect(() => {
    if (response?.[selectedDay] && medicationsForToday) {
      const weeksMeds = { ...medicationsForTheWeek };
      const todaysMeds = [...medicationsForToday];
      const indexOfMedicaiton = todaysMeds.findIndex(
        (med) =>
          med.user_medicine_id === response[selectedDay]?.data?.user_medicine_id
      );
      todaysMeds.splice(indexOfMedicaiton, 1, response[selectedDay]?.data);
      weeksMeds[selectedDay] = todaysMeds;
      setMedicationsForTheWeek(weeksMeds);
    }
  }, [response, selectedDay]);

  return (
    <>
      <Box
        width="100%"
        maxWidth="600px"
        minWidth="340px"
        position="fixed"
        zIndex={1}
        p={2}
        sx={{
          backgroundColor: (theme) => theme.palette.background.paper,
        }}
      >
        <DayNavigation
          selectedDate={new Date(selectedDay)}
          hitPrevLimit={isPrevLimit}
          hitNextLimit={isNextLimit}
          prevCallback={prevDayClick}
          nextCallback={nextDayClick}
        />
      </Box>
      <Grid
        container
        spacing={2}
        padding={2}
        mt="50px"
        mb={isDateToday ? '55px' : '120px'}
      >
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
              key={item.id ? item.id : `${selectedDay}-${item.title}`}
            >
              <MedicationLogCard
                name={item.title}
                icon={{ name: item.icon_key, color: item.icon_colour }}
                amount={item.quantity}
                id={item.id}
                medicineId={item.user_medicine_id}
                incrementSettings={{
                  selectValues: item.increments,
                  defaultSelectedValueIndex: item.default_increment_index || 0,
                }}
                expanded={
                  expanded?.[selectedDay]?.[item.user_medicine_id] || false
                }
                setExpanded={handleExpand}
                updated={item.meta?.updated_at}
                timeSinceUpdate={item.meta?.time_since_last_update}
                updateError={
                  updateError?.[selectedDay] === item.user_medicine_id
                }
                updateSubmitting={
                  submitting?.[selectedDay] === item.user_medicine_id
                }
                updateSuccess={
                  response?.[selectedDay]?.data?.user_medicine_id ===
                  item.user_medicine_id
                }
                handleUpdate={handleMedicationUpdate}
              />
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
    </>
  );
};

export default Tracker;
