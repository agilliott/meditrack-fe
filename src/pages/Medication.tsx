import { useState, useEffect } from 'react';
import {
  Divider,
  Grid,
  Typography,
  Box,
  Skeleton,
  IconButton,
} from '@mui/material';
import {
  Vaccines,
  ErrorOutline,
  AddCircleOutlineOutlined,
} from '@mui/icons-material';
import { useFetchData } from '../hooks';
import { MedicationCard } from '../components';

type Medication = {
  id: number;
  title: string;
  searchable: boolean;
  medication_category_id: number;
  icon_colour: string;
  icon_key: string;
  default_increment_index: number;
  increments: number[];
  measurements: [];
  meta: {
    created_at: string;
    updated_at: string;
  };
};

const Medication = () => {
  const [medications, setMedications] = useState<Medication[] | null>(null);
  const [dataTransforming, setDataTransforming] = useState<boolean>(true);
  const { data, loading, error } = useFetchData(`/medications`);

  useEffect(() => {
    if (data && !medications) {
      setDataTransforming(true);
      setMedications(data.data);
      setDataTransforming(false);
    }
  }, [data]);

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
    <Grid container padding={2} spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h1" gutterBottom textAlign="center">
          Medication
        </Typography>
        <Divider />
      </Grid>
      {loading ||
        (dataTransforming && (
          <>
            <Grid item xs={12}>
              <Skeleton height={185} sx={{ transform: 'none' }} />
            </Grid>
            <Grid item xs={12}>
              <Skeleton height={185} sx={{ transform: 'none' }} />
            </Grid>
            <Grid item xs={12}>
              <Skeleton height={185} sx={{ transform: 'none' }} />
            </Grid>
            <Grid item xs={12}>
              <Skeleton height={185} sx={{ transform: 'none' }} />
            </Grid>
          </>
        ))}
      {!medications && (
        <Grid item xs={12} textAlign="center" sx={{ marginTop: '30vh' }}>
          <Box>
            <Vaccines fontSize="large" />
          </Box>
          <Typography variant="caption">No medications added</Typography>
        </Grid>
      )}
      <Grid item xs={12}>
        <Grid container spacing={2}>
          {medications?.map((med) => (
            <Grid item xs={12} key={med.id}>
              <MedicationCard {...med} />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={12} textAlign="center">
        <IconButton
          aria-label="Add medication"
          size="large"
          sx={{ opacity: 0.5 }}
        >
          <AddCircleOutlineOutlined fontSize="large" />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default Medication;
