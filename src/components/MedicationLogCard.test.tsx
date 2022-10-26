import { render, screen } from '../test/test-utils';
import MedicationCard from './MedicationLogCard';

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

describe('<MedicationCard />', () => {
  it('renders with default props', () => {
    render(<MedicationCard {...defaultProps} />);
    expect(screen.getByText(defaultProps.name)).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveValue(
      defaultProps.amount.toString()
    );
  });

  it('executes expand function on click', async () => {
    const mockSetExpand = vi.fn();
    const { user } = render(
      <MedicationCard {...defaultProps} setExpanded={mockSetExpand} />
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
    render(<MedicationCard {...defaultProps} />);
    expect(
      screen.getByRole('button', { name: /subtract/i, exact: false })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /add/i, exact: false })
    ).toBeInTheDocument();
  });

  it('shows last updated when it is passed in', () => {
    render(<MedicationCard {...defaultProps} />);
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
      <MedicationCard
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
    render(<MedicationCard {...defaultProps} updateSuccess />);

    expect(screen.getByLabelText(/successfully updated/i)).toBeInTheDocument();
  });

  it('shows error icon', () => {
    render(<MedicationCard {...defaultProps} updateError />);

    expect(screen.getByLabelText(/an error has occurred/i)).toBeInTheDocument();
  });

  it('shows submitting icon', () => {
    render(<MedicationCard {...defaultProps} updateSubmitting />);

    expect(screen.getByLabelText(/submitting/i)).toBeInTheDocument();
  });

  it('updates the input value when typed', async () => {
    const newAmount = '20';
    const { user } = render(<MedicationCard {...defaultProps} />);

    expect(screen.getByRole('textbox')).toHaveValue(
      defaultProps.amount.toString()
    );

    await user.type(screen.getByRole('textbox'), newAmount);

    expect(screen.getByRole('textbox')).toHaveValue(newAmount);
  });

  it('updates the input value when the increment is selected', async () => {
    const { user } = render(<MedicationCard {...defaultProps} />);

    expect(screen.getByRole('textbox')).toHaveValue(
      defaultProps.amount.toString()
    );

    await user.click(
      screen.getByRole('button', { name: /add/i, exact: false })
    );

    const newAmount =
      defaultProps.amount +
      defaultProps.incrementSettings.selectValues[
        defaultProps.incrementSettings.defaultSelectedValueIndex
      ];

    expect(screen.getByRole('textbox')).toHaveValue(newAmount.toString());

    await user.click(
      screen.getByRole('button', {
        name: defaultProps.incrementSettings.selectValues[0].toString(),
        exact: false,
      })
    );

    await user.click(
      screen.getByRole('button', { name: /subtract/i, exact: false })
    );

    const nextAmount =
      newAmount - defaultProps.incrementSettings.selectValues[0];

    expect(screen.getByRole('textbox')).toHaveValue(nextAmount.toString());
  });

  it('does not allow the amount to go below 0', async () => {
    const { user } = render(<MedicationCard {...defaultProps} amount={1} />);

    expect(screen.getByRole('textbox')).toHaveValue('1');

    await user.click(
      screen.getByRole('button', { name: /subtract/i, exact: false })
    );

    expect(screen.getByRole('textbox')).toHaveValue('0');
  });

  it('still renders if no icons are passed in', () => {
    render(<MedicationCard {...defaultProps} icon={undefined} />);

    expect(screen.getByText(defaultProps.name)).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveValue(
      defaultProps.amount.toString()
    );
  });

  it('Blurs input on enter key press', async () => {
    const { user } = render(<MedicationCard {...defaultProps} />);
    const input = screen.getByRole('textbox');

    await user.click(input);

    expect(input).toHaveFocus();

    await user.keyboard('{enter}');

    expect(input).not.toHaveFocus();
  });

  // Test: It calls hook on change
});
