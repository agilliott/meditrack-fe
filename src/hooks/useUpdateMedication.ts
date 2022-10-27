import { useRef, useState } from 'react';
import apiClient from '../api/client';
import useAuth from './useAuth';

export interface UpdateMedicationProps {
  user_medication_id: number;
  medication_category_id?: number;
  title?: string;
  icon_key?: string;
  icon_colour?: string;
  increments?: number[];
  default_increment_index?: number;
  searchable?: boolean;
}

export interface CreateMedicationProps {
  medication_category_id: number;
  title: string;
  icon_key: string;
  icon_colour: string;
  increments: number[];
  default_increment_index: number;
  searchable: boolean;
  measurements: string[];
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

interface MedicationLog {
  [key: number]: boolean;
}

export default function useUpdateMedication() {
  const [response, setResponse] = useState<Medication | null>(null);
  const [error, setError] = useState<MedicationLog | null>(null);
  const [submitting, setSubmitting] = useState<MedicationLog | null>(null);
  const controllerRef = useRef<AbortController | null>();
  const { onLogout, handleSetAuthError } = useAuth();

  const updateMedication = (
    payload: CreateMedicationProps | UpdateMedicationProps
  ) => {
    const key =
      'user_medication_id' in payload ? payload?.user_medication_id : 'new';
    setSubmitting({ [key]: true });
    setError(null);

    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    const controller = new AbortController();
    controllerRef.current = controller;

    const updateClient =
      'user_medication_id' in payload ? apiClient.put : apiClient.post;
    const updateUrl =
      'user_medication_id' in payload
        ? `/medication/${payload.user_medication_id}`
        : '/medication';

    updateClient(updateUrl, payload, {
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
        if (err.code !== 'ERR_CANCELED') setError({ [key]: true });
      })
      .finally(() => {
        controllerRef.current = null;
        setSubmitting(null);
      });
  };

  return { updateMedication, response, error, submitting };
}
