import { Controller, UseFormReturn } from 'react-hook-form';
import {
  Grid,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  DeleteOutline,
  CheckCircleOutline,
  CancelOutlined,
} from '@mui/icons-material';

import { getIcon } from '../../utils/getIcon';
import { ColorChoices, IconChoices } from '../../utils/getIcon';
import {
  FIELD_INCREMENT_1,
  FIELD_INCREMENT_2,
  FIELD_INCREMENT_3,
  FIELD_TITLE,
  FIELD_SEARCHABLE,
  FIELD_ICON_COLOUR,
  FIELD_ICON_KEY,
  iconKeys,
  iconColors,
} from './consts';

export interface FormInput {
  title: string;
  searchable: boolean;
  icon_key: IconChoices;
  icon_colour: ColorChoices;
  increment_1: number;
  increment_2: number;
  increment_3: number;
}

interface UpdateMedicationFormProps {
  add: boolean;
  onSubmit: (data: FormInput) => void;
  watchedIconColor: string;
  watchedIconKey: string;
  updateSubmitting: boolean;
  deleteSubmitting: boolean;
  onDelete: () => void;
  handleCancel: () => void;
  formMethods: UseFormReturn<FormInput, any>;
}

const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
  event.target.select();
};

const UpdateMedicationForm = ({
  add,
  onSubmit,
  watchedIconColor,
  watchedIconKey,
  updateSubmitting,
  deleteSubmitting,
  onDelete,
  handleCancel,
  formMethods,
}: UpdateMedicationFormProps) => {
  const { handleSubmit, register, control, formState } = formMethods;
  const { errors } = formState;

  return (
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
          <Controller
            name={FIELD_TITLE}
            control={control}
            render={({ field }) => (
              <TextField
                label="Name"
                fullWidth
                error={!!errors[FIELD_TITLE]}
                helperText={
                  errors[FIELD_TITLE] && errors[FIELD_TITLE].message?.toString()
                }
                {...field}
              />
            )}
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
              errors[FIELD_INCREMENT_1] &&
              errors[FIELD_INCREMENT_1].message?.toString()
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
              errors[FIELD_INCREMENT_2] &&
              errors[FIELD_INCREMENT_2].message?.toString()
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
              errors[FIELD_INCREMENT_3] &&
              errors[FIELD_INCREMENT_3].message?.toString()
            }
            error={!!errors[FIELD_INCREMENT_3]}
            {...register(FIELD_INCREMENT_3)}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name={FIELD_SEARCHABLE}
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox checked={field.value} {...field} />}
                label="Show in global search list"
              />
            )}
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
  );
};

export default UpdateMedicationForm;
