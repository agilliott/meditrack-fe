import { render, screen } from '../test/test-utils';

import NumberIncrementer from './NumberIncrementer';

const defaultProps = {
  selectValues: [2, 4, 8],
  defaultSelectedValue: 0,
  increment: {
    callback: vi.fn(),
    enabled: true,
  },
  decrement: {
    callback: vi.fn(),
    enabled: true,
  },
  onSelectChange: vi.fn(),
};

describe('<NumberIncrementer', () => {
  it('renders with default props', () => {
    render(<NumberIncrementer {...defaultProps} />);

    expect(
      screen.getByRole('button', { name: /increment/i, exact: false })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /decrement/i, exact: false })
    ).toBeInTheDocument();
    defaultProps.selectValues.forEach((value) => {
      expect(
        screen.getByRole('button', { name: value.toString() })
      ).toBeInTheDocument();
    });
  });

  it('default enables buttons', () => {
    const mockIncrement = {
      callback: vi.fn(),
    };
    const mockDecrement = {
      callback: vi.fn(),
    };
    render(
      <NumberIncrementer
        {...defaultProps}
        increment={mockIncrement}
        decrement={mockDecrement}
      />
    );

    expect(
      screen.getByRole('button', { name: /increment/i, exact: false })
    ).not.toBeDisabled();
    expect(
      screen.getByRole('button', { name: /decrement/i, exact: false })
    ).not.toBeDisabled();
  });
  it('disabled buttons', () => {
    const mockIncrement = {
      callback: vi.fn(),
      enabled: false,
    };
    const mockDecrement = {
      callback: vi.fn(),
      enabled: false,
    };
    render(
      <NumberIncrementer
        {...defaultProps}
        increment={mockIncrement}
        decrement={mockDecrement}
      />
    );

    expect(
      screen.getByRole('button', { name: /increment/i, exact: false })
    ).toBeDisabled();
    expect(
      screen.getByRole('button', { name: /decrement/i, exact: false })
    ).toBeDisabled();
  });

  it('executes increment and decrement callbacks', async () => {
    const mockIncrement = {
      callback: vi.fn(),
    };
    const mockDecrement = {
      callback: vi.fn(),
    };

    const { user } = render(
      <NumberIncrementer
        {...defaultProps}
        increment={mockIncrement}
        decrement={mockDecrement}
      />
    );

    await user.click(
      screen.getByRole('button', { name: /increment/i, exact: false })
    );

    expect(mockIncrement.callback).toHaveBeenCalledWith(
      defaultProps.selectValues[defaultProps.defaultSelectedValue],
      'ADD'
    );

    await user.click(
      screen.getByRole('button', { name: /decrement/i, exact: false })
    );

    expect(mockDecrement.callback).toHaveBeenCalledWith(
      defaultProps.selectValues[defaultProps.defaultSelectedValue],
      'SUBTRACT'
    );
  });

  it('executes onSelectChange callback', async () => {
    const mockOnSelectChange = vi.fn();
    const index = 2;

    const { user } = render(
      <NumberIncrementer
        {...defaultProps}
        onSelectChange={mockOnSelectChange}
      />
    );

    await user.click(
      screen.getByRole('button', {
        name: defaultProps.selectValues[index].toString(),
        exact: false,
      })
    );

    expect(mockOnSelectChange).toHaveBeenCalledWith(index);
  });
});
