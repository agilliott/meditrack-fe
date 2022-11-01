import { render, screen } from '../test/test-utils';
import MedicationLogCard from './MedicationLogCard';

const defaultProps = {
  name: 'My meds',
  icon: { name: 'INSULIN', color: 'blue1' },
  amount: 10,
  id: 1,
  medicationId: 2,
  incrementSettings: {
    selectValues: [2, 3, 5],
    defaultSelectedValueIndex: 1,
  },
  updated: '2022-10-23',
  timeSinceUpdate: '50 minutes ago',
  updateError: false,
  updateSubmitting: false,
  updateSuccess: false,
  handleUpdate: vi.fn(),
  expanded: true,
  setExpanded: vi.fn(),
};

describe('<MedicationLogCard />', () => {
  it('renders with default props', () => {
    render(<MedicationLogCard {...defaultProps} />);
    expect(screen.getByText(defaultProps.name)).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveValue(
      defaultProps.amount.toString()
    );
  });

  it('executes expand function on click', async () => {
    const mockSetExpand = vi.fn();
    const { user } = render(
      <MedicationLogCard {...defaultProps} setExpanded={mockSetExpand} />
    );
    await user.click(
      screen.getByRole('button', { name: defaultProps.name, exact: false })
    );
    expect(mockSetExpand).toHaveBeenCalledWith(
      defaultProps.medicationId,
      defaultProps.expanded
    );
  });

  it('shows content when expand is TRUE', () => {
    render(<MedicationLogCard {...defaultProps} />);
    expect(
      screen.getByRole('button', { name: /decrement/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /increment/i })
    ).toBeInTheDocument();
  });

  it('shows last updated when it is passed in', () => {
    render(<MedicationLogCard {...defaultProps} />);
    expect(
      screen.getByText(defaultProps.timeSinceUpdate, { exact: false })
    ).toBeInTheDocument();
  });

  it('sets the increment options correctly', () => {
    const mockincrementSettings = {
      selectValues: [2, 6, 8],
      defaultSelectedValueIndex: 2,
    };
    render(
      <MedicationLogCard
        {...defaultProps}
        incrementSettings={mockincrementSettings}
      />
    );

    expect(
      screen.getByRole('button', {
        name: mockincrementSettings.selectValues[0].toString(),
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', {
        name: mockincrementSettings.selectValues[1].toString(),
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', {
        name: mockincrementSettings.selectValues[2].toString(),
      })
    ).toBeInTheDocument();
  });

  it('shows success icon', () => {
    render(<MedicationLogCard {...defaultProps} updateSuccess />);

    expect(screen.getByLabelText(/successfully updated/i)).toBeInTheDocument();
  });

  it('shows error icon', () => {
    render(<MedicationLogCard {...defaultProps} updateError />);

    expect(screen.getByLabelText(/an error has occurred/i)).toBeInTheDocument();
  });

  it('shows submitting icon', () => {
    render(<MedicationLogCard {...defaultProps} updateSubmitting />);

    expect(screen.getByLabelText(/submitting/i)).toBeInTheDocument();
  });

  it('updates the input value when typed', async () => {
    const newAmount = '20';
    const { user } = render(<MedicationLogCard {...defaultProps} />);

    expect(screen.getByRole('textbox')).toHaveValue(
      defaultProps.amount.toString()
    );

    await user.type(screen.getByRole('textbox'), newAmount);

    expect(screen.getByRole('textbox')).toHaveValue(newAmount);
  });

  it('updates the input value when the increment is selected', async () => {
    const { user } = render(<MedicationLogCard {...defaultProps} />);

    expect(screen.getByRole('textbox')).toHaveValue(
      defaultProps.amount.toString()
    );

    await user.click(screen.getByRole('button', { name: /increment/i }));

    await user.click(screen.getByRole('button', { name: /add 3/i }));

    const newAmount =
      defaultProps.amount +
      defaultProps.incrementSettings.selectValues[
        defaultProps.incrementSettings.defaultSelectedValueIndex
      ];

    expect(screen.getByRole('textbox')).toHaveValue(newAmount.toString());
    expect(
      screen.queryByRole('button', { name: /add 3/i })
    ).not.toBeInTheDocument();

    await user.click(
      screen.getByRole('button', {
        name: defaultProps.incrementSettings.selectValues[0].toString(),
        exact: false,
      })
    );

    await user.click(screen.getByRole('button', { name: /decrement/i }));

    await user.click(screen.getByRole('button', { name: /remove 2/i }));

    const nextAmount =
      newAmount - defaultProps.incrementSettings.selectValues[0];

    expect(screen.getByRole('textbox')).toHaveValue(nextAmount.toString());
  });

  it('does not allow the amount to go below 0', async () => {
    const { user } = render(<MedicationLogCard {...defaultProps} amount={1} />);

    expect(screen.getByRole('textbox')).toHaveValue('1');

    await user.click(screen.getByRole('button', { name: /decrement/i }));

    await user.click(screen.getByRole('button', { name: /remove 3/i }));

    expect(screen.getByRole('textbox')).toHaveValue('0');
  });

  it('still renders if no icons are passed in', () => {
    render(<MedicationLogCard {...defaultProps} icon={undefined} />);

    expect(screen.getByText(defaultProps.name)).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveValue(
      defaultProps.amount.toString()
    );
  });

  it('Blurs input on enter key press', async () => {
    const { user } = render(<MedicationLogCard {...defaultProps} />);
    const input = screen.getByRole('textbox');

    await user.click(input);

    expect(input).toHaveFocus();

    await user.keyboard('{enter}');

    expect(input).not.toHaveFocus();
  });

  // Test: It calls hook on change
});
