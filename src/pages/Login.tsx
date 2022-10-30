import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  Grid,
  TextField,
  Card,
  Typography,
  Button,
  Box,
  Alert,
} from '@mui/material';

import logo from '../assets/logo.png';
import useAuth from '../hooks/useAuth';
import { PATH_TRACKER } from '../routing/routes';

export type LoginInputs = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const { onLogin, loggedIn, loading, authError, unknownError } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>();

  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
    onLogin(data);
  };

  useEffect(() => {
    if (loggedIn && !loading) {
      navigate(`/${PATH_TRACKER}`);
    }
  }, [loggedIn, loading]);

  return (
    <Grid
      container
      padding={2}
      justifyContent="center"
      alignItems="center"
      sx={{ height: '100vh' }}
    >
      <Grid item>
        <Card elevation={3} sx={{ maxWidth: '400px' }}>
          <Box p={3} mt={2} textAlign="center">
            <img
              src={logo}
              alt="Meditrack"
              loading="lazy"
              height={96}
              width={96}
            />
            <Typography variant="h1">Meditrack</Typography>
            <Typography variant="subtitle2">
              Log into your Meditrack account.
            </Typography>
            {(authError.expired || authError.unauthorised) && (
              <Alert
                severity="error"
                variant="filled"
                sx={{ marginTop: '10px' }}
              >
                {authError.expired
                  ? 'Your session has expired.'
                  : 'Credentials not recognised.'}
              </Alert>
            )}
            {unknownError && (
              <Alert
                severity="error"
                variant="filled"
                sx={{ marginTop: '10px' }}
              >
                There was an error submitting your details.
              </Alert>
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2} padding={3}>
                <Grid item xs={12}>
                  <TextField
                    type="email"
                    label="Email"
                    inputProps={{
                      autoComplete: 'username',
                    }}
                    error={!!errors?.email}
                    helperText={!!errors?.email && 'Required'}
                    fullWidth
                    {...register('email', { required: true })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="password"
                    label="Password"
                    inputProps={{
                      autoComplete: 'current-password',
                    }}
                    error={!!errors?.password}
                    helperText={!!errors?.password && 'Required'}
                    fullWidth
                    {...register('password', { required: true })}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button type="submit" variant="contained" fullWidth>
                    Login
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Login;
