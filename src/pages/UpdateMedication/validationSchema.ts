import * as yup from 'yup';
import {
  FIELD_INCREMENT_1,
  FIELD_INCREMENT_2,
  FIELD_INCREMENT_3,
  FIELD_TITLE,
  FIELD_SEARCHABLE,
  FIELD_ICON_COLOUR,
  FIELD_ICON_KEY,
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
  })
  .required();
