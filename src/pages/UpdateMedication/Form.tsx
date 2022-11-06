import { Controller, useFieldArray, UseFormReturn } from 'react-hook-form';
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
  Autocomplete,
  IconButton,
  Menu,
  Divider,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  DeleteOutline,
  CheckCircleOutline,
  CancelOutlined,
  AddCircleOutline,
  SwapVert,
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
  FIELD_BASE_CAPACITY,
  FIELD_BASE_UNIT,
  FIELD_ARRAY_MEASUREMENTS,
  iconKeys,
  iconColors,
  unitOptions,
  SelectOptionsUnit,
} from './consts';
import MoveButton from './MoveButton';

type CapacityPair = {
  capacity: number;
  unit: SelectOptionsUnit;
};

export interface FormInput {
  title: string;
  searchable: boolean;
  icon_key: IconChoices;
  icon_colour: ColorChoices;
  increment_1: number;
  increment_2: number;
  increment_3: number;
  base_capacity?: number;
  base_unit?: SelectOptionsUnit;
  measurements?: CapacityPair[];
}

interface UpdateMedicationFormProps {
  add: boolean;
  onSubmit: (data: FormInput) => void;
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
  updateSubmitting,
  deleteSubmitting,
  onDelete,
  handleCancel,
  formMethods,
}: UpdateMedicationFormProps) => {
  const { handleSubmit, register, control, formState, watch } = formMethods;
  const { errors } = formState;
  const { fields, append, remove, swap } = useFieldArray({
    control,
    name: FIELD_ARRAY_MEASUREMENTS,
  });

  const baseUnitWatch: SelectOptionsUnit | undefined = watch(FIELD_BASE_UNIT);
  const measurementsWatch: CapacityPair[] | undefined = watch(
    FIELD_ARRAY_MEASUREMENTS
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2} rowGap={1}>
        <Grid item xs={12}>
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
        <Grid item>
          <FormControl fullWidth error={!!errors[FIELD_ICON_KEY]}>
            <InputLabel id="icon_key-label">Icon</InputLabel>
            <Controller
              name={FIELD_ICON_KEY}
              control={control}
              render={({ field }) => (
                <Select id="icon_key-label" label="Icon" {...field}>
                  {iconKeys.map(({ key, label }) => (
                    <MenuItem key={key} value={key} aria-label={label}>
                      {getIcon({ name: key })}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl fullWidth error={!!errors[FIELD_ICON_COLOUR]}>
            <InputLabel id="icon_colour-label">Colour</InputLabel>
            <Controller
              name={FIELD_ICON_COLOUR}
              control={control}
              render={({ field }) => (
                <Select id="icon_colour-label" label="Colour" {...field}>
                  {iconColors.map(({ key, label }) => (
                    <MenuItem key={key} value={key} aria-label={label}>
                      {getIcon({ name: 'CIRCLE', color: key })}
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
          <Typography variant="h6" display="inline-block">
            Measurements
          </Typography>
          <Typography variant="subtitle2" display="inline-block" pl={1}>
            (optional)
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <TextField
            label="Base qty"
            type="number"
            disabled
            fullWidth
            error={!!errors[FIELD_BASE_CAPACITY]}
            helperText={
              errors[FIELD_BASE_CAPACITY] &&
              errors[FIELD_BASE_CAPACITY].message?.toString()
            }
            onFocus={handleFocus}
            {...register(FIELD_BASE_CAPACITY)}
          />
        </Grid>
        <Grid item xs>
          <Controller
            name={FIELD_BASE_UNIT}
            control={control}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                options={unitOptions.filter(
                  (options) => options.group === 'Quantity'
                )}
                groupBy={(option) => option.group}
                getOptionLabel={(option) => option.label || ''}
                onChange={(event, values) => onChange(values)}
                value={value}
                blurOnSelect
                fullWidth
                disableClearable
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={!!errors[FIELD_BASE_UNIT]}
                    helperText={
                      errors[FIELD_BASE_UNIT] &&
                      errors[FIELD_BASE_UNIT].message?.toString()
                    }
                    label="Base unit"
                    variant="outlined"
                    onChange={onChange}
                  />
                )}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        {fields.length > 0 && (
          <Grid item xs={12}>
            {fields.map((field, index) => {
              const baseUnit = baseUnitWatch
                ? baseUnitWatch?.symbol || baseUnitWatch?.label
                : '';
              const previousUnit =
                index === 0
                  ? baseUnit
                  : measurementsWatch?.[index - 1]?.unit?.symbol ||
                    measurementsWatch?.[index - 1]?.unit?.label ||
                    'qty';
              return (
                <Grid container spacing={2} rowGap={1} key={field.id} pb={2}>
                  <Grid item xs={3}>
                    <TextField
                      label={previousUnit}
                      type="number"
                      error={
                        !!errors?.[FIELD_ARRAY_MEASUREMENTS]?.[index]?.capacity
                      }
                      helperText={errors?.[FIELD_ARRAY_MEASUREMENTS]?.[
                        index
                      ]?.capacity?.message?.toString()}
                      {...register(
                        `${FIELD_ARRAY_MEASUREMENTS}.${index}.capacity`
                      )}
                    />
                  </Grid>
                  <Grid item xs>
                    <Controller
                      name={`${FIELD_ARRAY_MEASUREMENTS}.${index}.unit`}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Autocomplete
                          options={unitOptions}
                          groupBy={(option) => option.group}
                          onChange={(event, values) => onChange(values)}
                          blurOnSelect
                          disableClearable
                          value={value}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              error={
                                !!errors?.[FIELD_ARRAY_MEASUREMENTS]?.[index]
                                  ?.unit
                              }
                              helperText={errors?.[FIELD_ARRAY_MEASUREMENTS]?.[
                                index
                              ]?.unit?.message?.toString()}
                              label="Per"
                              variant="outlined"
                              onChange={onChange}
                            />
                          )}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item alignSelf="center">
                    <MoveButton
                      disabled={fields.length < 2}
                      index={index}
                      handleMoveUp={() => swap(index, index - 1)}
                      handleMoveDown={() => swap(index, index + 1)}
                      upDisabled={index === 0}
                      downDisabled={index === fields.length - 1}
                    />
                    <IconButton
                      aria-label="Move unit"
                      onClick={() => {
                        remove(index);
                      }}
                    >
                      <CancelOutlined />
                    </IconButton>
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
        )}
        <Grid item xs={12} textAlign="right" sx={{ paddingTop: '0!important' }}>
          <Button
            size="large"
            disabled={!baseUnitWatch?.label}
            onClick={() =>
              append({ capacity: 0, unit: { value: '', label: '', group: '' } })
            }
            startIcon={<AddCircleOutline />}
          >
            Add next unit level
          </Button>
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
