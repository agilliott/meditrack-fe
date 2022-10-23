import { render, screen, userEvent } from '../test/test-utils';
import DayNavigation from './DayNavigation';

const defaultProps = {
  selectedDate: new Date('2022-10-22'),
  hitPrevLimit: false,
  hitNextLimit: false,
  prevCallback: vi.fn(),
  nextCallback: vi.fn(),
};

describe('<DayNavigation />', () => {
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

  // it('executes callbacks when buttons are clicked', () => {
  //   const mockNext = vi.fn();
  //   const mockPrev = vi.fn();
  //   render(
  //     <DayNavigation
  //       {...defaultProps}
  //       prevCallback={mockPrev}
  //       nextCallback={mockNext}
  //     />
  //   );

  //   userEvent.click(screen.getByRole('button', { name: /Previous day/i }));
  //   expect(mockPrev).toHaveBeenCalledTimes(1);

  //   userEvent.click(screen.getByRole('button', { name: /Next day/i }));
  //   expect(mockNext).toHaveBeenCalledTimes(1);
  // });
});
