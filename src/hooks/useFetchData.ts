import { useEffect, useRef, useState } from 'react';
import { AxiosError } from 'axios';
import apiClient from '../api/client';

export default function useFetchData(url: string) {
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const controllerRef = useRef<AbortController | null>();

  useEffect(() => {
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
      .catch(setError)
      .finally(() => {
        setLoading(false);
        controllerRef.current = null;
      });
  }, [url]);

  return { data, error, loading };
}
