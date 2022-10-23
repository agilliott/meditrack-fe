import { render, screen } from '../test/test-utils';
import Medication from './Medication';

describe('<Medication />', () => {
  it('renders', () => {
    render(<Medication />);
    expect(screen.getByText(/Medication/i)).toBeInTheDocument();
    expect(screen.getByText(/Coming soon/i)).toBeInTheDocument();
  });
});
