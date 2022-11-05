import { useRef, useState } from 'react';
import apiClient from '../api/client';
import useAuth from './useAuth';

export interface DeleteMedication {
  medication_id: number;
}

interface Medication {
  id: number;
  medication_category_id: number;
  title: string;
  icon_key: string;
  icon_colour: string;
  increments: number[];
  default_increment_index: number;
  searchable: boolean;
  meta?: {
    created_at?: string;
    updated_at?: string;
    time_since_last_update?: string;
  };
}

export default function useDeleteMedication() {
  const [response, setResponse] = useState<Medication | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const controllerRef = useRef<AbortController | null>();
  const { onLogout, handleSetAuthError } = useAuth();

  const deleteMedication = (payload: DeleteMedication) => {
    setSubmitting(true);
    setError(false);

    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    const controller = new AbortController();
    controllerRef.current = controller;

    apiClient
      .delete(`/medications/${payload.medication_id}`, {
        signal: controllerRef.current?.signal,
      })
      .then((response) => setResponse(response.data))
      .catch((err) => {
        console.log(err);
        if (
          err.response?.statusText === 'Unauthorized' ||
          err.response?.data?.message === 'Unauthenticated.'
        ) {
          handleSetAuthError({ expired: true, unauthorised: false });
          onLogout();
        }
        if (err.code !== 'ERR_CANCELED') setError(true);
      })
      .finally(() => {
        controllerRef.current = null;
        setSubmitting(false);
      });
  };

  return { deleteMedication, response, error, submitting };
}
