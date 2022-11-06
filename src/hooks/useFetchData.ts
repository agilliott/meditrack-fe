import { useEffect, useRef, useState } from 'react';
import { AxiosError } from 'axios';
import apiClient from '../api/client';
import useAuth from './useAuth';

export default function useFetchData(url?: string) {
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const controllerRef = useRef<AbortController | null>();
  const { onLogout, handleSetAuthError } = useAuth();

  useEffect(() => {
    if (!data && url) {
      setLoading(true);
      setError(null);

      if (controllerRef.current) {
        controllerRef.current.abort();
      }

      const controller = new AbortController();
      controllerRef.current = controller;

      apiClient
        .get(url, { signal: controllerRef.current?.signal })
        .then((response) => response.data)
        .then(setData)
        .catch((err) => {
          if (
            err.response?.statusText === 'Unauthorized' ||
            err.response?.data?.message === 'Unauthenticated.'
          ) {
            handleSetAuthError({ expired: true, unauthorised: false });
            onLogout();
          }
          if (err.code !== 'ERR_CANCELED') setError(err);
        })
        .finally(() => {
          setLoading(false);
          controllerRef.current = null;
        });
    }
  }, [url, data]);

  return { data, error, loading };
}
