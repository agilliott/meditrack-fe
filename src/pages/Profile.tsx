import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Typography, Button, Divider, Alert } from '@mui/material';
import { PATH_LOGIN } from '../routing/routes';
import useAuth from '../hooks/useAuth';
import apiClient from '../api/client';

const Profile = () => {
  const [error, setError] = useState<boolean>(false);
  const navigate = useNavigate();
  const { onLogout } = useAuth();

  const handleLogout = () => {
    setError(false);
    apiClient.get('sanctum/csrf-cookie').then(() => {
      apiClient
        .post('/logout')
        .then((response) => {
          if (response.status === 204) {
            onLogout && onLogout();
          }
        })
        .then(() => {
          navigate(`/${PATH_LOGIN}`);
        })
        .catch((err) => setError(true));
    });
  };

  return (
    <Grid container padding={2} spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h1" gutterBottom>
          Profile
        </Typography>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        {error && (
          <Alert
            severity="error"
            variant="filled"
            sx={{ marginBottom: '20px' }}
          >
            There was a problem logging out
          </Alert>
        )}
        <Button variant="outlined" onClick={handleLogout}>
          Log out
        </Button>
      </Grid>
    </Grid>
  );
};

export default Profile;
