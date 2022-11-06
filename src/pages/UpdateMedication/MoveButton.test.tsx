import { render, screen } from '../../test/test-utils';
import MoveButton from './MoveButton';

const defaultProps = {
  disabled: false,
  upDisabled: false,
  downDisabled: false,
  index: 1,
  handleMoveUp: vi.fn(),
  handleMoveDown: vi.fn(),
};

describe('<MoveButton />', () => {
  it('renders with default props', () => {
    render(<MoveButton {...defaultProps} />);

    expect(
      screen.getByRole('button', { name: /Move unit/i })
    ).toBeInTheDocument();
  });

  it('respects disable', () => {
    render(<MoveButton {...defaultProps} disabled />);

    expect(screen.getByRole('button', { name: /Move unit/i })).toBeDisabled();
  });

  it('shows menu', async () => {
    const { user } = render(<MoveButton {...defaultProps} />);

    await user.click(screen.getByRole('button', { name: /Move unit/i }));

    expect(
      screen.getByRole('menuitem', { name: /move up/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('menuitem', { name: /move down/i })
    ).toBeInTheDocument();
  });

  it('executes callbacks', async () => {
    const mockHandleMoveUp = vi.fn();
    const mockHandleMoveDown = vi.fn();
    const { user } = render(
      <MoveButton
        {...defaultProps}
        handleMoveDown={mockHandleMoveDown}
        handleMoveUp={mockHandleMoveUp}
      />
    );

    await user.click(screen.getByRole('button', { name: /Move unit/i }));

    await user.click(screen.getByRole('menuitem', { name: /move up/i }));

    expect(mockHandleMoveUp).toHaveBeenCalledTimes(1);

    await user.click(screen.getByRole('button', { name: /Move unit/i }));

    await user.click(screen.getByRole('menuitem', { name: /move down/i }));

    expect(mockHandleMoveDown).toHaveBeenCalledTimes(1);
  });

  it('respects menu disable', async () => {
    const { user } = render(
      <MoveButton {...defaultProps} upDisabled={true} downDisabled={true} />
    );

    await user.click(screen.getByRole('button', { name: /Move unit/i }));

    expect(screen.getByRole('menuitem', { name: /Move up/i })).toHaveAttribute(
      'aria-disabled'
    );
    expect(
      screen.getByRole('menuitem', { name: /Move down/i })
    ).toHaveAttribute('aria-disabled');
  });
});
