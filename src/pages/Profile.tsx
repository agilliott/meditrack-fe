import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Typography, Button, Divider } from '@mui/material';
import { PATH_LOGIN } from '../routing/routes';
import useAuth from '../hooks/useAuth';
import { notifyError } from '../utils/toasts';

const Profile = () => {
  const navigate = useNavigate();
  const { onLogout, logoutError, loading, loggedIn } = useAuth();

  const handleLogout = () => {
    onLogout();
  };

  useEffect(() => {
    if (!logoutError && !loading && !loggedIn) {
      navigate(`/${PATH_LOGIN}`);
    }
  }, [logoutError, loading, loggedIn]);

  useEffect(() => {
    if (logoutError) {
      notifyError({ message: 'There was a problem logging out' });
    }
  }, [logoutError]);

  return (
    <Grid container padding={2} spacing={2} alignContent="space-between">
      <Grid item xs={12}>
        <Typography variant="h1" gutterBottom textAlign="center">
          Profile
        </Typography>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <Button fullWidth variant="outlined" onClick={handleLogout}>
          Log out
        </Button>
      </Grid>
    </Grid>
  );
};

export default Profile;
