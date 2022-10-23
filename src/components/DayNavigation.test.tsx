import { render, screen } from '../test/test-utils';
import DayNavigation from './DayNavigation';

const defaultProps = {
  selectedDate: new Date('2022-10-22'),
  hitPrevLimit: false,
  hitNextLimit: false,
  prevCallback: vi.fn(),
  nextCallback: vi.fn(),
};

describe('<DayNavigation />', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders with default props', () => {
    render(<DayNavigation {...defaultProps} />);
    expect(screen.getByText(/October 22nd, 2022/i)).toBeInTheDocument();
    expect(screen.getByText(/saturday/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Next day/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Previous day/i })
    ).toBeInTheDocument();
  });

  it('displays today when the date is today', () => {
    render(<DayNavigation {...defaultProps} selectedDate={new Date()} />);
    expect(screen.getByText(/today/i)).toBeInTheDocument();
  });

  it('executes callbacks when buttons are clicked', async () => {
    const mockNext = vi.fn();
    const mockPrev = vi.fn();
    const { user } = render(
      <DayNavigation
        {...defaultProps}
        prevCallback={mockPrev}
        nextCallback={mockNext}
      />
    );

    await user.click(screen.getByRole('button', { name: /Previous day/i }));
    expect(mockPrev).toHaveBeenCalledOnce();

    await user.click(screen.getByRole('button', { name: /Next day/i }));
    expect(mockNext).toHaveBeenCalledOnce();
  });

  it('disables buttons when prev or next limit is TRUE', () => {
    render(<DayNavigation {...defaultProps} hitNextLimit hitPrevLimit />);

    expect(
      screen.getByRole('button', { name: /Previous day/i })
    ).toBeDisabled();
    expect(screen.getByRole('button', { name: /Next day/i })).toBeDisabled();
  });
});
