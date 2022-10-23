import { useEffect, useRef, useState } from 'react';
import apiClient from '../api/client';
import { TrackerData } from '../pages/Tracker';

interface BaseMedicationApiProps {
  date: string;
  user_medicine_id: number;
}

export interface UpdateMedicationProps extends BaseMedicationApiProps {
  id: number;
  quantity: number;
}

export interface CreateMedicationProps extends BaseMedicationApiProps {
  quantity: number;
  date: string;
  user_id: number;
}

interface DayMedicineLog {
  [key: string]: number;
}

interface DayMedicineResponse {
  [key: string]: {
    data: TrackerData;
  };
}

export default function useUpdateMedication() {
  const [response, setResponse] = useState<DayMedicineResponse | null>(null);
  const [error, setError] = useState<DayMedicineLog | null>(null);
  const [submitting, setSubmitting] = useState<DayMedicineLog | null>(null);
  const controllerRef = useRef<AbortController | null>();

  const updateMedication = (
    payload: CreateMedicationProps | UpdateMedicationProps
  ) => {
    setSubmitting({ [payload.date]: payload.user_medicine_id });
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
        if (err.code !== 'ERR_CANCELED')
          setError({ [payload.date]: payload.user_medicine_id });
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

  return { updateMedication, response, error, submitting };
}
