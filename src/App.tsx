import { Outlet, useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';

import useAuth from './hooks/useAuth';
import NavBar from './components/NavBar';
import { PATH_LOGIN } from './routing/routes';
import { useEffect } from 'react';

function App() {
  const { loading, loggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !loggedIn) {
      navigate(`/${PATH_LOGIN}`);
    }
  }, [loggedIn, loading]);

  return (
    <Grid container justifyContent="center" sx={{ minWidth: '340px' }}>
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
