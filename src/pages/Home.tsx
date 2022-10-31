import { Grid, Typography } from '@mui/material';
import logo from '../assets/logo.png';

const Home = () => {
  return (
    <Grid
      container
      padding={2}
      spacing={2}
      alignContent="center"
      textAlign="center"
      height="100%"
    >
      <Grid item xs={12}>
        <img src={logo} alt="Meditrack" loading="lazy" height={96} width={96} />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="overline" gutterBottom>
          Welcome to
        </Typography>
        <Typography variant="h2" gutterBottom>
          Meditrack
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Home;
