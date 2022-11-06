import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, Typography, Divider } from '@mui/material';
import { PATH_MEDICATION } from '../../routing/routes';
import {
  useUpdateMedication,
  useDeleteMedication,
  useFetchData,
} from '../../hooks';
import { notifyError, notifySuccess } from '../../utils/toasts';
import { FIELD_ICON_COLOUR, FIELD_ICON_KEY } from './consts';
import { schema } from './validationSchema';
import MedicationFormSkeleton from './Skeleton';
import UpdateMedicationForm, { FormInput } from './Form';

interface UpdateMedicationProps {
  add?: boolean;
}

export interface FormPayload {
  user_medication_id?: number;
  medication_category_id: number;
  title: string;
  icon_key: string;
  icon_colour: string;
  increments: number[];
  default_increment_index: number;
  searchable: boolean;
  measurements: string[][];
}

const UpdateMedication = ({ add = false }: UpdateMedicationProps) => {
  const pageType = add ? 'Add' : 'Edit';
  const navigate = useNavigate();
  const { medicationId } = useParams();
  const fetchUrl = medicationId ? `medications/${medicationId}` : undefined;
  const { data, error: fetchError } = useFetchData(fetchUrl);

  const {
    updateMedication,
    response: updateResonse,
    error: updateError,
    submitting: updateSubmitting,
  } = useUpdateMedication();
  const {
    deleteMedication,
    response: deleteResponse,
    error: deleteError,
    submitting: deleteSubmitting,
  } = useDeleteMedication();

  const formMethods = useForm<FormInput>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      icon_key: 'INSULIN',
      icon_colour: 'red1',
      increment_1: 1,
      increment_2: 2,
      increment_3: 5,
      searchable: false,
    },
  });

  const { reset, watch } = formMethods;

  const onSubmit = (data: FormInput) => {
    const tranformedData: FormPayload = {
      title: data.title,
      icon_key: data.icon_key,
      icon_colour: data.icon_colour,
      searchable: data.searchable,
      default_increment_index: 0,
      medication_category_id: 1,
      measurements: [[]],
      increments: [data.increment_1, data.increment_2, data.increment_3],
    };
    if (medicationId) {
      tranformedData.user_medication_id = Number(medicationId);
    }
    updateMedication(tranformedData);
  };

  const onDelete = () => {
    if (medicationId) {
      deleteMedication({ medication_id: Number(medicationId) });
    }
  };

  const watchedIconColor = watch(FIELD_ICON_COLOUR);
  const watchedIconKey = watch(FIELD_ICON_KEY);

  const handleCancel = () => {
    navigate(`/${PATH_MEDICATION}`);
  };

  useEffect(() => {
    if (!add && data) {
      const { title, icon_key, icon_colour, searchable, increments } =
        data.data;
      const newDefaultValues: FormInput = {
        title,
        icon_key,
        icon_colour,
        increment_1: increments[0],
        increment_2: increments[1],
        increment_3: increments[2],
        searchable,
      };
      reset(newDefaultValues);
    }
  }, [data, add]);

  useEffect(() => {
    if (updateResonse || deleteResponse) {
      const addOrSave = add ? 'added' : 'saved';
      navigate(`/${PATH_MEDICATION}`);
      notifySuccess({
        message: `Medication ${updateResonse ? addOrSave : 'deleted'}`,
      });
    }
  }, [updateResonse, deleteResponse]);

  useEffect(() => {
    if (updateError || deleteError) {
      const addOrEdit = add ? 'add' : 'edit';
      notifyError({
        message: `Could not ${updateResonse ? addOrEdit : 'delete'} medication`,
      });
    }
  }, [updateError, deleteError]);

  useEffect(() => {
    if (fetchError) {
      notifyError({
        message: `Could not fetch medication details`,
      });
    }
  }, [fetchError]);

  if (!add && !data) {
    return <MedicationFormSkeleton pageType={pageType} />;
  }

  return (
    <Grid container padding={2} spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h1" gutterBottom textAlign="center">
          {pageType} Medication
        </Typography>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <UpdateMedicationForm
          add={add}
          onSubmit={onSubmit}
          watchedIconColor={watchedIconColor}
          watchedIconKey={watchedIconKey}
          updateSubmitting={!!updateSubmitting}
          deleteSubmitting={deleteSubmitting}
          onDelete={onDelete}
          handleCancel={handleCancel}
          formMethods={formMethods}
        />
      </Grid>
    </Grid>
  );
};

export default UpdateMedication;
