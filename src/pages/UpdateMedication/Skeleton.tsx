import { Grid, Typography, Divider, Skeleton } from '@mui/material';

const MedicationFormSkeleton = ({ pageType }: { pageType: string }) => {
  return (
    <Grid container padding={2} spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h1" gutterBottom textAlign="center">
          {pageType} Medication
        </Typography>
        <Divider />
      </Grid>
      <Grid item xs={2} textAlign="center">
        <Skeleton variant="circular" height={55} width={55} />
      </Grid>
      <Grid item xs={10} textAlign="center">
        <Skeleton height={55} sx={{ transform: 'none' }} />
      </Grid>
      <Grid item xs={6} textAlign="center">
        <Skeleton height={55} sx={{ transform: 'none' }} />
      </Grid>
      <Grid item xs={6} textAlign="center">
        <Skeleton height={55} sx={{ transform: 'none' }} />
      </Grid>
      <Grid item xs={12} textAlign="center">
        <Skeleton height={30} sx={{ transform: 'none' }} />
      </Grid>
      <Grid item xs={4} textAlign="center">
        <Skeleton height={55} sx={{ transform: 'none' }} />
      </Grid>
      <Grid item xs={4} textAlign="center">
        <Skeleton height={55} sx={{ transform: 'none' }} />
      </Grid>
      <Grid item xs={4} textAlign="center">
        <Skeleton height={55} sx={{ transform: 'none' }} />
      </Grid>
      <Grid item xs={12} textAlign="center">
        <Skeleton height={30} sx={{ transform: 'none' }} />
      </Grid>
      <Grid item xs={12} textAlign="center">
        <Skeleton height={55} sx={{ transform: 'none' }} />
      </Grid>
      <Grid item xs={12} textAlign="center">
        <Skeleton height={55} sx={{ transform: 'none' }} />
      </Grid>
    </Grid>
  );
};

export default MedicationFormSkeleton;
