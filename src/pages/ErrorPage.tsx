import { Grid, Typography } from '@mui/material';
import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <Grid container padding={2}>
      <Grid item xs={12}>
        <Typography variant="h1">Oops!</Typography>
        <Typography>Sorry, an unexpected error has occurred.</Typography>
        <Typography variant="overline">
          {error.statusText || error.message}
        </Typography>
      </Grid>
    </Grid>
  );
}
