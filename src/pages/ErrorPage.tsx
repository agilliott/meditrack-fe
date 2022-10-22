import { Grid, Typography } from '@mui/material';
import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error: any = useRouteError();

  return (
    <Grid container padding={2}>
      <Grid item xs={12}>
        <Typography variant="h1">Oops!</Typography>
        <Typography variant="h2">
          Sorry, an unexpected error has occurred.
        </Typography>
        <Typography>{error.statusText || error.message}</Typography>
      </Grid>
    </Grid>
  );
}
