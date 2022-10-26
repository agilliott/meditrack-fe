import { useRef, useState } from 'react';
import apiClient from '../api/client';
import useAuth from './useAuth';

export interface UpdateMedicationProps {
  user_medicine_id: number;
  medicine_category_id?: number;
  title?: string;
  icon_key?: string;
  icon_colour?: string;
  increments?: number[];
  default_increment_index?: number;
  searchable?: boolean;
}

export interface CreateMedicationProps {
  medicine_category_id: number;
  title: string;
  icon_key: string;
  icon_colour: string;
  increments: number[];
  default_increment_index: number;
  searchable: boolean;
  measurements: string[];
}

interface Medicine {
  id: number;
  medicine_category_id: number;
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

interface MedicineLog {
  [key: number]: boolean;
}

export default function useUpdateMedication() {
  const [response, setResponse] = useState<Medicine | null>(null);
  const [error, setError] = useState<MedicineLog | null>(null);
  const [submitting, setSubmitting] = useState<MedicineLog | null>(null);
  const controllerRef = useRef<AbortController | null>();
  const { onLogout, handleSetAuthError } = useAuth();

  const updateMedication = (
    payload: CreateMedicationProps | UpdateMedicationProps
  ) => {
    const key =
      'user_medicine_id' in payload ? payload?.user_medicine_id : 'new';
    setSubmitting({ [key]: true });
    setError(null);

    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    const controller = new AbortController();
    controllerRef.current = controller;

    const updateClient =
      'user_medicine_id' in payload ? apiClient.put : apiClient.post;
    const updateUrl =
      'user_medicine_id' in payload
        ? `/medicine/${payload.user_medicine_id}`
        : '/medicine';

    updateClient(updateUrl, payload, {
      signal: controllerRef.current?.signal,
    })
      .then((response) => setResponse(response.data))
      .catch((err) => {
        if (
          err.response?.statusText === 'Unauthorized' ||
          err.response?.data?.message === 'Unauthenticated.'
        ) {
          handleSetAuthError({ expired: true, unauthorised: false });
          onLogout();
        }
        if (err.code !== 'ERR_CANCELED') setError({ [key]: true });
      })
      .finally(() => {
        controllerRef.current = null;
        setSubmitting(null);
      });
  };

  return { updateMedication, response, error, submitting };
}
