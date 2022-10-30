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
  const [dataTransforming, setDataTransforming] = useState<boolean>(true);
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
    medicationId,
    id,
  }: {
    quantity: number;
    medicationId: number;
    id?: number;
  }) => {
    const updatedMedication = medicationsForToday?.find(
      (med) => med.user_medication_id === medicationId
    );

    if (updatedMedication) {
      if (id) {
        updateMedicationLog({
          id,
          quantity: quantity || 0,
          date: selectedDay,
          user_medication_id: updatedMedication.user_medication_id,
        });
      } else {
        updateMedicationLog({
          quantity: quantity || 0,
          date: selectedDay,
          user_id: updatedMedication.user_id,
          user_medication_id: updatedMedication.user_medication_id,
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

  const handleExpand = (medicationId: number, expandedStatus: boolean) => {
    const updatedExpandedStatus = { ...expanded };
    updatedExpandedStatus[selectedDay][medicationId] = !expandedStatus;
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
      setDataTransforming(true);
      setMedicationsForToday(medicationsForTheWeek[selectedDay]);

      if (!expanded?.[selectedDay]) {
        const expandedStatus: ExpandedCard = { [selectedDay]: {} };
        medicationsForTheWeek[selectedDay].forEach((med: MedicationLog) => {
          expandedStatus[selectedDay][med.user_medication_id] = false;
        });
        setExpanded({ ...expanded, ...expandedStatus });
      }
      setDataTransforming(false);
    }
  }, [medicationsForTheWeek, selectedDay, medicationsForToday]);

  useEffect(() => {
    if (response?.[selectedDay] && medicationsForToday) {
      const weeksMeds = { ...medicationsForTheWeek };
      const todaysMeds = [...medicationsForToday];
      const indexOfMedicaiton = todaysMeds.findIndex(
        (med) =>
          med.user_medication_id ===
          response[selectedDay]?.data?.user_medication_id
      );
      todaysMeds.splice(indexOfMedicaiton, 1, response[selectedDay]?.data);
      weeksMeds[selectedDay] = todaysMeds;
      setMedicationsForTheWeek(weeksMeds);
    }
  }, [response, selectedDay]);

  if (error) {
    return (
      <Grid item xs={12} textAlign="center" sx={{ marginTop: '30vh' }}>
        <Box>
          <ErrorOutline fontSize="large" />
        </Box>
        <Typography variant="caption">
          There has been a problem loading medications
        </Typography>
      </Grid>
    );
  }

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
        mt="55px"
        mb={isDateToday ? '55px' : '120px'}
      >
        {(loading || dataTransforming) && (
          <>
            <Grid item xs={12}>
              <Skeleton height={80} sx={{ transform: 'none' }} />
            </Grid>
            <Grid item xs={12}>
              <Skeleton height={80} sx={{ transform: 'none' }} />
            </Grid>
            <Grid item xs={12}>
              <Skeleton height={80} sx={{ transform: 'none' }} />
            </Grid>
            <Grid item xs={12}>
              <Skeleton height={80} sx={{ transform: 'none' }} />
            </Grid>
          </>
        )}
        {!medicationsForToday && (
          <Grid item xs={12} textAlign="center" sx={{ marginTop: '30vh' }}>
            <Box>
              <Vaccines fontSize="large" />
            </Box>
            <Typography variant="caption">
              No medications listed for today
            </Typography>
          </Grid>
        )}
        {medicationsForToday &&
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
                medicationId={item.user_medication_id}
                incrementSettings={{
                  selectValues: item.increments,
                  defaultSelectedValueIndex: item.default_increment_index || 0,
                }}
                expanded={
                  expanded?.[selectedDay]?.[item.user_medication_id] || false
                }
                setExpanded={handleExpand}
                updated={item.meta?.updated_at}
                timeSinceUpdate={item.meta?.time_since_last_update}
                updateError={
                  updateError?.[selectedDay] === item.user_medication_id
                }
                updateSubmitting={
                  submitting?.[selectedDay] === item.user_medication_id
                }
                updateSuccess={
                  response?.[selectedDay]?.data?.user_medication_id ===
                  item.user_medication_id
                }
                handleUpdate={handleMedicationUpdate}
              />
            </Grid>
          ))}
        {!isDateToday && (
          <Grid item xs={12}>
            <Box sx={{ float: 'right', width: 56 }}>
              <Fab
                onClick={skipToTodayClick}
                color="primary"
                aria-label="Skip to today"
                sx={{ position: 'fixed', bottom: '70px' }}
              >
                <LastPage />
              </Fab>
            </Box>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default Tracker;
