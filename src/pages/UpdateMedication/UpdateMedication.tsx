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
  Measurement,
} from '../../hooks';
import { notifyError, notifySuccess } from '../../utils/toasts';
import { schema } from './validationSchema';
import MedicationFormSkeleton from './Skeleton';
import UpdateMedicationForm, { FormInput } from './Form';
import {
  FIELD_BASE_CAPACITY,
  FIELD_BASE_UNIT,
  FIELD_ICON_COLOUR,
  FIELD_ICON_KEY,
  FIELD_INCREMENT_1,
  FIELD_INCREMENT_2,
  FIELD_INCREMENT_3,
  FIELD_SEARCHABLE,
  FIELD_TITLE,
} from './consts';

interface UpdateMedicationProps {
  add?: boolean;
}

type FormMeasurement = {
  order: number;
  capacity: number;
  unit: string;
};
export interface FormPayload {
  user_medication_id?: number;
  medication_category_id: number;
  title: string;
  icon_key: string;
  icon_colour: string;
  increments: number[];
  default_increment_index: number;
  searchable: boolean;
  measurements: FormMeasurement[];
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
      [FIELD_TITLE]: '',
      [FIELD_ICON_KEY]: 'INSULIN',
      [FIELD_ICON_COLOUR]: 'red1',
      [FIELD_INCREMENT_1]: 1,
      [FIELD_INCREMENT_2]: 2,
      [FIELD_INCREMENT_3]: 5,
      [FIELD_SEARCHABLE]: false,
      [FIELD_BASE_CAPACITY]: 1,
      [FIELD_BASE_UNIT]: {},
    },
  });

  const { reset } = formMethods;

  const onSubmit = (data: FormInput) => {
    const tranformedData: FormPayload = {
      title: data.title,
      icon_key: data.icon_key,
      icon_colour: data.icon_colour,
      searchable: data.searchable,
      default_increment_index: 0,
      medication_category_id: 1,
      measurements: [],
      increments: [data.increment_1, data.increment_2, data.increment_3],
    };

    if (data?.measurements && data.base_capacity && data.base_unit) {
      const measurementsPayload: Measurement[] = data.measurements.map(
        (measure, index) => ({
          capacity: Number(measure.capacity),
          unit: measure.unit.value,
          order: index + 1,
        })
      );
      measurementsPayload.unshift({
        capacity: data.base_capacity,
        unit: data.base_unit.value,
        order: 0,
      });
      tranformedData.measurements = measurementsPayload;
    }

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
        base_capacity: 1,
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
        message: `Could not ${updateError ? addOrEdit : 'delete'} medication`,
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
