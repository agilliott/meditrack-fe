import { ColorChoices, IconChoices } from '../../utils/getIcon';

export const FIELD_TITLE = 'title',
  FIELD_SEARCHABLE = 'searchable',
  FIELD_ICON_KEY = 'icon_key',
  FIELD_ICON_COLOUR = 'icon_colour',
  FIELD_INCREMENT_1 = 'increment_1',
  FIELD_INCREMENT_2 = 'increment_2',
  FIELD_INCREMENT_3 = 'increment_3';

type SelectOptionsKey = {
  key: IconChoices;
  label: string;
};

type SelectOptionsColor = {
  key: ColorChoices;
  label: string;
};

export const iconKeys: SelectOptionsKey[] = [
  { key: 'INSULIN', label: 'Insulin' },
  { key: 'TEST_STRIP', label: 'Test Strip' },
  { key: 'NEEDLE', label: 'Needle' },
];
export const iconColors: SelectOptionsColor[] = [
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
