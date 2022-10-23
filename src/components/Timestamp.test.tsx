import { render, screen } from '../test/test-utils';
import { format } from 'date-fns';
import Timestamp from './Timestamp';

const defaultProps = {
  date: new Date(),
  defaultToTimer: undefined,
  timeLapsed: '2 seconds ago',
};

const dateFormatted = format(defaultProps.date, 'dd/MM/y HH:mm');

describe('<Timestamp />', () => {
  it('renders with default config', () => {
    render(<Timestamp {...defaultProps} />);

    expect(
      screen.getByText(`Last updated ${defaultProps.timeLapsed}`)
    ).toBeInTheDocument();
  });

  it('changes to date format on click', async () => {
    const { user } = render(<Timestamp {...defaultProps} />);

    await user.click(screen.getByRole('button'));
    expect(screen.getByText(`Last updated ${dateFormatted}`));
  });

  it('renders the date when defaultToTimer is FALSE', () => {
    render(<Timestamp {...defaultProps} defaultToTimer={false} />);

    expect(
      screen.getByText(`Last updated ${dateFormatted}`)
    ).toBeInTheDocument();
  });

  it('renders the time lapsed when defaultToTimer is TRUE', () => {
    render(<Timestamp {...defaultProps} defaultToTimer={true} />);

    expect(
      screen.getByText(`Last updated ${defaultProps.timeLapsed}`)
    ).toBeInTheDocument();
  });
});
