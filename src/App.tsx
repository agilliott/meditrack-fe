import { Outlet, useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';

import useAuth from './hooks/useAuth';
import NavBar from './components/NavBar';
import { PATH_LOGIN } from './routing/routes';
import { useEffect } from 'react';

function App() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     navigate(`/${PATH_LOGIN}`);
  //   }
  // }, [isAuthenticated]);

  return (
    <Grid container justifyContent="center">
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
