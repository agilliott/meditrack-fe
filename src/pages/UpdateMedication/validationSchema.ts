import * as yup from 'yup';
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
} from './consts';

export const schema = yup
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
    [FIELD_BASE_CAPACITY]: yup.number().min(1).max(1),
    [FIELD_BASE_UNIT]: yup
      .object({
        value: yup.string().required(),
        label: yup.string().required(),
        symbol: yup.string(),
        group: yup.string().required(),
      })
      .nullable()
      .test('hasMeasurements', 'Required for measurements', function (value) {
        if (this.parent.measurements.length > 0 && !value) {
          return false;
        } else {
          return true;
        }
      }),
    [FIELD_ARRAY_MEASUREMENTS]: yup.array().of(
      yup.object({
        capacity: yup.number().min(0.01, 'Required').required(),
        unit: yup
          .object({
            value: yup.string().required(),
            label: yup.string().required(),
            symbol: yup.string(),
            group: yup.string().required(),
          })
          .required(),
      })
    ),
  })
  .required();
