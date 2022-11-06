import { ColorChoices, IconChoices } from '../../utils/getIcon';

export const FIELD_TITLE = 'title',
  FIELD_SEARCHABLE = 'searchable',
  FIELD_ICON_KEY = 'icon_key',
  FIELD_ICON_COLOUR = 'icon_colour',
  FIELD_INCREMENT_1 = 'increment_1',
  FIELD_INCREMENT_2 = 'increment_2',
  FIELD_INCREMENT_3 = 'increment_3',
  FIELD_BASE_CAPACITY = 'base_capacity',
  FIELD_BASE_UNIT = 'base_unit',
  FIELD_ARRAY_MEASUREMENTS = 'measurements';

type SelectOptionsKey = {
  key: IconChoices;
  label: string;
};

type SelectOptionsColor = {
  key: ColorChoices;
  label: string;
};

export type SelectOptionsUnit = {
  value: string;
  label: string;
  symbol?: string;
  group: string;
};

export const iconKeys: SelectOptionsKey[] = [
  { key: 'INSULIN', label: 'Insulin' },
  { key: 'TEST_STRIP', label: 'Test Strip' },
  { key: 'NEEDLE', label: 'Needle' },
  { key: 'PILL', label: 'Pill' },
  { key: 'PILLS_1', label: 'Pills 1' },
  { key: 'PILLS_2', label: 'Pills 2' },
  { key: 'THERMOMETER', label: 'Thermometer' },
  { key: 'BLISTER', label: 'Blister' },
  { key: 'HEART', label: 'Heart' },
];

export const iconColors: SelectOptionsColor[] = [
  { key: 'red1', label: 'Red 1' },
  { key: 'red2', label: 'Red 2' },
  { key: 'purple1', label: 'Purple 1' },
  { key: 'purple2', label: 'Purple 2' },
  { key: 'blue1', label: 'Blue 1' },
  { key: 'blue2', label: 'Blue 2' },
  { key: 'green1', label: 'Green 1' },
  { key: 'green2', label: 'Green 2' },
  { key: 'yellow1', label: 'Yellow 1' },
  { key: 'yellow2', label: 'Yellow 2' },
  { key: 'orange1', label: 'Orange 1' },
  { key: 'orange2', label: 'Orange 2' },
];

export const unitOptions: SelectOptionsUnit[] = [
  {
    value: 'cubic_centimetre',
    label: 'Cubic Centimetre',
    symbol: 'cc',
    group: 'Quantity',
  },
  { value: 'gram', label: 'Gram', symbol: 'g', group: 'Quantity' },
  { value: 'milligram', label: 'Milligram', symbol: 'mg', group: 'Quantity' },
  { value: 'microgram', label: 'Microgram', symbol: 'mcg', group: 'Quantity' },
  { value: 'millilitre', label: 'Millilitre', symbol: 'ml', group: 'Quantity' },
  { value: 'blister', label: 'Blister', group: 'Container' },
  { value: 'bottle', label: 'Bottle', group: 'Container' },
  { value: 'box', label: 'Box', group: 'Container' },
  { value: 'cartridge', label: 'Cartridge', group: 'Container' },
  { value: 'pack', label: 'Pack', group: 'Container' },
  { value: 'pen', label: 'Pen', group: 'Container' },
  { value: 'tablet', label: 'Tablet', group: 'Container' },
  { value: 'vial', label: 'Vial', group: 'Container' },
  { value: 'order', label: 'Order', group: 'Distribution' },
  { value: 'prescription', label: 'Prescription', group: 'Distribution' },
];
