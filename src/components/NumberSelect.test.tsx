import { render, screen } from '../test/test-utils';

import NumberSelect from './NumberSelect';

const defaultProps = {
  index: 0,
  value: 1,
  selected: false,
  callback: vi.fn(),
};

describe('<NumberSelect />', () => {
  it('renders with default props', () => {
    render(<NumberSelect {...defaultProps} />);

    expect(
      screen.getByRole('button', { name: defaultProps.value.toString() })
    ).toBeInTheDocument();
  });

  it('executes callback on click', async () => {
    const mockCallback = vi.fn();
    const { user } = render(
      <NumberSelect {...defaultProps} callback={mockCallback} />
    );

    await user.click(screen.getByRole('button'));

    expect(mockCallback).toHaveBeenCalledWith(
      defaultProps.value,
      defaultProps.index
    );
  });

  it('shows selected styles', async () => {
    render(<NumberSelect {...defaultProps} selected />);

    expect(screen.getByRole('button')).toHaveStyle('border-color: #009a8a;');
    expect(screen.getByRole('button')).toHaveStyle('color: #009a8a;');
  });
});
