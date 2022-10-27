import { useEffect, useRef, useState } from 'react';
import apiClient from '../api/client';
import useAuth from './useAuth';

interface BaseMedicationLogApiProps {
  date: string;
  user_medication_id: number;
}

export interface UpdateMedicationLogProps extends BaseMedicationLogApiProps {
  id: number;
  quantity: number;
}

export interface CreateMedicationLogProps extends BaseMedicationLogApiProps {
  quantity: number;
  date: string;
  user_id: number;
}

export interface MedicationLog {
  id?: number;
  medication_category_id: number;
  user_id: number;
  user_medication_id: number;
  icon_colour: string;
  icon_key: string;
  increments: [number];
  default_increment_index: number;
  quantity: number;
  title: string;
  meta?: {
    created_at?: string;
    updated_at?: string;
    time_since_last_update?: string;
  };
}

interface DayMedicationLog {
  [key: string]: number;
}

interface DayMedicationLogResponse {
  [key: string]: {
    data: MedicationLog;
  };
}

export default function useUpdateMedicationLog() {
  const [response, setResponse] = useState<DayMedicationLogResponse | null>(
    null
  );
  const [error, setError] = useState<DayMedicationLog | null>(null);
  const [submitting, setSubmitting] = useState<DayMedicationLog | null>(null);
  const controllerRef = useRef<AbortController | null>();
  const { onLogout, handleSetAuthError } = useAuth();

  const updateMedicationLog = (
    payload: CreateMedicationLogProps | UpdateMedicationLogProps
  ) => {
    setSubmitting({ [payload.date]: payload.user_medication_id });
    setError(null);

    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    const controller = new AbortController();
    controllerRef.current = controller;

    const updateClient = 'id' in payload ? apiClient.put : apiClient.post;
    const updateUrl = 'id' in payload ? `/tracker/${payload.id}` : '/tracker';

    updateClient(updateUrl, payload, {
      signal: controllerRef.current?.signal,
    })
      .then((response) => setResponse({ [payload.date]: response.data }))
      .catch((err) => {
        if (
          err.response?.statusText === 'Unauthorized' ||
          err.response?.data?.message === 'Unauthenticated.'
        ) {
          handleSetAuthError({ expired: true, unauthorised: false });
          onLogout();
        }
        if (err.code !== 'ERR_CANCELED')
          setError({ [payload.date]: payload.user_medication_id });
      })
      .finally(() => {
        controllerRef.current = null;
        setTimeout(() => setSubmitting(null), 1000);
      });
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => setError(null), 2000);
    }
    if (response && !submitting) {
      setTimeout(() => setResponse(null), 2000);
    }
  }, [error, response, submitting]);

  return { updateMedicationLog, response, error, submitting };
}
