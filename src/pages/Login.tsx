import React from 'react';
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

import useAuth from '../hooks/useAuth';
import { PATH_TRACKER } from '../routing/routes';
import apiClient from '../api/client';

type Inputs = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const { onLogin } = useAuth();
  const [authError, setAuthError] = React.useState(false);
  const [unknownError, setUnknownError] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  // if already logged in, redirect to tracker

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    apiClient.get('sanctum/csrf-cookie').then(() => {
      apiClient
        .post('/login', {
          email: data.email,
          password: data.password,
        })
        .then((response) => {
          if (response.status === 204) {
            onLogin && onLogin();
          }
        })
        .then(() => {
          navigate(`/${PATH_TRACKER}`);
        })
        .catch((error) => {
          if (error.response && error.response.status === 422) {
            setAuthError(true);
          } else {
            setUnknownError(true);
          }
        });
    });
  };

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
          <Box p={3} textAlign="center">
            <Typography variant="h1">Meditrack</Typography>
            <Typography variant="subtitle2">
              Log into your Meditrack account.
            </Typography>
            {authError && (
              <Alert
                severity="error"
                variant="filled"
                sx={{ marginTop: '10px' }}
              >
                Credentials not recognised. Please try again.
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
