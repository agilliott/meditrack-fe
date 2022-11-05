import { useNavigate, useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Grid,
  Typography,
  Divider,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Alert,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  DeleteOutline,
  CheckCircleOutline,
  CancelOutlined,
} from '@mui/icons-material';
import { ColorChoices, IconChoices, getIcon } from '../utils/getIcon';
import { useUpdateMedication, useDeleteMedication } from '../hooks';
import { useEffect } from 'react';
import { PATH_MEDICATION } from '../routing/routes';

interface UpdateMedicationProps {
  add?: boolean;
}

interface FormInput {
  title: string;
  searchable: boolean;
  icon_key: IconChoices;
  icon_colour: ColorChoices;
  increment_1: number;
  increment_2: number;
  increment_3: number;
}

type SelectOptionsKey = {
  key: IconChoices;
  label: string;
};

type SelectOptionsColor = {
  key: ColorChoices;
  label: string;
};

const iconKeys: SelectOptionsKey[] = [
  { key: 'INSULIN', label: 'Insulin' },
  { key: 'TEST_STRIP', label: 'Test Strip' },
  { key: 'NEEDLE', label: 'Needle' },
];
const iconColors: SelectOptionsColor[] = [
  { key: 'red1', label: 'Red 1' },
  { key: 'red2', label: 'Red 2' },
  { key: 'blue1', label: 'Blue 1' },
  { key: 'blue2', label: 'Blue 2' },
  { key: 'green1', label: 'Green 1' },
  { key: 'green2', label: 'Green 2' },
  { key: 'yellow1', label: 'Yellow 1' },
  { key: 'yellow2', label: 'Yellow 2' },
  { key: 'purple1', label: 'Purple 1' },
  { key: 'purple2', label: 'Purple 2' },
  { key: 'orange1', label: 'Orange 1' },
  { key: 'orange2', label: 'Orange 2' },
];

const FIELD_TITLE = 'title',
  FIELD_SEARCHABLE = 'searchable',
  FIELD_ICON_KEY = 'icon_key',
  FIELD_ICON_COLOUR = 'icon_colour',
  FIELD_INCREMENT_1 = 'increment_1',
  FIELD_INCREMENT_2 = 'increment_2',
  FIELD_INCREMENT_3 = 'increment_3';

const schema = yup
  .object({
    [FIELD_TITLE]: yup.string().required(),
    [FIELD_INCREMENT_1]: yup
      .number()
      .min(0.01)
      .test('duplicate', 'Duplicate', function (value) {
        return (
          value !== this.parent.increment_2 && value !== this.parent.increment_3
        );
      })
      .required(),
    [FIELD_INCREMENT_2]: yup
      .number()
      .min(0.01)
      .test('duplicate', 'Duplicate', function (value) {
        return (
          value !== this.parent.increment_1 && value !== this.parent.increment_3
        );
      })
      .required(),
    [FIELD_INCREMENT_3]: yup
      .number()
      .min(0.01)
      .test('duplicate', 'Duplicate', function (value) {
        return (
          value !== this.parent.increment_1 && value !== this.parent.increment_2
        );
      })
      .required(),
    [FIELD_SEARCHABLE]: yup.boolean(),
    [FIELD_ICON_COLOUR]: yup.string().required(),
    [FIELD_ICON_KEY]: yup.string().required(),
  })
  .required();

