import { Outlet, useNavigate } from 'react-router-dom';
import { Box, Grid } from '@mui/material';

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
    <Box
      sx={{
        minWidth: '340px',
        maxWidth: '600px',
        margin: 'auto',
        height: '100%',
      }}
    >
      <Grid container height="100%">
        <Grid item xs={12}>
          <Outlet />
        </Grid>
        <Grid item xs>
          <NavBar />
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
