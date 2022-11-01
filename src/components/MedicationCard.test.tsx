import { render, screen } from '../test/test-utils';
import MedicationCard from './MedicationCard';

const defaultProps = {
  id: 1,
  title: 'My med',
  searchable: true,
  medication_category_id: 1,
  icon_colour: 'blue1',
  icon_key: 'NEEDLE',
  default_increment_index: 0,
  increments: [1, 2, 4],
  measurements: [],
  meta: {
    created_at: '2022-10-30',
    updated_at: '2022-10-31',
  },
};

describe('<MedicationCard />', () => {
  it('renders with default props', () => {
    render(<MedicationCard {...defaultProps} />);
    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /edit/i })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Reorder/i })
    ).toBeInTheDocument();
  });
});
