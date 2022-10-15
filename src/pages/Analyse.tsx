import { Divider, Grid, Typography } from '@mui/material';

const Analyse = () => {
  return (
    <Grid container padding={2} spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h1" gutterBottom>
          Analyse
        </Typography>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <Typography>Coming soon</Typography>
      </Grid>
    </Grid>
  );
};

export default Analyse;