const UpdateMedication = ({ add }: UpdateMedicationProps) => {
  const pageType = add ? 'Add' : 'Edit';
  const navigate = useNavigate();
  const { medicationId } = useParams();

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

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<FormInput>({
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

  console.log(errors);

  const onSubmit = (data: FormInput) => {
    const tranformedData = {
      title: data.title,
      icon_key: data.icon_key,
      icon_colour: data.icon_colour,
      searchable: data.searchable,
      default_increment_index: 0,
      medication_category_id: 1,
      measurements: [[]],
      increments: [data.increment_1, data.increment_2, data.increment_3],
    };
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

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.select();
  };

  useEffect(() => {
    if (updateResonse || deleteResponse) {
      navigate(`/${PATH_MEDICATION}`);
    }
  }, [updateResonse, deleteResponse]);

  return (
    <Grid container padding={2} spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h1" gutterBottom textAlign="center">
          {pageType} Medication
        </Typography>
        <Divider />
      </Grid>
      {(updateError || deleteError) && (
        <Grid item xs={12}>
          <Alert severity="error" variant="filled">
            Something went wrong {pageType.toLowerCase()}ing a medication
          </Alert>
        </Grid>
      )}
      <Grid item xs={12}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2} rowGap={1}>
            <Grid item xs={2} m="auto" textAlign="center">
              {getIcon({
                color: watchedIconColor,
                name: watchedIconKey,
                fontSize: 'large',
              })}
            </Grid>
            <Grid item xs={10}>
              <TextField
                label="Name"
                fullWidth
                error={!!errors[FIELD_TITLE]}
                helperText={errors[FIELD_TITLE] && errors[FIELD_TITLE].message}
                {...register(FIELD_TITLE)}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth error={!!errors[FIELD_ICON_KEY]}>
                <InputLabel id="icon_key-label">Icon</InputLabel>
                <Controller
                  name={FIELD_ICON_KEY}
                  control={control}
                  render={({ field }) => (
                    <Select id="icon_key-label" label="Icon" {...field}>
                      {iconKeys.map(({ key, label }) => (
                        <MenuItem key={key} value={key}>
                          {label}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth error={!!errors[FIELD_ICON_COLOUR]}>
                <InputLabel id="icon_colour-label">Colour</InputLabel>
                <Controller
                  name={FIELD_ICON_COLOUR}
                  control={control}
                  render={({ field }) => (
                    <Select id="icon_colour-label" label="Colour" {...field}>
                      {iconColors.map(({ key, label }) => (
                        <MenuItem key={key} value={key}>
                          {label}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Increment values</Typography>
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Value 1"
                type="number"
                inputProps={{ step: '.01' }}
                onFocus={handleFocus}
                helperText={
                  errors[FIELD_INCREMENT_1] && errors[FIELD_INCREMENT_1].message
                }
                error={!!errors[FIELD_INCREMENT_1]}
                {...register(FIELD_INCREMENT_1)}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Value 2"
                type="number"
                inputProps={{ step: '.01' }}
                onFocus={handleFocus}
                helperText={
                  errors[FIELD_INCREMENT_2] && errors[FIELD_INCREMENT_2].message
                }
                error={!!errors[FIELD_INCREMENT_2]}
                {...register(FIELD_INCREMENT_2)}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Value 3"
                type="number"
                inputProps={{ step: '.01' }}
                onFocus={handleFocus}
                helperText={
                  errors[FIELD_INCREMENT_3] && errors[FIELD_INCREMENT_3].message
                }
                error={!!errors[FIELD_INCREMENT_3]}
                {...register(FIELD_INCREMENT_3)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox />}
                label="Show in global search list"
                {...register(FIELD_SEARCHABLE)}
              />
            </Grid>
            <Grid item xs={12}>
              <LoadingButton
                loading={!!updateSubmitting}
                size="large"
                fullWidth
                variant="contained"
                type="submit"
                startIcon={<CheckCircleOutline />}
              >
                {add ? 'Add' : 'Save'} Medication
              </LoadingButton>
            </Grid>
            {!add && (
              <Grid item xs={6}>
                <LoadingButton
                  loading={!!deleteSubmitting}
                  size="large"
                  color="error"
                  variant="outlined"
                  fullWidth
                  onClick={onDelete}
                  startIcon={<DeleteOutline />}
                >
                  Delete
                </LoadingButton>
              </Grid>
            )}
            <Grid item xs={add ? 12 : 6}>
              <Button
                size="large"
                variant="outlined"
                fullWidth
                onClick={handleCancel}
                startIcon={<CancelOutlined />}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default UpdateMedication;
