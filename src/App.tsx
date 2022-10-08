import { Outlet } from 'react-router-dom';
import { Grid } from '@mui/material';

import NavBar from './components/NavBar';

function App() {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Outlet />
      </Grid>
      <Grid item xs={12}>
        <NavBar />
      </Grid>
    </Grid>
  );
}

export default App;
